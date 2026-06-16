"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Shield, TrendingUp } from "lucide-react";
import { stats } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="bg-muted-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Professional visa consultants team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-surface p-5 shadow-xl sm:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    ISO Certified
                  </p>
                  <p className="text-xs text-muted">Quality Assured</p>
                </div>
              </div>
            </motion.div>

            {/* Pattern decoration */}
            <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl bg-coral/10" />
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              badge="About Us"
              title="Your Trusted Partner in Global Mobility"
              subtitle="With over 15 years of experience, GlobalVisa Consultancy has helped thousands of travelers achieve their dreams of international travel."
              centered={false}
            />

            <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                We combine deep expertise in immigration law with personalized
                service to deliver exceptional results. Our team of certified
                consultants stays updated with the latest visa regulations across
                all major destinations.
              </p>
              <p>
                Whether you&apos;re planning a vacation, pursuing education, or
                expanding your business globally, we provide tailored solutions
                that maximize your approval chances while minimizing stress.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border/60 bg-surface p-4 text-center shadow-sm"
                >
                  <p className="text-xl font-bold text-coral sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: TrendingUp, text: "98% Success Rate" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
                >
                  <Icon className="h-4 w-4 text-coral" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
