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
  status: z.enum(["PENDING", "REVIEWED", "APPROVED", "REJECTED"]),
  adminNotes: z.string().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
