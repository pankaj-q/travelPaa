import { Request, Response } from "express";
import { getAllApplications, updateApplicationStatus } from "../application/application.service";
import { getAdminStats } from "../payment/payment.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

function toStr(val: unknown): string | undefined {
  return typeof val === "string" ? val : undefined;
}

export const listApplications = asyncHandler(async (req: Request, res: Response) => {
  const pageVal = toStr(req.query.page);
  const result = await getAllApplications({
    status: toStr(req.query.status),
    destination: toStr(req.query.destination),
    from: toStr(req.query.from),
    to: toStr(req.query.to),
    page: pageVal ? Number(pageVal) : undefined,
  });
  res.json(result);
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const app = await updateApplicationStatus(req.params.id as string, req.body.status, req.body.adminNotes);
  res.json({ application: app });
});

export const stats = asyncHandler(async (_req: Request, res: Response) => {
  const data = await getAdminStats();
  res.json(data);
});
