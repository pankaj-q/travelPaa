import { Router } from "express";
import rateLimit from "express-rate-limit";
import { create, list, getById, track } from "./application.controller";
import { validate } from "../../shared/middleware/validate";
import { authenticate } from "../../shared/middleware/auth";
import {
  createApplicationSchema,
  trackApplicationSchema,
} from "./application.validation";

const router = Router();

// Dedicated rate limiter for public track endpoint (10 req/min per IP)
const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many tracking requests, please try again later" },
  keyGenerator: (req) => req.ip || "unknown",
});

router.post("/track", trackLimiter, validate(trackApplicationSchema), track);

router.use(authenticate);

router.post("/", validate(createApplicationSchema), create);
router.get("/", list);
router.get("/:id", getById);

export default router;
