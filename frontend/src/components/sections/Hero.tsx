"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Globe2 } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/70" />
        <div className="hero-pattern absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral backdrop-blur-sm"
          >
            <Shield className="h-3 w-3" />
            Trusted Visa Experts Since 2010
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your Trusted{" "}
            <span className="bg-gradient-to-r from-coral to-coral-light bg-clip-text text-transparent">
              Global Visa
            </span>{" "}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Fast, Reliable Visa Assistance for 100+ Countries. Our expert consultants guide you through every step of your visa journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2 rounded-xl bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-coral/40 transition-all hover:bg-coral-dark hover:shadow-2xl hover:shadow-coral/50"
            >
              Apply for Visa
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Explore Destinations
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70"
          >
            {[
              { icon: Award, text: "98% Success Rate" },
              { icon: Globe2, text: "120+ Countries" },
              { icon: Users, text: "50,000+ Happy Clients" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 text-coral" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
