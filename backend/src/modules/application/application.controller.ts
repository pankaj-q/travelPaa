import { Request, Response } from "express";
import {
  createApplication,
  getUserApplications,
  getApplicationById,
  trackApplication,
} from "./application.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const app = await createApplication(req.user!.userId, req.body);
  res.status(201).json({ application: app });
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const page = typeof req.query.page === "string" ? Number(req.query.page) : 1;
  const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : 20;
  const result = await getUserApplications(req.user!.userId, page, limit);
  res.json(result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const app = await getApplicationById(req.user!.userId, req.params.id as string);
  res.json({ application: app });
});

export const track = asyncHandler(async (req: Request, res: Response) => {
  const { applicationNumber, dateOfBirth, passportNumber } = req.body;
  const result = await trackApplication(applicationNumber, dateOfBirth, passportNumber);
  res.json(result);
});
