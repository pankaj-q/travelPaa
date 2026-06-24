"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Search, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: FileText,
    title: "Apply",
    description: "Fill out our simple online application form with your travel details and document requirements.",
  },
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Upload the required documents securely. Our team reviews them for completeness and accuracy.",
  },
  {
    icon: Search,
    title: "Review & Submit",
    description: "Our experts review your application, suggest improvements, and submit it to the authorities.",
  },
  {
    icon: CheckCircle2,
    title: "Receive Visa",
    description: "Get your visa delivered digitally. We track the status and notify you at every step.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="Simple 4-Step Process"
          subtitle="Getting your visa has never been easier. Follow these simple steps and let our experts handle the rest."
        />

        <div className="relative mt-14">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-coral/20 via-coral/40 to-coral/20 md:block" />

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-coral shadow-lg shadow-coral/30">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="absolute -top-1 -right-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white dark:bg-white dark:text-navy">
                    {i + 1}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
