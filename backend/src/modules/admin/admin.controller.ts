import { Request, Response, NextFunction } from "express";
import { getAllApplications, updateApplicationStatus } from "../application/application.service";
import { getAdminStats } from "../payment/payment.service";

function toStr(val: unknown): string | undefined {
  return typeof val === "string" ? val : undefined;
}

export async function listApplications(req: Request, res: Response, next: NextFunction) {
  try {
    const pageVal = toStr(req.query.page);
    const result = await getAllApplications({
      status: toStr(req.query.status),
      destination: toStr(req.query.destination),
      from: toStr(req.query.from),
      to: toStr(req.query.to),
      page: pageVal ? Number(pageVal) : undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const app = await updateApplicationStatus(req.params.id as string, req.body.status, req.body.adminNotes);
    res.json({ application: app });
  } catch (err) {
    next(err);
  }
}

export async function stats(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getAdminStats();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
