"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Shield,
  Users,
  ArrowRight,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import { type Country } from "@/lib/data";

interface CountryCardsProps {
  countries: Country[];
  title?: string;
  subtitle?: string;
}

export function CountryCards({
  countries,
  title = "Explore Visa Categories by Country",
  subtitle = "Detailed visa information and pricing for your dream destination.",
}: CountryCardsProps) {
  return (
    <section id="countries" className="bg-muted-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-18"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
            Destinations
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {countries.map((country, i) => (
            <CountryCard key={country.id} country={country} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/apply"
            className="group inline-flex items-center gap-2 rounded-xl bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/40"
          >
            View All Destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CountryCard({
  country,
  index,
}: {
  country: Country;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-md transition-all hover:border-coral/20 hover:shadow-xl hover:shadow-coral/10 will-change-transform"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-coral/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
          <h3 className="text-lg font-bold text-white drop-shadow-sm">
            {country.name}
          </h3>
          {country.rating && (
            <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-coral text-coral" />
                {country.rating}
              </span>
              {country.processing && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {country.processing}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          {country.visaCategories && (
            <div className="flex flex-wrap gap-1">
              {country.visaCategories.slice(0, 3).map((vc) => (
                <span
                  key={vc}
                  className="rounded-md bg-coral/10 px-2 py-0.5 text-[10px] font-medium text-coral"
                >
                  {vc}
                </span>
              ))}
              {country.visaCategories.length > 3 && (
                <span className="text-[10px] font-medium text-muted">
                  +{country.visaCategories.length - 3}
                </span>
              )}
            </div>
          )}
          {country.price && (
            <span className="shrink-0 text-sm font-bold text-coral">
              ₹{country.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed text-muted line-clamp-2">
          {country.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
          <div className="flex items-center gap-3 text-[10px] text-muted">
            {country.approvalRate && (
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-coral" />
                {country.approvalRate}
              </span>
            )}
            {country.popular && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 text-coral" />
                Popular
              </span>
            )}
          </div>
          <Link
            href={`/apply?destination=${encodeURIComponent(country.name)}`}
            className="flex items-center gap-0.5 text-[11px] font-semibold text-coral transition-colors hover:text-coral-light"
          >
            Apply
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
