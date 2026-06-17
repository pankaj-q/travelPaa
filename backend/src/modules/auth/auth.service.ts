import bcrypt from "bcryptjs";
import { prisma } from "../../config/database";
import { AppError } from "../../shared/utils/AppError";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt";
import type { RegisterInput, LoginInput } from "./auth.validation";

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw AppError.conflict("Email already registered", "EMAIL_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      phone: input.phone,
    },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });

  const payload = { userId: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user, accessToken, refreshToken };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || user.deletedAt) {
    throw AppError.unauthorized("Invalid email or password");
  }

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) {
    throw AppError.unauthorized("Invalid email or password");
  }

  const payload = { userId: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, createdAt: user.createdAt },
    accessToken,
    refreshToken,
  };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  if (!user) {
    throw AppError.notFound("User not found");
  }
  return user;
}

export async function refreshAccessToken(refreshToken: string) {
  const { verifyRefreshToken } = await import("../../shared/utils/jwt");
  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true },
  });
  if (!user) {
    throw AppError.unauthorized("User no longer exists");
  }

  const newPayload = { userId: user.id, role: user.role };
  return { accessToken: signAccessToken(newPayload) };
}
