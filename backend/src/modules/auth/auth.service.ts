import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "../../config/database";
import { AppError } from "../../shared/utils/AppError";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt";
import type { RegisterInput, LoginInput } from "./auth.validation";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function storeRefreshToken(userId: string, token: string) {
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await prisma.refreshToken.create({
    data: { tokenHash, userId, expiresAt },
  });
}

async function verifyRefreshTokenDb(token: string) {
  const tokenHash = hashToken(token);
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: stored.userId },
    select: { id: true, role: true },
  });
  if (!user) return null;
  return { userId: user.id, role: user.role };
}

async function revokeRefreshToken(token: string) {
  const tokenHash = hashToken(token);
  await prisma.refreshToken.update({
    where: { tokenHash },
    data: { revokedAt: new Date() },
  }).catch(() => {});
}

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
  await storeRefreshToken(user.id, refreshToken);

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
  await storeRefreshToken(user.id, refreshToken);

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
  const payload = await verifyRefreshTokenDb(refreshToken);
  if (!payload) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  // Rotate refresh token
  await revokeRefreshToken(refreshToken);
  const newPayload = { userId: payload.userId, role: payload.role };
  const newAccessToken = signAccessToken(newPayload);
  const newRefreshToken = signRefreshToken(newPayload);
  await storeRefreshToken(payload.userId, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logoutUser(refreshToken: string) {
  await revokeRefreshToken(refreshToken);
  return { success: true };
}
