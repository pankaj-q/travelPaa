"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";

interface OrderSummaryProps {
  visaType: string;
  destination: string;
  amount: number;
  loading?: boolean;
}

export function OrderSummary({
  visaType,
  destination,
  amount,
  loading,
}: OrderSummaryProps) {
  const formatAmount = (cents: number) =>
    `$${(cents / 100).toFixed(2)}`;

  const items = [
    { label: "Visa Processing Fee", value: formatAmount(amount) },
    { label: "Consultation & Support", value: "$0.00" },
    { label: "Document Review", value: "$0.00" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm"
    >
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
        Order Summary
      </h3>

      <div className="mb-4 rounded-lg bg-muted-bg/70 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/80">Visa Type</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{visaType}</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted/80">Destination</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">
          {destination || "—"}
        </p>
      </div>

      <div className="space-y-2 border-b border-border/60 pb-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted">{item.label}</span>
            <span className="font-medium text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3">
        <span className="text-sm font-bold text-foreground">Total</span>
        <span className="text-lg font-bold text-coral">
          {loading ? (
            <span className="inline-block h-5 w-16 animate-pulse rounded bg-muted-bg" />
          ) : (
            formatAmount(amount)
          )}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <Lock className="h-3.5 w-3.5" />
        <span>Secured by Stripe — your card never touches our server.</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
        <span>256-bit encrypted SSL connection</span>
      </div>
    </motion.div>
  );
}
