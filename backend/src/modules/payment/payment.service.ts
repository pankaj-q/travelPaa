import { prisma } from "../../config/database";
import { stripe } from "../../config/stripe";
import { env } from "../../config/env";
import { AppError } from "../../shared/utils/AppError";
import crypto from "crypto";

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

function generateIdempotencyKey(applicationId: string, userId: string): string {
  return `pi_${applicationId}_${userId}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

async function recordWebhookEvent(eventId: string, eventType: string, payload: Record<string, unknown>) {
  await prisma.webhookEvent.create({
    data: {
      stripeEventId: eventId,
      eventType,
      payload: payload as any,
    },
  }).catch(() => {
    // Ignore duplicate key errors - event already processed
  });
}

async function isWebhookProcessed(eventId: string): Promise<boolean> {
  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: eventId },
    select: { id: true },
  });
  return !!existing;
}

export async function createPaymentIntent(userId: string, applicationId: string) {
  const application = await prisma.application.findFirst({
    where: { id: applicationId, userId, deletedAt: null },
  });
  if (!application) {
    throw AppError.notFound("Application not found");
  }

  const existingPayment = await prisma.payment.findUnique({
    where: { applicationId },
  });
  if (existingPayment && existingPayment.status === "COMPLETED") {
    throw AppError.conflict("Payment already completed for this application");
  }

  const amount = env.STRIPE_AMOUNT_CENTS;
  const idempotencyKey = generateIdempotencyKey(applicationId, userId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: env.STRIPE_CURRENCY,
    metadata: { applicationId, userId },
  }, {
    idempotencyKey,
  });

  await prisma.payment.upsert({
    where: { applicationId },
    update: {
      stripePaymentIntentId: paymentIntent.id,
      amount,
      status: "PENDING",
      idempotencyKey,
    },
    create: {
      userId,
      applicationId,
      amount,
      stripePaymentIntentId: paymentIntent.id,
      status: "PENDING",
      idempotencyKey,
    },
  });

  return { clientSecret: paymentIntent.client_secret, amount };
}

export async function confirmPayment(userId: string, paymentIntentId: string, applicationId: string) {
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (pi.status !== "succeeded") {
    throw AppError.badRequest(`Payment not successful. Status: ${pi.status}`);
  }

  const updated = await prisma.$transaction<{ status: string; stripePaymentIntentId: string; id: string; createdAt: Date; updatedAt: Date; userId: string; applicationId: string; amount: number; currency: string; idempotencyKey: string | null }>(async (tx) => {
    const payment = await tx.payment.findUnique({ where: { applicationId } });
    if (!payment) {
      throw AppError.notFound("Payment record not found");
    }
    if (payment.userId !== userId) {
      throw AppError.forbidden("Payment does not belong to user");
    }

    const p = await tx.payment.update({
      where: { applicationId },
      data: { status: "COMPLETED" },
    });
    await tx.application.update({
      where: { id: applicationId },
      data: { status: "UNDER_REVIEW" },
    });
    return p;
  });

  return { status: updated.status };
}

export async function handleWebhookEvent(event: StripeEvent) {
  // Deduplication check - return early if already processed
  if (await isWebhookProcessed(event.id)) {
    return { received: true, deduplicated: true };
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    const applicationId = pi.applicationId as string | undefined;
    const paymentIntentId = pi.id as string | undefined;

    if (applicationId && paymentIntentId) {
      const existingPayment = await prisma.payment.findUnique({ where: { applicationId } });
      if (existingPayment && existingPayment.status !== "COMPLETED") {
        await prisma.$transaction([
          prisma.payment.update({
            where: { applicationId },
            data: { status: "COMPLETED" },
          }),
          prisma.application.update({
            where: { id: applicationId },
            data: { status: "UNDER_REVIEW" },
          }),
        ]);
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object;
    const applicationId = pi.applicationId as string | undefined;

    if (applicationId) {
      await prisma.payment.updateMany({
        where: { applicationId },
        data: { status: "FAILED" },
      });
    }
  }

  // New event handlers
  if (event.type === "payment_intent.canceled") {
    const pi = event.data.object;
    const applicationId = pi.applicationId as string | undefined;
    if (applicationId) {
      await prisma.payment.updateMany({
        where: { applicationId },
        data: { status: "FAILED" },
      });
    }
  }

  if (event.type === "payment_intent.requires_action") {
    const pi = event.data.object;
    const applicationId = pi.applicationId as string | undefined;
    if (applicationId) {
      await prisma.payment.updateMany({
        where: { applicationId },
        data: { status: "PENDING" },
      });
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object;
    const paymentIntentId = charge.payment_intent as string | undefined;
    if (paymentIntentId) {
      const payment = await prisma.payment.findUnique({ where: { stripePaymentIntentId: paymentIntentId } });
      if (payment) {
        await prisma.$transaction([
          prisma.payment.update({
            where: { id: payment.id },
            data: { status: "REFUNDED" },
          }),
          prisma.application.update({
            where: { id: payment.applicationId },
            data: { status: "REJECTED" },
          }),
        ]);
      }
    }
  }

  if (event.type === "charge.dispute.created") {
    const dispute = event.data.object;
    const paymentIntentId = dispute.payment_intent as string | undefined;
    if (paymentIntentId) {
      const payment = await prisma.payment.findUnique({ where: { stripePaymentIntentId: paymentIntentId } });
      if (payment) {
        // Log dispute but don't auto-reject - admin review needed
        console.warn(`Dispute created for payment ${payment.id}: ${dispute.id}`);
      }
    }
  }

  // Record event AFTER successful processing
  await recordWebhookEvent(event.id, event.type, event.data.object);

  return { received: true };
}

export async function getPaymentHistory(userId: string, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const where = { userId };

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        application: { select: { destination: true, visaType: true } },
      },
    }),
    prisma.payment.count({ where }),
  ]);

  return { payments, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getAdminStats() {
  const [totalApps, pendingApps, totalPayments, revenueAgg] = await Promise.all([
    prisma.application.count({ where: { deletedAt: null } }),
    prisma.application.count({ where: { status: "DOCUMENTS_PENDING", deletedAt: null } }),
    prisma.payment.count({ where: { status: "COMPLETED" } }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    }),
  ]);

  const totalApproved = await prisma.application.count({
    where: { status: "APPROVED", deletedAt: null },
  });
  const totalProcessed = await prisma.application.count({
    where: { status: { in: ["APPROVED", "REJECTED"] }, deletedAt: null },
  });

  return {
    totalApplications: totalApps,
    pendingApplications: pendingApps,
    completedPayments: totalPayments,
    totalRevenue: revenueAgg._sum.amount ?? 0,
    approvalRate: totalProcessed > 0 ? Math.round((totalApproved / totalProcessed) * 100) : 0,
  };
}
