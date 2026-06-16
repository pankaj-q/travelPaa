"use client";

import Link from "next/link";
import { Globe2, Share2, MessageCircle, Rss, Link2, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Tourist Visa", href: "#visa-types" },
    { label: "Business Visa", href: "#visa-types" },
    { label: "Student Visa", href: "#visa-types" },
    { label: "Work Visa", href: "#visa-types" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Countries", href: "#countries" },
    { label: "Apply Now", href: "/apply" },
  ],
};

const socials = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Rss, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Link2, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral">
                <Globe2 className="h-5 w-5 text-white" />
              </div>
              <div>
              <span className="text-lg font-bold text-[#60A5FA]">travel</span><span className="text-lg font-bold text-red-500">Paa</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
            Travelpaa Private Limited
            Travelpaa Private Limited (TravelPaa) started in 1981 and is a tour and travel company with various international and domestic packages aimed to simplify the entire traveling experience making it more streamlined
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-coral"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-coral"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
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

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                ADDRESS: 13, 3rd Floor, Vaishali Enclave, Pitampura, Delhi, 110034
              </li>
              <li>
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-coral"
                >
                  <Phone className="h-4 w-4 text-coral" />
                  +91-98999-21559
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@globalvisaconsult.com"
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
            &copy; {new Date().getFullYear()} travelPaa. @All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <a href="#" className="transition-colors hover:text-coral">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-coral">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
