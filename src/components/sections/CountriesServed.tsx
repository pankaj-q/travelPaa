"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  "Embassy partnerships in 40+ countries",
  "Multilingual support team available",
  "Real-time application tracking portal",
  "Dedicated case manager for every client",
  "Post-approval travel advisory included",
];

export function CountriesServed() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              badge="Global Reach"
              title="Serving Travelers Worldwide"
              subtitle="From bustling metropolises to remote regions, our network spans the globe to bring visa services closer to you."
              centered={false}
            />

            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <span className="text-sm text-muted sm:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-4 rounded-2xl border border-border/60 bg-surface p-5 shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10">
                <Globe2 className="h-7 w-7 text-coral" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">120+</p>
                <p className="text-sm text-muted">Countries & Territories Covered</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md overflow-hidden rounded-3xl shadow-2xl lg:ml-auto">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                alt="Happy traveler with luggage at airport"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
              >
                <p className="text-sm font-medium text-white">
                  &ldquo;GlobalVisa made my dream trip to Europe a reality. Smooth,
                  professional, and incredibly fast!&rdquo;
                </p>
                <p className="mt-2 text-xs text-white/70">
                  — Sarah M., Business Traveler
                </p>
              </motion.div>
            </div>

            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full max-w-md rounded-3xl bg-coral/15 lg:ml-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
