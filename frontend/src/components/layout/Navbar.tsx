"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Globe2,
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
  const [activeSection, setActiveSection] = useState("#home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const ids = ["home", "services", "about", "visa-types", "countries", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20"
          : "bg-surface/70 backdrop-blur-md"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral shadow-md shadow-coral/25 transition-transform duration-300 group-hover:scale-105">
            <Globe2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-[#60A5FA] sm:text-lg">travel</span>
            <span className="text-base font-bold text-coral-light sm:text-lg">Paa</span>
          </div>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-coral"
                    : "text-foreground/70 hover:bg-coral/[0.06] hover:text-coral"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-coral"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface transition-all hover:border-coral/40 hover:bg-coral/10"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-coral" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-navy" />
              )}
            </button>
          )}

          <Link
            href="/apply"
            className="hidden rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40 sm:inline-flex"
          >
            Apply Now
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60 lg:hidden will-change-transform"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-coral/10 text-coral"
                        : "text-foreground/70 hover:bg-coral/[0.06] hover:text-coral"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 ${isActive ? "text-coral" : "text-muted"} -rotate-90`} />
                  </motion.a>
                );
              })}
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block rounded-lg bg-coral px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark"
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
