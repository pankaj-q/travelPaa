"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#visa-types", label: "Visa Types" },
  { href: "#countries", label: "Countries" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/20"
          : "bg-surface/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral shadow-md shadow-coral/30 transition-transform group-hover:scale-105">
            <Globe2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="block text-lg font-bold leading-tight text-foreground font-color-coral-light">
            jsdbiz
            </span>
            <span className="block text-extra-small font-light font-size-sm text-[#FF6F61] leading-tight text-foreground">
            Visa Consultancy
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-coral/10 hover:text-coral"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface transition-all hover:border-coral/40 hover:bg-coral/10"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-coral" />
              ) : (
                <Moon className="h-4 w-4 text-navy" />
              )}
            </button>
          )}

          <Link
            href="/apply"
            className="hidden rounded-xl bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40 sm:inline-flex"
          >
            Apply Now
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-coral/10 hover:text-coral"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted" />
                </motion.a>
              ))}
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-xl bg-coral px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
