"use client";

import Link from "next/link";
import { Globe2, Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Track Application", href: "/track" },
  { label: "Contact", href: "/contact" },
];

const popularVisas = [
  { label: "USA Visa", href: "/destinations/united-states" },
  { label: "UK Visa", href: "/destinations/united-kingdom" },
  { label: "Canada Visa", href: "/destinations/canada" },
  { label: "Schengen Visa", href: "/destinations/schengen" },
  { label: "Singapore Visa", href: "/destinations/singapore" },
  { label: "Japan Visa", href: "/destinations/japan" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral">
                <Globe2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#60A5FA]">travel</span>
                <span className="text-lg font-bold text-coral-light">Paa</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Your trusted global visa partner. Fast, reliable visa assistance for 100+ countries with expert guidance every step of the way.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all hover:bg-coral hover:text-white hover:shadow-lg hover:shadow-coral/25"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Popular Visas</h4>
            <ul className="space-y-2.5">
              {popularVisas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                13, 3rd Floor, Vaishali Enclave, Pitampura, Delhi, 110034
              </li>
              <li>
                <a
                  href="tel:+919899921559"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-coral"
                >
                  <Phone className="h-4 w-4 text-coral" />
                  +91-98999-21559
                </a>
              </li>
              <li>
                <a
                  href="mailto:holidays@travelpaa.com"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-coral"
                >
                  <Mail className="h-4 w-4 text-coral" />
                  holidays@travelpaa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} travelPaa. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/privacy" className="transition-colors hover:text-coral">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-coral">Terms of Service</Link>
            <Link href="/refund" className="transition-colors hover:text-coral">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
