import { Request, Response } from "express";
import { registerUser, loginUser, getMe, refreshAccessToken } from "./auth.service";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/v1/auth",
  });
  res.status(201).json({ user: result.user, accessToken: result.accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/v1/auth",
  });
  res.json({ user: result.user, accessToken: result.accessToken });
});

export async function logout(_req: Request, res: Response) {
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });
  res.json({ message: "Logged out successfully" });
}

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await getMe(req.user!.userId);
  res.json({ user });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401).json({ error: "Refresh token not found" });
    return;
  }
  try {
    const result = await refreshAccessToken(token);
    res.json(result);
  } catch (err) {
    res.clearCookie("refreshToken", { path: "/api/v1/auth" });
    throw err;
  }
});
