"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  XCircle,
  Package,
  Loader2,
} from "lucide-react";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const statuses = [
  { id: "DOCUMENTS_PENDING", label: "Documents Pending", icon: FileText, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/30" },
  { id: "UNDER_REVIEW", label: "Under Review", icon: Clock, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/30" },
  { id: "SUBMITTED_TO_EMBASSY", label: "Submitted to Embassy", icon: Send, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-950/30" },
  { id: "IN_EMBASSY", label: "In Embassy", icon: Building2, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-950/30" },
  { id: "APPROVED", label: "Approved", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100 dark:bg-green-950/30" },
  { id: "REJECTED", label: "Rejected", icon: XCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-950/30" },
  { id: "DELIVERED", label: "Delivered", icon: Package, color: "text-teal-500", bg: "bg-teal-100 dark:bg-teal-950/30" },
];

export default function TrackPage() {
  const [appNumber, setAppNumber] = useState("");
  const [dob, setDob] = useState("");
  const [passport, setPassport] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: string;
    appNumber: string;
    destination: string;
    visaType: string;
    submittedAt: string;
    updatedAt: string;
  } | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber || !dob || !passport) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/applications/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: appNumber,
          dateOfBirth: dob,
          passportNumber: passport,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Application not found");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to track application");
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = result
    ? statuses.findIndex((s) => s.id === result.status)
    : -1;

  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
              <Search className="h-3.5 w-3.5" />
              Track Application
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Track Your Visa Status
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Enter your application details below to check the current status of your visa application.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8"
          >
            <form onSubmit={handleTrack} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Application Number
                </label>
                <input
                  type="text"
                  value={appNumber}
                  onChange={(e) => setAppNumber(e.target.value)}
                  placeholder="e.g. APP-100001"
                  required
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                    placeholder="e.g. P1234567"
                    required
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Track Status
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-bold text-foreground">
                  Application Status
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Application #</span>
                    <span className="font-medium text-foreground">{result.appNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Destination</span>
                    <span className="font-medium text-foreground">{result.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Visa Type</span>
                    <span className="font-medium text-foreground">{result.visaType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Submitted</span>
                    <span className="font-medium text-foreground">{new Date(result.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Last Updated</span>
                    <span className="font-medium text-foreground">{new Date(result.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">
                  Status Timeline
                </h3>
                <div className="relative space-y-0">
                  {statuses.map((s, i) => {
                    const isRejected = result.status === "REJECTED";
                    const Icon = s.icon;

                    let state: "completed" | "current" | "skipped" | "pending";
                    if (isRejected && s.id === "rejected") {
                      state = "current";
                    } else if (isRejected) {
                      state = "skipped";
                    } else if (i < currentStatusIndex) {
                      state = "completed";
                    } else if (i === currentStatusIndex) {
                      state = "current";
                    } else {
                      state = "pending";
                    }

                    return (
                      <div key={s.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
                        <div className="relative z-10 flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                              state === "completed"
                                ? "bg-green-500 text-white"
                                : state === "current"
                                ? `${s.bg} ${s.color} ring-2 ring-coral/30`
                                : state === "skipped"
                                ? "bg-red-100 text-red-400 dark:bg-red-950/30"
                                : "bg-muted-bg text-muted/40"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {i < statuses.length - 1 && (
                            <div
                              className={`mt-1 h-full w-0.5 ${
                                i < currentStatusIndex ? "bg-green-400" : "bg-border/60"
                              }`}
                            />
                          )}
                        </div>
                        <div className="pt-1">
                          <p
                            className={`text-sm font-medium ${
                              state === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : state === "current"
                                ? "text-foreground"
                                : state === "skipped"
                                ? "text-red-400 line-through"
                                : "text-muted/50"
                            }`}
                          >
                            {s.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
