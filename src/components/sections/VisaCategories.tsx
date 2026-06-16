"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  ArrowRightLeft,
  type LucideIcon,
} from "lucide-react";
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
    <section id="visa-types" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Visa Types"
          title="Visa Categories We Handle"
          subtitle="Whatever your purpose of travel, we have specialized expertise to guide you through the right visa pathway."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visaCategories.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Plane;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-md transition-all hover:border-coral/30 hover:shadow-xl hover:shadow-coral/10"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-coral/10 to-transparent transition-transform group-hover:scale-125" />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-coral-dark shadow-lg shadow-coral/25">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-coral/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-coral">
                      {category.duration}
                    </span>
                  </div>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>

                <div className="relative mt-4 flex items-center gap-1 text-sm font-semibold text-coral opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <ArrowRightLeft className="h-3.5 w-3.5 rotate-[-90deg]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
