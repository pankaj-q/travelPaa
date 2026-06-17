import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export interface JwtPayload {
  userId: string;
  role: string;
}

export function signAccessToken(payload: JwtPayload): string {
  const expiresIn: string | number = env.JWT_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn } as SignOptions);
}

export function signRefreshToken(payload: JwtPayload): string {
  const expiresIn: string | number = env.JWT_REFRESH_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn } as SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}
