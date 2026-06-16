"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Plane, Sparkles } from "lucide-react";
import { countries, sourceCountries } from "@/lib/data";

export function RouteFinder() {
  const router = useRouter();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinationOptions = countries.map((c) => c.name);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const params = new URLSearchParams({
      source,
      destination,
    });
    router.push(`/apply?${params.toString()}`);
  };

  return (
    <section className="relative -mt-16 z-20 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl"
      >
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-2xl shadow-black/10 dark:shadow-black/30">
          {/* Header strip */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-coral/5 to-transparent px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10">
              <Sparkles className="h-5 w-5 text-coral" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Plan Your Visa Journey
              </h3>
              <p className="text-xs text-muted sm:text-sm">
                Select your origin and destination to get started
              </p>
            </div>
          </div>

          <form onSubmit={handleApply} className="p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              {/* Source */}
              <div className="relative">
                <label
                  htmlFor="source"
                  className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  <MapPin className="h-3.5 w-3.5 text-coral" />
                  Source Country
                </label>
                <div
                  className={`relative rounded-2xl border-2 transition-all duration-300 ${
                    focused === "source"
                      ? "border-coral shadow-lg shadow-coral/20"
                      : "border-border hover:border-coral/40"
                  }`}
                >
                  <select
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    onFocus={() => setFocused("source")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full appearance-none rounded-2xl bg-surface px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none sm:text-base"
                  >
                    <option value="">Select origin country</option>
                    {sourceCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="hidden sm:flex sm:items-center sm:justify-center sm:pb-3">
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/10"
                >
                  <Plane className="h-5 w-5 rotate-90 text-coral" />
                </motion.div>
              </div>

              {/* Destination */}
              <div className="relative">
                <label
                  htmlFor="destination"
                  className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  <MapPin className="h-3.5 w-3.5 text-coral" />
                  Destination Country
                </label>
                <div
                  className={`relative rounded-2xl border-2 transition-all duration-300 ${
                    focused === "destination"
                      ? "border-coral shadow-lg shadow-coral/20"
                      : "border-border hover:border-coral/40"
                  }`}
                >
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setFocused("destination")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full appearance-none rounded-2xl bg-surface px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none sm:text-base"
                  >
                    <option value="">Select destination</option>
                    {destinationOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="my-3 flex justify-center sm:hidden">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10"
              >
                <Plane className="h-4 w-4 text-coral" />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={!source || !destination || isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-coral px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/40 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Redirecting...
                  </motion.span>
                ) : (
                  <motion.span
                    key="apply"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Apply for Visa
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
