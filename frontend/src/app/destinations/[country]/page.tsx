"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  HelpCircle,
  Briefcase,
  Plane,
  GraduationCap,
  Building2,
  Heart,
  ArrowRightLeft,
  DollarSign,
  Shield,
} from "lucide-react";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { countries, visaCategories } from "@/lib/data";
import { countryData } from "@/lib/country-data";

const categoryIcons: Record<string, typeof Plane> = {
  tourist: Plane,
  business: Briefcase,
  student: GraduationCap,
  work: Building2,
  family: Heart,
  transit: ArrowRightLeft,
};

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.country as string;

  const country = countries.find((c) => c.slug === slug);
  const data = countryData[slug];

  const availableCategories = useMemo(
    () => (data ? visaCategories.filter((vc) => data.categories[vc.id]) : []),
    [data],
  );

  const [selectedCategory, setSelectedCategory] = useState(availableCategories[0]?.id ?? "");
  const [catOpen, setCatOpen] = useState(false);

  if (!country || !data) {
    return (
      <>
        <TopInfoBar />
        <Navbar />
        <main className="min-h-screen bg-muted-bg py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <AlertCircle className="mx-auto h-12 w-12 text-coral" />
            <h1 className="mt-4 text-2xl font-bold text-foreground">Destination Not Found</h1>
            <p className="mt-2 text-sm text-muted">The destination you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/destinations"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Browse Destinations
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryInfo = selectedCategory ? data.categories[selectedCategory] : null;
  const selectedCatMeta = visaCategories.find((vc) => vc.id === selectedCategory);
  const CatIcon = selectedCategory ? (categoryIcons[selectedCategory] ?? Plane) : Plane;

  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg">
        <div className="relative flex min-h-[40vh] items-center overflow-hidden">
          <Image
            src={country.image}
            alt={country.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8">
            <Link
              href="/destinations"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-coral"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Destinations
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
              {country.name} Visa
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/90 drop-shadow-md">
              {data.description}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-8">
                <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <ChevronDown className="h-3.5 w-3.5 text-coral" />
                  Select Visa Category
                </label>
                <div className="relative">
                  <button
                    onClick={() => setCatOpen(!catOpen)}
                    className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-surface px-5 py-3.5 text-sm font-medium text-foreground outline-none transition-all focus:border-coral"
                  >
                    {selectedCatMeta ? (
                      <span className="flex items-center gap-2">
                        <CatIcon className="h-4 w-4 text-coral" />
                        {selectedCatMeta.title}
                      </span>
                    ) : (
                      "Select a visa category"
                    )}
                    <ChevronDown className={`h-4 w-4 text-muted transition-transform ${catOpen ? "rotate-180" : ""}`} />
                  </button>
                  {catOpen && (
                    <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-xl border border-border/60 bg-surface shadow-lg">
                      {availableCategories.map((vc) => {
                        const Icon = categoryIcons[vc.id] ?? Plane;
                        return (
                          <button
                            key={vc.id}
                            onClick={() => { setSelectedCategory(vc.id); setCatOpen(false); }}
                            className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-coral/5 ${
                              selectedCategory === vc.id
                                ? "bg-coral/10 font-medium text-coral"
                                : "text-foreground/70"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{vc.title}</span>
                            <span className="ml-auto text-xs text-muted">{vc.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {categoryInfo && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-surface p-5 text-center shadow-sm">
                      <Clock className="mx-auto h-6 w-6 text-coral" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">Processing Time</p>
                      <p className="mt-1 text-sm font-bold text-foreground">{categoryInfo.processingTime}</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-surface p-5 text-center shadow-sm">
                      <DollarSign className="mx-auto h-6 w-6 text-coral" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">Govt Fee</p>
                      <p className="mt-1 text-sm font-bold text-foreground">${categoryInfo.govtFee}</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-surface p-5 text-center shadow-sm">
                      <Shield className="mx-auto h-6 w-6 text-coral" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">Service Charge</p>
                      <p className="mt-1 text-sm font-bold text-foreground">${categoryInfo.serviceCharge}</p>
                    </div>
                  </div>

                  {categoryInfo.appointmentCharge && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400">
                      Appointment charge: ${categoryInfo.appointmentCharge} (applicable for Schengen appointments)
                    </div>
                  )}

                  <div className="mt-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-coral" />
                      Requirements
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {categoryInfo.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                      <FileText className="h-5 w-5 text-coral" />
                      Required Documents
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {categoryInfo.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                      <HelpCircle className="h-5 w-5 text-coral" />
                      Frequently Asked Questions
                    </h3>
                    <div className="mt-4 space-y-3">
                      {categoryInfo.faqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group rounded-xl border border-border/60 bg-surface shadow-sm transition-all open:border-coral/30"
                        >
                          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-foreground">
                            {faq.question}
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="border-t border-border/40 px-5 py-4 text-sm leading-relaxed text-muted">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <div className="sticky top-24 rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Visa Summary
                </h4>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Category</span>
                    <span className="font-medium text-foreground">{selectedCatMeta?.title ?? "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Duration</span>
                    <span className="font-medium text-foreground">{selectedCatMeta?.duration ?? "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Govt Fee</span>
                    <span className="font-medium text-foreground">${categoryInfo?.govtFee ?? "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Service Charge</span>
                    <span className="font-medium text-foreground">${categoryInfo?.serviceCharge ?? "—"}</span>
                  </div>
                  {categoryInfo?.appointmentCharge && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Appointment</span>
                      <span className="font-medium text-foreground">${categoryInfo.appointmentCharge}</span>
                    </div>
                  )}
                  {categoryInfo?.insuranceRequired && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Insurance</span>
                      <span className="font-medium text-foreground">Required</span>
                    </div>
                  )}
                  <div className="border-t border-border/40 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-foreground">Total (est.)</span>
                      <span className="font-bold text-coral">
                        ${(categoryInfo ? categoryInfo.govtFee + categoryInfo.serviceCharge + (categoryInfo.appointmentCharge ?? 0) : 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/apply?destination=${encodeURIComponent(country.name)}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/40"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
