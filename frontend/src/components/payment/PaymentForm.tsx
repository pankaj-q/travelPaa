"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}

export function PaymentForm({
  amount,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? "Validation failed");
      setIsProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/apply?payment_success=true`,
        },
        redirect: "if_required",
      });

    if (confirmError) {
      setErrorMessage(confirmError.message ?? "Payment failed");
      onError(confirmError.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        // Call onSuccess with paymentIntentId for backend confirmation
        onSuccess(paymentIntent.id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Confirmation failed";
        setErrorMessage(msg);
        onError(msg);
      }
    } else if (paymentIntent?.status === "requires_action") {
      // 3D Secure or additional authentication needed
      const msg = "Additional authentication required";
      setErrorMessage(msg);
      onError(msg);
    } else {
      // Handle other statuses: processing, requires_payment_method, canceled, etc.
      const msg = `Payment ${paymentIntent?.status ?? "failed"}`;
      setErrorMessage(msg);
      onError(msg);
    }

    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4 rounded-2xl border border-border/60 bg-surface p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10">
              <CreditCard className="h-4 w-4 text-coral" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Card Details
            </h3>
          </div>

          <PaymentElement
            options={{
              layout: "tabs",
              defaultValues: { billingDetails: { name: "" } },
            }}
          />
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs text-red-700 dark:text-red-400">
              {errorMessage}
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/35 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Pay ${(amount / 100).toFixed(2)} & Submit
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-muted">
          Secure payment processed by Stripe
        </p>
      </form>
    </motion.div>
  );
}
