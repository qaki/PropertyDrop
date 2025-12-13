"use client";

import { useState } from "react";
import { Shield, Loader2, AlertCircle } from "lucide-react";
import { createStripeCheckout } from "~/app/actions/stripe";

export function PaymentButton({ hash }: { hash: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePayment() {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await createStripeCheckout(hash);
      
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || "Failed to create payment session");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-4 space-y-4">
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full max-w-md mx-auto bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Shield className="h-5 w-5" />
            Pay Now & Download Photos
          </>
        )}
      </button>

      {error && (
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900 mb-1">Payment Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 max-w-md mx-auto text-center">
        🔒 Secure payment powered by Stripe • Industry-standard encryption
      </p>
    </div>
  );
}

