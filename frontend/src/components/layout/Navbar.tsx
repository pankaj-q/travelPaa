"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Globe2,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import { countries } from "@/lib/data";

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/track", label: "Track Application" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const isClient = useIsClient();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destDropdown, setDestDropdown] = useState(false);
  const [destDropdownMobile, setDestDropdownMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDestDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

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
            if (link.label === "Destinations") {
              return (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDestDropdown(!destDropdown)}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-coral/[0.06] hover:text-coral"
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${destDropdown ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {destDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-1 grid max-h-[70vh] w-[600px] grid-cols-3 gap-1 overflow-y-auto rounded-2xl border border-border/60 bg-surface p-3 shadow-xl"
                      >
                        {countries.map((c) => (
                          <Link
                            key={c.id}
                            href={`/destinations/${c.slug}`}
                            onClick={() => setDestDropdown(false)}
                            className="rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-coral/5 hover:text-coral"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-coral/[0.06] hover:text-coral"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {isClient && (
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

          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex items-center gap-2 rounded-lg bg-coral/10 px-3 py-2">
                <User className="h-4 w-4 text-coral" />
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-all hover:border-coral/40 hover:text-coral"
              >
                <LogOut className="h-3.5 w-3.5" />
                {loggingOut ? "..." : "Logout"}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/auth/login"
                className="rounded-lg border border-border/80 bg-surface px-5 py-2.5 text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/40"
              >
                Sign Up
              </Link>
            </div>
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
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-full z-50 w-72 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-xl lg:hidden"
          >
            <div className="space-y-0.5 px-3 py-3">
              {navLinks.map((link) => {
                if (link.label === "Destinations") {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setDestDropdownMobile(!destDropdownMobile)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-coral/[0.06] hover:text-coral"
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${destDropdownMobile ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {destDropdownMobile && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 space-y-1 pb-2 pt-1">
                              {countries.map((c) => (
                                <Link
                                  key={c.id}
                                  href={`/destinations/${c.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-lg px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-coral/5 hover:text-coral"
                                >
                                  {c.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-coral/[0.06] hover:text-coral"
                  >
                    {link.label}
                  </Link>
                );
              })}

              {user ? (
                <div className="mt-2 space-y-1.5 border-t border-border/40 pt-2">
                  <div className="flex items-center gap-2 rounded-lg bg-coral/10 px-3 py-2.5">
                    <User className="h-4 w-4 text-coral" />
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted transition-all hover:border-coral/40 hover:text-coral"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg border border-border/80 bg-surface px-3 py-2.5 text-center text-sm font-semibold text-foreground/70 transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg bg-coral px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-coral/30 transition-all hover:bg-coral-dark"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-coral px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-coral/30 transition-all hover:bg-coral-dark"
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
