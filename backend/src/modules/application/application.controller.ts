import { Request, Response } from "express";
import {
  createApplication,
  getUserApplications,
  getApplicationById,
} from "./application.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const app = await createApplication(req.user!.userId, req.body);
  res.status(201).json({ application: app });
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const applications = await getUserApplications(req.user!.userId);
  res.json({ applications });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const app = await getApplicationById(req.user!.userId, req.params.id as string);
  res.json({ application: app });
});
