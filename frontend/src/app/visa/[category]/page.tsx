import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  ListChecks,
  HelpCircle,
  ArrowRight,
  Shield,
  Globe,
  BookOpen,
} from "lucide-react";
import { visaCategories } from "@/lib/data";
import { visaDetails } from "@/lib/visa-details";

export async function generateStaticParams() {
  return visaCategories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const detail = visaDetails[slug];
  if (!detail) return { title: "Visa Not Found - travelPaa" };
  return {
    title: `${detail.title} - travelPaa`,
    description: detail.heroDescription,
  };
}

const iconMap: Record<string, typeof ArrowRight> = {
  Globe,
  BookOpen,
  Shield,
};

export default async function VisaCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const detail = visaDetails[slug];
  if (!detail) notFound();

  const category = visaCategories.find((c) => c.id === slug);

  return (
    <>
      <header className="border-b border-border/60 bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral shadow-md shadow-coral/25">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-[#60A5FA]">travel</span>
            <span className="text-base font-bold text-coral-light">Paa</span>
          </Link>
          <Link
            href="/apply"
            className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40"
          >
            Apply Now
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-navy via-navy-dark to-navy py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href="/#visa-categories"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-coral"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Visa Categories
            </Link>
            <div className="max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/30 bg-coral/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral-light">
                {detail.title}
              </span>
              <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {detail.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                {detail.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/apply?visaType=${encodeURIComponent(detail.title)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40"
                >
                  Apply for {detail.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm text-white/70">
                  <Clock className="h-4 w-4 text-coral-light" />
                  {detail.processingTime}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm text-white/70">
                  <IndianRupee className="h-4 w-4 text-coral-light" />
                  ₹{detail.fee.toLocaleString("en-IN")} starting
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 lg:pr-8">
                <div className="mb-12">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-coral" />
                    Benefits
                  </h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {detail.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 rounded-xl border border-border/50 bg-surface p-4 shadow-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <span className="text-sm text-muted">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-12">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <ListChecks className="h-5 w-5 text-coral" />
                    Application Process
                  </h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
                  <div className="mt-6 space-y-4">
                    {detail.process.map((step, i) => (
                      <div
                        key={step.step}
                        className="flex gap-4 rounded-xl border border-border/50 bg-surface p-5 shadow-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral text-sm font-bold text-white">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {step.step}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <FileText className="h-5 w-5 text-coral" />
                    Required Documents
                  </h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {detail.documents.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-start gap-3 rounded-xl border border-border/50 bg-surface p-4 shadow-sm"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/10">
                          <div className="h-2 w-2 rounded-full bg-coral" />
                        </div>
                        <span className="text-sm text-muted">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <HelpCircle className="h-5 w-5 text-coral" />
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-coral/20 via-border/50 to-transparent" />
                  <div className="mt-6 space-y-4">
                    {detail.faq.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-xl border border-border/50 bg-surface shadow-sm"
                      >
                        <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-foreground">
                          {item.question}
                          <ArrowRight className="h-4 w-4 text-coral transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="border-t border-border/50 px-4 py-3">
                          <p className="text-sm leading-relaxed text-muted">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Visa Summary
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-muted-bg px-4 py-3">
                        <span className="text-xs text-muted">Type</span>
                        <span className="text-sm font-semibold text-foreground">
                          {detail.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted-bg px-4 py-3">
                        <span className="text-xs text-muted">Processing</span>
                        <span className="text-sm font-semibold text-foreground">
                          {detail.processingTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted-bg px-4 py-3">
                        <span className="text-xs text-muted">Validity</span>
                        <span className="text-sm font-semibold text-foreground">
                          {detail.validity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted-bg px-4 py-3">
                        <span className="text-xs text-muted">Fee (our service)</span>
                        <span className="text-sm font-bold text-coral">
                          ₹{detail.fee.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {category?.duration && (
                        <div className="flex items-center justify-between rounded-lg bg-muted-bg px-4 py-3">
                          <span className="text-xs text-muted">Duration</span>
                          <span className="text-sm font-semibold text-foreground">
                            {category.duration}
                          </span>
                        </div>
                      )}
                    </div>
                    {detail.feeNote && (
                      <p className="mt-3 text-[11px] text-muted italic">
                        *{detail.feeNote}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Eligibility
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {detail.eligibility.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-muted"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/apply?visaType=${encodeURIComponent(detail.title)}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/#contact"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border/80 px-6 py-3.5 text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:text-coral"
                  >
                    Contact Us
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-navy py-8 text-white/50">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs lg:px-8">
          &copy; {new Date().getFullYear()} travelPaa. All rights reserved.
        </div>
      </footer>
    </>
  );
}
