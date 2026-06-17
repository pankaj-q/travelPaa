"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 md:mb-18 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-coral/20 bg-coral/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
