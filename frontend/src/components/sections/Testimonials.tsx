"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="bg-muted-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from travelers who have successfully obtained their visas through our expert assistance."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-surface p-8 shadow-md sm:p-12"
          >
            <Quote className="h-10 w-10 text-coral/20" />

            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            <div className="mt-6 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonials[current].rating
                      ? "fill-coral text-coral"
                      : "text-border"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/10 text-sm font-bold text-coral">
                {testimonials[current].name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-xs text-muted">
                  {testimonials[current].location}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-coral/40 hover:bg-coral/5"
            >
              <ChevronLeft className="h-4 w-4 text-muted" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-coral"
                      : "w-2 bg-border hover:bg-coral/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-coral/40 hover:bg-coral/5"
            >
              <ChevronRight className="h-4 w-4 text-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
