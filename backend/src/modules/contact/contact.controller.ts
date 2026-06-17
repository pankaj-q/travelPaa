import { Request, Response, NextFunction } from "express";
import { submitContact } from "./contact.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const contact = await submitContact(req.body);
    res.status(201).json({ message: "Message received. We'll get back to you soon.", contact });
  } catch (err) {
    next(err);
  }
}
