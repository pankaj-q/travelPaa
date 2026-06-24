"use client";

import { motion } from "framer-motion";
import { Award, Globe2, Headphones, FileCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Award,
    title: "15+ Years of Experience",
    description:
      "Our experienced team provides personalized guidance and professional help to simplify your journey and ensure proper review of all documentation before submission.",
  },
  {
    icon: Globe2,
    title: "Over 100+ Countries",
    description:
      "We assist travelers across the world and offer visa assistance for over 100+ countries with latest, updated information on document requirements and visa options.",
  },
  {
    icon: Headphones,
    title: "24/7 Email & Chat Support",
    description:
      "Our support team is available around the clock via email and chat to answer queries, provide updates, and assist with documentation anytime you need help.",
  },
  {
    icon: FileCheck,
    title: "Document Assistance",
    description:
      "We provide comprehensive document preparation assistance and conduct thorough review of each application before submission to ensure accuracy and completeness.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Experience Unmatched Visa Services with travelPaa"
          subtitle="We combine expertise, global reach, and dedicated support to make your visa journey smooth and successful."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-md transition-all hover:border-coral/20 hover:shadow-xl hover:shadow-coral/10"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-coral/10 transition-all duration-300 group-hover:bg-coral group-hover:shadow-lg group-hover:shadow-coral/30">
                  <Icon className="h-7 w-7 text-coral transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mt-5 text-base font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
