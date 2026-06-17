import { Router } from "express";
import { create, list, getById } from "./application.controller";
import { validate } from "../../shared/middleware/validate";
import { authenticate } from "../../shared/middleware/auth";
import { createApplicationSchema } from "./application.validation";

const router = Router();

router.use(authenticate);

router.post("/", validate(createApplicationSchema), create);
router.get("/", list);
router.get("/:id", getById);

export default router;
