"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3762945/3762945-uhd_2560_1440_25fps.mp4";

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark">
        {!videoError && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
            aria-label="Global travel destinations video background"
            onError={() => setVideoError(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/70 will-change-transform" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        {/* Content */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral backdrop-blur-sm"
          >
            <Play className="h-3 w-3 fill-coral" />
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
        </motion.div>

        {/* World Map Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-coral/20 to-transparent blur-3xl" />
            <svg
              viewBox="0 0 800 400"
              className="relative w-full drop-shadow-2xl"
              aria-label="World map illustration"
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF8787" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Simplified world map dots */}
              {[
                [120, 150], [180, 120], [250, 100], [320, 110], [400, 90],
                [480, 100], [550, 130], [620, 120], [680, 140],
                [100, 200], [160, 220], [220, 190], [300, 210], [380, 200],
                [460, 220], [540, 200], [600, 230], [660, 210],
                [130, 280], [200, 300], [280, 270], [360, 290], [440, 280],
                [520, 300], [580, 270], [650, 290],
                [350, 160], [420, 170], [500, 160],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="url(#mapGrad)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
              {/* Connection lines */}
              {[
                [120, 150, 400, 90], [250, 100, 550, 130], [300, 210, 620, 120],
                [200, 300, 520, 300], [350, 160, 660, 210],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FF6B6B"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, strokeOpacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
              {/* Globe outline */}
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

            {/* Floating stats cards */}
            <motion.div
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-4 top-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md will-change-transform"
            >
              <p className="text-2xl font-bold text-coral">98%</p>
              <p className="text-xs text-white/70">Success Rate</p>
            </motion.div>
            <motion.div
              animate={reduced ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-4 bottom-12 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md will-change-transform"
            >
              <p className="text-2xl font-bold text-coral">120+</p>
              <p className="text-xs text-white/70">Countries</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-coral" />
        </div>
      </motion.div>
    </section>
  );
}
