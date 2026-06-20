"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { api } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    api
      .get<{ user: User }>("/auth/me")
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        setLoading(false);
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post<{ user: User; accessToken: string }>(
      "/auth/login",
      { email, password }
    );
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const result = await api.post<{ user: User; accessToken: string }>(
      "/auth/register",
      data
    );
    localStorage.setItem("accessToken", result.accessToken);
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    localStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
