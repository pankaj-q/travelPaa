import { Router } from "express";
import { listApplications, updateStatus, stats } from "./admin.controller";
import { authenticate, requireAdmin } from "../../shared/middleware/auth";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/applications", listApplications);
router.patch("/applications/:id/status", updateStatus);
router.get("/stats", stats);

export default router;
