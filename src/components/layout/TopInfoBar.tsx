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
            +1 (800) 123-4567
          </a>
          <a
            href="mailto:info@globalvisaconsult.com"
            className="flex items-center gap-1.5 transition-colors hover:text-coral"
          >
            <Mail className="h-3.5 w-3.5" />
            info@globalvisaconsult.com
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-coral" />
          <span>123 Visa Avenue, New York, NY 10001</span>
        </div>
      </div>
    </div>
  );
}
