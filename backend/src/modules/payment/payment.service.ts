import { prisma } from "../../config/database";
import { stripe } from "../../config/stripe";
import { env } from "../../config/env";
import { AppError } from "../../shared/utils/AppError";

interface StripeEvent {
  type: string;
  data: {
    object: Record<string, unknown>;
  };
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

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: env.STRIPE_CURRENCY,
    metadata: { applicationId, userId },
  });

  await prisma.payment.upsert({
    where: { applicationId },
    update: {
      stripePaymentIntentId: paymentIntent.id,
      amount,
      status: "PENDING",
    },
    create: {
      userId,
      applicationId,
      amount,
      stripePaymentIntentId: paymentIntent.id,
      status: "PENDING",
    },
  });

  return { clientSecret: paymentIntent.client_secret, amount };
}

export async function confirmPayment(userId: string, paymentIntentId: string, applicationId: string) {
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (pi.status !== "succeeded") {
    throw AppError.badRequest(`Payment not successful. Status: ${pi.status}`);
  }

  const payment = await prisma.payment.findUnique({ where: { applicationId } });
  if (!payment) {
    throw AppError.notFound("Payment record not found");
  }
  if (payment.userId !== userId) {
    throw AppError.forbidden("Payment does not belong to user");
  }

  const updated = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.update({
      where: { applicationId },
      data: { status: "COMPLETED" },
    });
    await tx.application.update({
      where: { id: applicationId },
      data: { status: "REVIEWED" },
    });
    return p;
  });

  return { status: updated.status };
}

export async function handleWebhookEvent(event: StripeEvent) {
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
            data: { status: "REVIEWED" },
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
}

export async function getPaymentHistory(userId: string) {
  return prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { application: { select: { destination: true, visaType: true } } },
  });
}

export async function getAdminStats() {
  const [totalApps, pendingApps, totalPayments, revenueAgg] = await Promise.all([
    prisma.application.count({ where: { deletedAt: null } }),
    prisma.application.count({ where: { status: "PENDING", deletedAt: null } }),
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
