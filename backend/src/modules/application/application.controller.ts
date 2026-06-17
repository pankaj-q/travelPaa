import { Request, Response, NextFunction } from "express";
import {
  createApplication,
  getUserApplications,
  getApplicationById,
} from "./application.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const app = await createApplication(req.user!.userId, req.body);
    res.status(201).json({ application: app });
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const applications = await getUserApplications(req.user!.userId);
    res.json({ applications });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const app = await getApplicationById(req.user!.userId, req.params.id as string);
    res.json({ application: app });
  } catch (err) {
    next(err);
  }
}
