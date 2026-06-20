"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageOff, Globe } from "lucide-react";
import { countries } from "@/lib/data";

export function CountriesServed() {
  return (
    <section id="countries-served" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-18"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
            <Globe className="h-3.5 w-3.5" />
            Global Reach
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Countries We Serve
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            Expert visa assistance for {countries.length}+ countries with
            dedicated consultants who know local regulations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {countries.slice(0, 12).map((country, i) => (
            <CountryFlag key={country.id} country={country} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CountryFlag({
  country,
  index,
}: {
  country: (typeof countries)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="group flex flex-col items-center gap-2"
    >
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-border/60 bg-muted-bg shadow-sm transition-all group-hover:border-coral/40 group-hover:shadow-md sm:h-20 sm:w-20">
        {!imgError ? (
          <Image
            src={country.image}
            alt={`Flag of ${country.name}`}
            width={80}
            height={80}
            className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <Globe className="h-6 w-6 text-muted/40" />
        )}
      </div>
      <span className="text-xs font-medium text-muted transition-colors group-hover:text-coral">
        {country.name}
      </span>
    </motion.div>
  );
}
