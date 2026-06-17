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

export async function getUserApplications(userId: string) {
  return prisma.application.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { payment: { select: { status: true, amount: true } } },
  });
}

export async function getApplicationById(userId: string, id: string) {
  const app = await prisma.application.findFirst({
    where: { id, userId, deletedAt: null },
    include: { payment: true, documents: true },
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
  const limit = filters.limit ?? 20;
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { user: { select: { id: true, name: true, email: true } }, payment: true },
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
