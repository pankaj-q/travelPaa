"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  ArrowRightLeft,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { visaCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  ArrowRightLeft,
};

export function VisaCategories() {
  return (
    <section id="visa-categories" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Visa Types"
          title="Choose Your Visa Category"
          subtitle="We offer expert guidance for all major visa categories — from tourist to business visas."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visaCategories.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Plane;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-md transition-all duration-300 hover:border-coral/30 hover:shadow-2xl hover:shadow-coral/30 will-change-transform"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-coral/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10 transition-all duration-300 group-hover:bg-coral group-hover:shadow-lg group-hover:shadow-coral/30">
                  <Icon className="h-6 w-6 text-coral transition-colors duration-300 group-hover:text-white" />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {category.duration}
                    </p>
                  </div>
                  {category.price && (
                    <div className="shrink-0 rounded-lg bg-coral/10 px-3 py-1.5 text-right">
                      <p className="text-sm font-bold text-coral">
                        ₹{category.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-muted">starting from</p>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-coral" />
                    {category.duration}
                  </span>
                </div>

                <Link
                  href={`/apply?visaType=${encodeURIComponent(category.title)}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-coral transition-colors hover:text-coral-light"
                >
                  Apply Now
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
