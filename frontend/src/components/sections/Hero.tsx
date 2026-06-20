"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral backdrop-blur-sm"
          >
            <Star className="h-3 w-3 fill-coral" />
            Trusted Visa Experts Since 2010
          </motion.span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-coral to-coral-light bg-clip-text text-transparent">
              Global Travel
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Navigate visa applications with confidence. Our expert consultants
            deliver 98% approval rates across 120+ countries worldwide.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Free eligibility assessment",
              "End-to-end document support",
              "Fast-track processing available",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2.5 text-sm text-white/90 sm:text-base"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-coral" />
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2 rounded-xl bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-coral/40 transition-all hover:bg-coral-dark hover:shadow-2xl hover:shadow-coral/50"
            >
              Start Your Application
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#countries"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Explore Destinations
            </a>
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-coral/20 to-transparent blur-3xl" />
            <svg
              viewBox="0 0 800 400"
              className="relative w-full drop-shadow-2xl"
              aria-label="World map illustration"
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff8787" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {[
                [120, 150], [180, 120], [250, 100], [320, 110], [400, 90],
                [480, 100], [550, 130], [620, 120], [680, 140],
                [100, 200], [160, 220], [220, 190], [300, 210], [380, 200],
                [460, 220], [540, 200], [600, 230], [660, 210],
                [130, 280], [200, 300], [280, 270], [360, 290], [440, 280],
                [520, 300], [580, 270], [650, 290],
                [350, 160], [420, 170], [500, 160],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="url(#mapGrad)"
                  opacity="0.7"
                />
              ))}
              <ellipse
                cx="400"
                cy="200"
                rx="360"
                ry="180"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
              />
              <ellipse
                cx="400"
                cy="200"
                rx="360"
                ry="90"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="200"
                x2="760"
                y2="200"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            </svg>

            <div className="absolute -left-4 top-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold text-coral">98%</p>
              <p className="text-xs text-white/70">Success Rate</p>
            </div>
            <div className="absolute -right-4 bottom-12 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold text-coral">120+</p>
              <p className="text-xs text-white/70">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
