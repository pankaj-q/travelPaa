import { Request, Response } from "express";
import { stripe } from "../../config/stripe";
import { env } from "../../config/env";
import { createPaymentIntent, confirmPayment, getPaymentHistory } from "./payment.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const createIntent = asyncHandler(async (req: Request, res: Response) => {
  const { applicationId } = req.body;
  const result = await createPaymentIntent(req.user!.userId, applicationId);
  res.json(result);
});

export const confirm = asyncHandler(async (req: Request, res: Response) => {
  const { paymentIntentId, applicationId } = req.body;
  const result = await confirmPayment(req.user!.userId, paymentIntentId, applicationId);
  res.json(result);
});

export const history = asyncHandler(async (req: Request, res: Response) => {
  const payments = await getPaymentHistory(req.user!.userId);
  res.json({ payments });
});

export async function webhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  if (!sig || !env.STRIPE_WEBHOOK_SECRET) {
    res.status(400).json({ error: "Missing stripe signature" });
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
    const { handleWebhookEvent } = await import("./payment.service");
    await handleWebhookEvent(event as unknown as { type: string; data: { object: Record<string, unknown> } });
    res.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    res.status(400).json({ error: message });
  }
}
