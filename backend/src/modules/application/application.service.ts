import { prisma } from "../../config/database";
import { AppError } from "../../shared/utils/AppError";
import type { CreateApplicationInput } from "./application.validation";

export async function createApplication(userId: string, input: CreateApplicationInput) {
  return prisma.application.create({
    data: {
      userId,
      ...input,
      dateOfBirth: new Date(input.dateOfBirth),
      travelDate: new Date(input.travelDate),
    },
  });
}

export async function getUserApplications(
  userId: string,
  page = 1,
  limit = 20,
) {
  limit = Math.min(limit, 100);
  const skip = (page - 1) * limit;
  const where = { userId, deletedAt: null as null };

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        visaType: true,
        destination: true,
        status: true,
        createdAt: true,
        payment: { select: { status: true, amount: true } },
      },
    }),
    prisma.application.count({ where }),
  ]);

  return { applications, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getApplicationById(userId: string, id: string) {
  const app = await prisma.application.findFirst({
    where: { id, userId, deletedAt: null },
    select: {
      id: true,
      userId: true,
      status: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      dateOfBirth: true,
      nationality: true,
      passportNumber: true,
      source: true,
      destination: true,
      visaType: true,
      travelDate: true,
      duration: true,
      purpose: true,
      previousVisa: true,
      additionalInfo: true,
      adminNotes: true,
      createdAt: true,
      updatedAt: true,
      payment: {
        select: { id: true, amount: true, status: true, currency: true, createdAt: true },
      },
      documents: {
        select: { id: true, name: true, url: true, type: true, createdAt: true },
      },
    },
  });
  if (!app) {
    throw AppError.notFound("Application not found");
  }
  return app;
}

export async function getAllApplications(filters: {
  status?: string;
  destination?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}) {
  const where: Record<string, unknown> = { deletedAt: null };
  if (filters.status) where.status = filters.status;
  if (filters.destination) where.destination = filters.destination;
  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) (where.createdAt as Record<string, unknown>).gte = new Date(filters.from);
    if (filters.to) (where.createdAt as Record<string, unknown>).lte = new Date(filters.to);
  }

  const page = filters.page ?? 1;
  const limit = Math.min(filters.limit ?? 20, 100);
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        status: true,
        visaType: true,
        destination: true,
        source: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true } },
        payment: { select: { id: true, amount: true, status: true } },
      },
    }),
    prisma.application.count({ where }),
  ]);

  return { applications, total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateApplicationStatus(id: string, status: string, adminNotes?: string) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) {
    throw AppError.notFound("Application not found");
  }

  return prisma.application.update({
    where: { id },
    data: { status: status as never, adminNotes },
  });
}
