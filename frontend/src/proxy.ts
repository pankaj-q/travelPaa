import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const protectedPaths = [
  "/api/create-payment-intent",
  "/api/confirm-payment",
  "/api/applications",
];

function verifyJwt(token: string): { userId: string; role: string } {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");

  const secret = process.env.JWT_SECRET!;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${parts[0]}.${parts[1]}`)
    .digest("base64url");

  if (signature !== parts[2]) throw new Error("Invalid signature");

  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  if (payload.exp && Date.now() >= payload.exp * 1000) throw new Error("Token expired");

  return { userId: payload.userId, role: payload.role };
}

export function proxy(req: NextRequest) {
  if (!protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 });
  }

  try {
    const token = header.slice(7);
    const payload = verifyJwt(token);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-role", payload.role);
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
