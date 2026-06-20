"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const LoginPage = dynamic(
  () =>
    import("@/components/ui/animated-characters-login-page").then(
      (m) => ({ default: m.LoginPage })
    ),
  {
    ssr: false,
  }
);

export default function Login() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </main>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
