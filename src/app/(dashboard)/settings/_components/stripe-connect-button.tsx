"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface StripeStatus {
  connected: boolean;
  status: "not_connected" | "pending" | "complete";
  accountId?: string;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
}

export function StripeConnectButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [status, setStatus] = useState<StripeStatus>({
    connected: false,
    status: "not_connected",
  });

  // Check Stripe connection status on mount
  useEffect(() => {
    checkStripeStatus();
  }, []);

  // Handle OAuth return
  useEffect(() => {
    const stripeStatus = searchParams.get("stripe");
    
    if (stripeStatus === "success") {
      toast.success("Stripe account connected successfully! 🎉");
      checkStripeStatus();
      // Remove query param
      router.replace("/settings");
    }
    
    if (stripeStatus === "refresh") {
      toast.error("Connection failed. Please try again.");
      // Remove query param
      router.replace("/settings");
    }
  }, [searchParams, router]);

  async function checkStripeStatus() {
    try {
      setChecking(true);
      const response = await fetch("/api/stripe/connect");
      const data = (await response.json()) as StripeStatus;
      setStatus(data);
    } catch (error) {
      console.error("Failed to check Stripe status:", error);
    } finally {
      setChecking(false);
    }
  }

  async function handleConnect() {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/connect", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe OAuth
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to connect Stripe");
        setLoading(false);
      }
    } catch (error) {
      console.error("Stripe connect error:", error);
      toast.error("Failed to connect Stripe. Please try again.");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Checking connection...</span>
      </div>
    );
  }

  if (status.connected && status.status === "complete") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-green-900 dark:text-green-100">
              Payment Processing Active
            </p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-0.5">
              You can now receive payments from clients
            </p>
            {status.accountId && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono truncate">
                ID: {status.accountId}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleConnect}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Manage Stripe Account
            </>
          )}
        </Button>
      </div>
    );
  }

  if (status.connected && status.status === "pending") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-yellow-900 dark:text-yellow-100">
              Setup Incomplete
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-0.5">
              Please complete your Stripe account setup to receive payments
            </p>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={loading}
          size="sm"
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              Complete Setup
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-2">
          💳 Enable Client Payments
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Connect your Stripe account to receive payments directly from clients when they unlock photos.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            Money goes directly to your bank account
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            Secure payment processing by Stripe
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            Photos unlock automatically on payment
          </li>
        </ul>
      </div>

      <Button
        onClick={handleConnect}
        disabled={loading}
        size="lg"
        className="w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            Connect Stripe Account
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        By connecting, you'll be redirected to Stripe to complete account setup. It takes about 5 minutes.
      </p>
    </div>
  );
}

