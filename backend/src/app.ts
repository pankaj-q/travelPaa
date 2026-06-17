import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "./shared/middleware/error";
import { apiLimiter } from "./shared/middleware/rateLimit";
import { logger } from "./shared/utils/logger";

import authRoutes from "./modules/auth/auth.routes";
import applicationRoutes from "./modules/application/application.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import adminRoutes from "./modules/admin/admin.routes";
import contactRoutes from "./modules/contact/contact.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(apiLimiter);

app.post("/api/v1/payments/webhooks/stripe", express.raw({ type: "application/json" }));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/contact", contactRoutes);

app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
