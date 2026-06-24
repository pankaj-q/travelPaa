"use client";

import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <section className="border-y border-white/10 bg-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-4 text-center lg:px-8">
        <ShieldAlert className="h-5 w-5 shrink-0 text-coral" />
        <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
          Visa approval is subject to the decision of the respective embassy or
          consulate. travelPaa provides application assistance and document
          review services but does not guarantee visa approval.
        </p>
      </div>
    </section>
  );
}
