"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff, Users } from "lucide-react";
import { countries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featured = countries.filter((c) => c.featured).slice(0, 12);

export function PopularDestinations() {
  return (
    <section id="popular-destinations" className="bg-muted-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Popular Destinations"
          title="Most Popular Visa Destinations"
          subtitle="Explore our most requested destinations with expert visa assistance and high approval rates."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {featured.map((country, i) => (
            <DestinationCard key={country.id} country={country} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/destinations"
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

function DestinationCard({
  country,
  index,
}: {
  country: (typeof countries)[0];
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
            <h3 className="text-lg font-bold text-white drop-shadow-sm">
              {country.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
              {country.visasProcessed && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-coral" />
                  {country.visasProcessed} Visa Processed
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs leading-relaxed text-muted line-clamp-2">
          {country.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
          <span className="text-[11px] font-medium text-muted">
            {country.visaType}
          </span>
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
