import { Router } from "express";
import { createIntent, confirm, history, webhook } from "./payment.controller";
import { authenticate } from "../../shared/middleware/auth";
import { paymentLimiter } from "../../shared/middleware/rateLimit";

const router = Router();

router.post("/create-intent", authenticate, paymentLimiter, createIntent);
router.post("/confirm", authenticate, paymentLimiter, confirm);
router.get("/history", authenticate, history);
router.post("/webhooks/stripe", webhook);

export default router;
