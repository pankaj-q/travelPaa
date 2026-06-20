import { Request, Response } from "express";
import { submitContact } from "./contact.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const contact = await submitContact(req.body);
  res.status(201).json({ message: "Message received. We'll get back to you soon.", contact });
});
