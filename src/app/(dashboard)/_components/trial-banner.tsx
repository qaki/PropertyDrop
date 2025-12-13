"use client";

import Link from "next/link";
import { type SubscriptionInfo } from "~/lib/subscription";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface TrialBannerProps {
  subscriptionInfo: SubscriptionInfo;
}

export function TrialBanner({ subscriptionInfo }: TrialBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Don't show banner if subscription is active and not in trial
  if (subscriptionInfo.status === "active" && !subscriptionInfo.isTrial) {
    return null;
  }

  // Don't show if user dismissed it
  if (!isVisible) {
    return null;
  }

  // Determine banner color based on subscription status
  const getBannerStyle = () => {
    if (!subscriptionInfo.isActive) {
      // Expired - Red/Error
      return "bg-red-600 text-white";
    } else if (subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 3) {
      // Trial ending soon - Orange/Warning
      return "bg-orange-600 text-white";
    } else if (subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 7) {
      // Trial active but less than week - Yellow
      return "bg-yellow-500 text-black";
    } else {
      // Trial active with plenty of time - Blue/Info
      return "bg-blue-600 text-white";
    }
  };

  const getMessage = () => {
    if (!subscriptionInfo.isActive) {
      return (
        <>
          <span className="font-semibold">Your trial has expired.</span> Subscribe now to
          continue using PropertyDrop.
        </>
      );
    } else if (subscriptionInfo.isTrial) {
      const daysText = subscriptionInfo.daysRemaining === 1 ? "day" : "days";
      return (
        <>
          <span className="font-semibold">
            {subscriptionInfo.daysRemaining} {daysText} left in your free trial.
          </span>{" "}
          Upgrade to Pro to continue after your trial ends.
        </>
      );
    }
    return null;
  };

  return (
    <div className={`${getBannerStyle()} px-4 py-3 relative`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm md:text-base flex-1">{getMessage()}</p>
        
        <div className="flex items-center gap-3">
          <Link
            href="/subscription"
            className="inline-flex items-center rounded-md bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap"
          >
            {subscriptionInfo.isActive ? "Upgrade Now" : "Subscribe Now"}
          </Link>
          
          {subscriptionInfo.isActive && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <XIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

