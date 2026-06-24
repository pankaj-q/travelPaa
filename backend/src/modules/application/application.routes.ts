import { Router } from "express";
import { create, list, getById, track } from "./application.controller";
import { validate } from "../../shared/middleware/validate";
import { authenticate } from "../../shared/middleware/auth";
import {
  createApplicationSchema,
  trackApplicationSchema,
} from "./application.validation";

const router = Router();

router.post("/track", validate(trackApplicationSchema), track);

router.use(authenticate);

router.post("/", validate(createApplicationSchema), create);
router.get("/", list);
router.get("/:id", getById);

export default router;
