import { Router } from "express";
import { create } from "./contact.controller";
import { validate } from "../../shared/middleware/validate";
import { contactSchema } from "./contact.validation";

const router = Router();

router.post("/", validate(contactSchema), create);

export default router;
