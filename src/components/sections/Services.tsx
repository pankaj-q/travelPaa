"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Send,
  Users,
  Zap,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  FileText,
  Send,
  Users,
  Zap,
  Headphones,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Our Services"
          title="Comprehensive Visa Solutions"
          subtitle="From initial consultation to visa approval, we handle every step of your journey with precision and care."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? MessageCircle;
            return (
              <motion.div
                key={service.id}
                variants={item}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-md transition-shadow hover:shadow-xl hover:shadow-coral/10"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-coral/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10 transition-colors group-hover:bg-coral group-hover:shadow-lg group-hover:shadow-coral/30">
                    <Icon className="h-6 w-6 text-coral transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
