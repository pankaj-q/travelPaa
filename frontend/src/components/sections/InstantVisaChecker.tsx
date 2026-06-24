"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Search, Plane } from "lucide-react";
import { countries, destinationCountries } from "@/lib/data";

const popularOrigins = ["India", "United States", "United Kingdom", "UAE", "Nigeria", "Philippines", "Bangladesh", "Pakistan"];

export function InstantVisaChecker() {
  const router = useRouter();
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [showNationality, setShowNationality] = useState(false);
  const [showDestination, setShowDestination] = useState(false);
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const filteredNationalities = useMemo(() => {
    if (!nationalitySearch) return destinationCountries;
    return destinationCountries.filter((c) =>
      c.toLowerCase().includes(nationalitySearch.toLowerCase())
    );
  }, [nationalitySearch]);

  const filteredDestinations = useMemo(() => {
    if (!destinationSearch) return countries.map((c) => c.name);
    return countries
      .map((c) => c.name)
      .filter((c) => c.toLowerCase().includes(destinationSearch.toLowerCase()));
  }, [destinationSearch]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality || !destination) return;
    const country = countries.find(
      (c) => c.name.toLowerCase() === destination.toLowerCase()
    );
    if (country) {
      router.push(`/destinations/${country.slug}`);
    }
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
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="flex items-center gap-3 border-b border-border/50 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral/10">
              <Search className="h-4 w-4 text-coral" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground sm:text-base">
                Instant Visa Checker
              </h3>
              <p className="text-xs text-muted">
                Select your nationality and destination to check visa requirements
              </p>
            </div>
          </div>

          <form onSubmit={handleCheck} className="p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div className="relative">
                <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  Nationality
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nationality || nationalitySearch}
                    onFocus={() => { setShowNationality(true); setShowDestination(false); }}
                    onChange={(e) => {
                      setNationalitySearch(e.target.value);
                      setNationality("");
                    }}
                    placeholder="Select your nationality"
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                  {showNationality && (
                    <div className="absolute left-0 top-full z-30 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-border/60 bg-surface shadow-lg">
                      {nationality && !destinationCountries.includes(nationality) && (
                        <div className="flex flex-wrap gap-1.5 border-b border-border/40 px-3 py-2">
                          {popularOrigins.filter((o) => o.toLowerCase().includes(nationalitySearch.toLowerCase())).map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => { setNationality(p); setNationalitySearch(""); setShowNationality(false); }}
                              className="rounded-md bg-coral/10 px-2.5 py-1 text-xs font-medium text-coral transition-colors hover:bg-coral/20"
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                      {filteredNationalities.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setNationality(c); setNationalitySearch(""); setShowNationality(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-coral/5 ${
                            nationality === c ? "bg-coral/10 font-medium text-coral" : "text-foreground/70"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:justify-center sm:pb-3">
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/10"
                >
                  <Plane className="h-5 w-5 text-coral" />
                </motion.div>
              </div>

              <div className="relative">
                <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination || destinationSearch}
                    onFocus={() => { setShowDestination(true); setShowNationality(false); }}
                    onChange={(e) => {
                      setDestinationSearch(e.target.value);
                      setDestination("");
                    }}
                    placeholder="Select destination country"
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
                  />
                  {showDestination && (
                    <div className="absolute left-0 top-full z-30 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-border/60 bg-surface shadow-lg">
                      {filteredDestinations.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => { setDestination(name); setDestinationSearch(""); setShowDestination(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-coral/5 ${
                            destination === name ? "bg-coral/10 font-medium text-coral" : "text-foreground/70"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

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
              disabled={!nationality || !destination}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search className="h-4 w-4" />
              Check Requirements
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
