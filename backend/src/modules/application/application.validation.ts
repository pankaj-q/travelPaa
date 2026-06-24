import { z } from "zod";

export const createApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  nationality: z.string().min(1, "Nationality is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  source: z.string().min(1, "Source country is required"),
  destination: z.string().min(1, "Destination country is required"),
  visaType: z.string().min(1, "Visa type is required"),
  travelDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid travel date"),
  duration: z.string().min(1, "Duration is required"),
  purpose: z.string().min(1, "Purpose is required"),
  previousVisa: z.boolean().optional().default(false),
  additionalInfo: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "DOCUMENTS_PENDING",
    "UNDER_REVIEW",
    "SUBMITTED_TO_EMBASSY",
    "IN_EMBASSY",
    "APPROVED",
    "REJECTED",
    "DELIVERED",
  ]),
  adminNotes: z.string().optional(),
});

export const trackApplicationSchema = z.object({
  applicationNumber: z.string().min(1, "Application number is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  passportNumber: z.string().min(1, "Passport number is required"),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
