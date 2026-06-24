"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, ImageOff, Users } from "lucide-react";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { countries } from "@/lib/data";

export default function DestinationsPage() {
  const [search, setSearch] = useState("");

  const filtered = search
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
              Destinations
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              All Visa Destinations
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Explore visa requirements, processing times, and fees for destinations worldwide.
            </p>
          </motion.div>

          <div className="relative mx-auto mb-10 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full rounded-xl border-2 border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-coral focus:shadow-lg focus:shadow-coral/10"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((country, i) => (
              <CountryCard key={country.id} country={country} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted">
              No destinations found matching &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function CountryCard({ country, index }: { country: (typeof countries)[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-md transition-all hover:border-coral/20 hover:shadow-xl hover:shadow-coral/10 will-change-transform"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-coral/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <Link href={`/destinations/${country.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imgError ? (
            <Image
              src={country.image}
              alt={country.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted-bg">
              <ImageOff className="h-8 w-8 text-muted/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white drop-shadow-sm">{country.name}</h3>
            {country.visasProcessed && (
              <div className="mt-1 flex items-center gap-1 text-xs text-white/80">
                <Users className="h-3 w-3 text-coral" />
                {country.visasProcessed} Visa Processed
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs leading-relaxed text-muted line-clamp-2">{country.description}</p>
        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
          <span className="text-[11px] font-medium text-muted">{country.visaType}</span>
          <Link
            href={`/destinations/${country.slug}`}
            className="flex items-center gap-0.5 text-[11px] font-semibold text-coral transition-colors hover:text-coral-light"
          >
            Apply Now
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
