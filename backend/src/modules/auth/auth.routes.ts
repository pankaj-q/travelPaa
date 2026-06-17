import { Router } from "express";
import { register, login, logout, me, refresh } from "./auth.controller";
import { validate } from "../../shared/middleware/validate";
import { authenticate } from "../../shared/middleware/auth";
import { authLimiter } from "../../shared/middleware/rateLimit";
import { registerSchema, loginSchema } from "./auth.validation";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);
router.post("/refresh", refresh);

export default router;
