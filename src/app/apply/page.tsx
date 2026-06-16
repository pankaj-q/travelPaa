"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe2,
} from "lucide-react";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { countries, sourceCountries, visaCategories } from "@/lib/data";

function ApplyForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    source: searchParams.get("source") ?? "",
    destination: searchParams.get("destination") ?? "",
    visaType: "",
    travelDate: "",
    duration: "",
    purpose: "",
    previousVisa: "no",
    additionalInfo: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const steps = [
    { num: 1, label: "Personal Info", icon: User },
    { num: 2, label: "Travel Details", icon: Globe2 },
    { num: 3, label: "Review & Submit", icon: FileText },
  ];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border border-border/60 bg-surface p-8 text-center shadow-xl sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">
          Application Submitted!
        </h2>
        <p className="mt-3 text-sm text-muted sm:text-base">
          Thank you, {form.firstName}! Your visa application for{" "}
          <strong className="text-foreground">{form.destination}</strong> has
          been received. Our team will contact you within 24 hours.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress steps */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = step >= s.num;
          return (
            <div key={s.num} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                    active
                      ? "bg-coral text-white shadow-lg shadow-coral/30"
                      : "border-2 border-border bg-surface text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`mt-2 hidden text-[10px] font-semibold uppercase tracking-wider sm:block ${
                    active ? "text-coral" : "text-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors ${
                    step > s.num ? "bg-coral" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border border-border/60 bg-surface p-6 shadow-lg sm:p-8"
            >
              <h2 className="mb-6 text-xl font-bold text-foreground">
                Personal Information
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { id: "firstName", label: "First Name", type: "text", required: true },
                  { id: "lastName", label: "Last Name", type: "text", required: true },
                  { id: "email", label: "Email Address", type: "email", icon: Mail, required: true },
                  { id: "phone", label: "Phone Number", type: "tel", icon: Phone, required: true },
                  { id: "dateOfBirth", label: "Date of Birth", type: "date", icon: Calendar, required: true },
                  { id: "nationality", label: "Nationality", type: "text", required: true },
                  { id: "passportNumber", label: "Passport Number", type: "text", required: true },
                ].map((field) => (
                  <div key={field.id} className={field.id === "passportNumber" ? "sm:col-span-2" : ""}>
                    <label htmlFor={field.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border border-border/60 bg-surface p-6 shadow-lg sm:p-8"
            >
              <h2 className="mb-6 text-xl font-bold text-foreground">
                Travel Details
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="source" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    <MapPin className="mr-1 inline h-3.5 w-3.5 text-coral" />
                    Source Country
                  </label>
                  <select
                    id="source"
                    required
                    value={form.source}
                    onChange={(e) => update("source", e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  >
                    <option value="">Select origin</option>
                    {sourceCountries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="destination" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    <Globe2 className="mr-1 inline h-3.5 w-3.5 text-coral" />
                    Destination Country
                  </label>
                  <select
                    id="destination"
                    required
                    value={form.destination}
                    onChange={(e) => update("destination", e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  >
                    <option value="">Select destination</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="visaType" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Visa Type
                  </label>
                  <select
                    id="visaType"
                    required
                    value={form.visaType}
                    onChange={(e) => update("visaType", e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  >
                    <option value="">Select visa type</option>
                    {visaCategories.map((v) => (
                      <option key={v.id} value={v.title}>{v.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="travelDate" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Intended Travel Date
                  </label>
                  <input
                    id="travelDate"
                    type="date"
                    required
                    value={form.travelDate}
                    onChange={(e) => update("travelDate", e.target.value)}
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Duration of Stay
                  </label>
                  <select
                    id="duration"
                    required
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  >
                    <option value="">Select duration</option>
                    <option value="1-2 weeks">1–2 weeks</option>
                    <option value="2-4 weeks">2–4 weeks</option>
                    <option value="1-3 months">1–3 months</option>
                    <option value="3-6 months">3–6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="previousVisa" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Previous Visa to Destination?
                  </label>
                  <select
                    id="previousVisa"
                    value={form.previousVisa}
                    onChange={(e) => update("previousVisa", e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="purpose" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Purpose of Travel
                  </label>
                  <textarea
                    id="purpose"
                    required
                    rows={3}
                    value={form.purpose}
                    onChange={(e) => update("purpose", e.target.value)}
                    placeholder="Briefly describe the purpose of your visit..."
                    className="w-full resize-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border border-border/60 bg-surface p-6 shadow-lg sm:p-8"
            >
              <h2 className="mb-6 text-xl font-bold text-foreground">
                Review Your Application
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: `${form.firstName} ${form.lastName}` },
                  { label: "Email", value: form.email },
                  { label: "Phone", value: form.phone },
                  { label: "Passport", value: form.passportNumber },
                  { label: "Route", value: `${form.source} → ${form.destination}` },
                  { label: "Visa Type", value: form.visaType },
                  { label: "Travel Date", value: form.travelDate },
                  { label: "Duration", value: form.duration },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-muted-bg px-4 py-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {row.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <label htmlFor="additionalInfo" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  rows={3}
                  value={form.additionalInfo}
                  onChange={(e) => update("additionalInfo", e.target.value)}
                  placeholder="Any additional details you'd like to share..."
                  className="w-full resize-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-coral/40 hover:bg-coral/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-coral/40 hover:bg-coral/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-coral/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral">
              Visa Application
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Apply for Your Visa
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
              Complete the form below and our expert consultants will guide you
              through every step of the process.
            </p>
          </motion.div>

          <Suspense
            fallback={
              <div className="mx-auto max-w-3xl animate-pulse rounded-3xl bg-surface p-12 text-center text-muted">
                Loading application form...
              </div>
            }
          >
            <ApplyForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
