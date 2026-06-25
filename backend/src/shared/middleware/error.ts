import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

const SENSITIVE_FIELDS = [
  "password",
  "token",
  "refreshToken",
  "accessToken",
  "creditCard",
  "cardNumber",
  "cvv",
  "secret",
  "apiKey",
  "stripePaymentIntentId",
  "stripeSignature",
];

function sanitizeError(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeError);

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_FIELDS.some((f) => lowerKey.includes(f))) {
      sanitized[key] = "[REDACTED]";
    } else if (value && typeof value === "object") {
      sanitized[key] = sanitizeError(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  logger.error({ err: sanitizeError(err) }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
}
