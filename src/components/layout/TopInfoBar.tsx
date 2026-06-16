"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export function TopInfoBar() {
  return (
    <div className="hidden border-b border-border/60 bg-navy text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs lg:px-8 lg:text-sm">
        <div className="flex items-center gap-6">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-1.5 transition-colors hover:text-coral"
          >
            <Phone className="h-3.5 w-3.5" />
            +91-98999-21559
          </a>
          <a
            href="mailto:info@globalvisaconsult.com"
            className="flex items-center gap-1.5 transition-colors hover:text-coral"
          >
            <Mail className="h-3.5 w-3.5" />
            holidays@travelpaa.com
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-coral" />
          <span>13, 3rd Floor, Vaishali Enclave, Pitampura, Delhi, 110034</span>
        </div>
      </div>
    </div>
  );
}
