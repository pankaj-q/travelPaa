"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, FileCheck, ImageOff } from "lucide-react";
import { countries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CountryCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());

  const handleImgError = useCallback((id: string) => {
    setErroredImages((prev) => new Set(prev).add(id));
  }, []);

  return (
    <section id="countries" className="bg-muted-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Destinations"
          title="Countries We Serve"
          subtitle="Explore our most popular destinations with dedicated visa support, fast processing, and expert guidance."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((country, i) => {
            const isError = erroredImages.has(country.id);

            return (
              <motion.article
                key={country.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(country.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-lg transition-shadow hover:shadow-2xl hover:shadow-coral/10 will-change-transform"
              >
                {/* Media */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted-bg to-border/50">
                  {country.video && hoveredId === country.id && !isError ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="h-full w-full object-cover"
                      poster={country.image}
                      aria-label={`${country.name} travel video`}
                    >
                      <source src={country.video} type="video/mp4" />
                    </video>
                  ) : !isError ? (
                    <Image
                      src={country.image}
                      alt={`Scenic view of ${country.name}`}
                      fill
                      priority={i < 4}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={() => handleImgError(country.id)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageOff className="h-10 w-10 text-muted/50" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white">{country.name}</h3>
                    <p className="text-xs text-white/70">{country.visaType}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted">
                    {country.description}
                  </p>

                  <div className="mb-4 flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5 text-coral" />
                    <span>{country.processingTime}</span>
                  </div>

                  <Link
                    href={`/apply?destination=${encodeURIComponent(country.name)}`}
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-coral/20 transition-all hover:bg-coral-dark hover:shadow-md hover:shadow-coral/30"
                  >
                    <FileCheck className="h-4 w-4" />
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
