"use client";

import { Suspense, useState, useCallback } from "react";
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
  CreditCard,
  Loader2,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { countries, sourceCountries, visaCategories } from "@/lib/data";
import { OrderSummary } from "@/components/payment/OrderSummary";
import { StripeProvider } from "@/components/payment/StripeProvider";
import { PaymentForm } from "@/components/payment/PaymentForm";

function ApplyForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async (appId: string) => {
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to initialize payment");
      setClientSecret(data.clientSecret);
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Failed to initialize payment"
      );
    } finally {
      setPaymentLoading(false);
    }
  }, []);

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (stepNum === 1) {
      const step1Fields = ["firstName", "lastName", "email", "phone", "dateOfBirth", "nationality", "passportNumber"];
      step1Fields.forEach((f) => {
        if (!form[f as keyof typeof form].trim()) newErrors[f] = "This field is required";
      });
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    }
    if (stepNum === 2) {
      const step2Fields = ["source", "destination", "visaType", "travelDate", "duration", "purpose"];
      step2Fields.forEach((f) => {
        if (!form[f as keyof typeof form].trim()) newErrors[f] = "This field is required";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const appRes = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          previousVisa: form.previousVisa === "yes",
        }),
      });
      const appData = await appRes.json();
      if (!appRes.ok) throw new Error(appData.error ?? "Failed to submit application");

      const appId = appData.application?.id ?? appData.id;
      setSubmittedAppId(appId);

      const piRes = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId }),
      });
      const piData = await piRes.json();
      if (!piRes.ok) throw new Error(piData.error ?? "Failed to initialize payment");

      setClientSecret(piData.clientSecret);
      setStep(4);
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Failed to initialize payment"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setSubmitted(true);
  };

  const handlePaymentError = () => {};

  const steps = [
    { num: 1, label: "Personal Info", icon: User },
    { num: 2, label: "Travel Details", icon: Globe2 },
    { num: 3, label: "Review", icon: FileText },
    { num: 4, label: "Payment", icon: CreditCard },
  ];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-2xl border border-border/60 bg-surface p-8 text-center shadow-sm sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg shadow-green-200/50 dark:from-green-900/40 dark:to-emerald-900/40 dark:shadow-green-900/30"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">
          Application Submitted & Payment Confirmed!
        </h2>
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Thank you, <strong className="text-foreground">{form.firstName}</strong>! Your visa application for{" "}
          <strong className="text-foreground">{form.destination}</strong> has
          been received and your payment is confirmed. Our team will contact
          you within 24 hours.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted-bg px-4 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">App ID</span>
          <span className="font-mono text-xs font-medium text-foreground">{submittedAppId}</span>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-semibold text-white shadow-md shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/35"
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
      <div className="mb-10 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = step >= s.num;
          const isCurrent = step === s.num;
          return (
            <div key={s.num} className="flex flex-col items-center flex-1">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  active
                    ? "bg-coral text-white shadow-md shadow-coral/30"
                    : "border-2 border-border/80 bg-surface text-muted"
                } ${isCurrent ? "ring-2 ring-coral/30 ring-offset-2 ring-offset-muted-bg" : ""}`}
              >
                {step > s.num ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Icon className="h-4" />
                )}
              </div>
              <span
                className={`mt-2 hidden text-[10px] font-semibold uppercase tracking-[0.1em] sm:block ${
                  active ? "text-coral" : "text-muted/70"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-[2.2rem] left-1/2 w-full h-0.5 -translate-x-1/2 transition-colors duration-300 ${
                    step > s.num ? "bg-coral/60" : "bg-border/60"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={step === 3 ? handleProceedToPayment : (e) => e.preventDefault()}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-foreground">
                Personal Information
              </h2>
              <div className="mb-6 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
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
                      className={`w-full rounded-xl bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all ${
                        errors[field.id]
                          ? "border-2 border-red-500 focus:border-red-500 focus:shadow-red-500/10"
                          : "border-2 border-border focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                      }`}
                    />
                    {errors[field.id] && (
                      <p className="mt-1 text-xs text-red-500">{errors[field.id]}</p>
                    )}
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
              className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-foreground">
                Travel Details
              </h2>
              <div className="mb-6 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
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
              className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-foreground">
                Review Your Application
              </h2>
              <div className="mb-6 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
              <div className="grid gap-3">
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
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-muted-bg/70 px-4 py-3"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted/80">
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

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral/10">
                  <CreditCard className="h-4 w-4 text-coral" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Payment & Submit
                  </h2>
                  <p className="text-xs text-muted">
                    Complete your application with a secure payment
                  </p>
                </div>
              </div>
              <div className="my-6 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />

              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <OrderSummary
                    visaType={form.visaType || "Visa Processing"}
                    destination={form.destination}
                    amount={5000}
                  />
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-surface px-4 py-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-green-500" />
                    <p className="text-xs text-muted">
                      Your data is encrypted end-to-end. We never store your
                      card details.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  {paymentLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-surface p-12 shadow-lg"
                    >
                      <Loader2 className="mb-4 h-8 w-8 animate-spin text-coral" />
                      <p className="text-sm font-medium text-foreground">
                        Preparing secure payment...
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Establishing encrypted connection with Stripe.
                      </p>
                    </motion.div>
                  )}

                  {paymentError && !paymentLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-red-200 bg-surface p-8 text-center shadow-lg dark:border-red-900/50"
                    >
                      <p className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">
                        Payment Initialization Failed
                      </p>
                      <p className="mb-6 text-xs text-muted">{paymentError}</p>
                      <button
                        type="button"
                        onClick={() => submittedAppId && createPaymentIntent(submittedAppId)}
                        className="inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
                      >
                        <RotateCw className="h-4 w-4" />
                        Retry
                      </button>
                    </motion.div>
                  )}

                  {clientSecret && !paymentLoading && (
                    <StripeProvider clientSecret={clientSecret}>
                      <PaymentForm
                        amount={5000}
                        applicationId={submittedAppId ?? ""}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </StripeProvider>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {step !== 4 && (
          <div className="mt-8 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 px-5 py-2.5 text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 px-5 py-2.5 text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) {
                    setStep(step + 1);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/35"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              step === 3 && (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/35"
                >
                  Continue to Payment
                  <ArrowRight className="h-4 w-4" />
                </button>
              )
            )}
          </div>
        )}

        {step === 4 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-lg border border-border/80 px-5 py-2.5 text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Review
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="relative min-h-screen bg-muted-bg py-12 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.04]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556388158-158f5eac0a60?w=1920&q=80)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
              Visa Application
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Apply for Your Visa
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
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
