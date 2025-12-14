"use client";

import Link from "next/link";
import { type SubscriptionInfo } from "~/lib/subscription";
import { XIcon, Clock, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

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

  // Determine banner style based on subscription status
  const getBannerConfig = () => {
    if (!subscriptionInfo.isActive) {
      return {
        bg: "bg-gradient-to-r from-red-600 to-red-500",
        icon: AlertTriangle,
        iconBg: "bg-red-700/50",
      };
    } else if (subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 3) {
      return {
        bg: "bg-gradient-to-r from-orange-500 to-amber-500",
        icon: AlertTriangle,
        iconBg: "bg-orange-600/50",
      };
    } else if (subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 7) {
      return {
        bg: "bg-gradient-to-r from-amber-500 to-yellow-400",
        icon: Clock,
        iconBg: "bg-amber-600/50",
      };
    } else {
      return {
        bg: "bg-gradient-to-r from-primary to-accent",
        icon: Sparkles,
        iconBg: "bg-primary/30",
      };
    }
  };

  const config = getBannerConfig();
  const Icon = config.icon;

  const getMessage = () => {
    if (!subscriptionInfo.isActive) {
      return {
        title: "Your trial has expired",
        desc: "Subscribe now to continue using PropertyDrop.",
      };
    } else if (subscriptionInfo.isTrial) {
      const daysText = subscriptionInfo.daysRemaining === 1 ? "day" : "days";
      return {
        title: `${subscriptionInfo.daysRemaining} ${daysText} left in your free trial`,
        desc: "Upgrade to Pro for unlimited access.",
      };
    }
    return { title: "", desc: "" };
  };

  const message = getMessage();

  return (
    <div className={`${config.bg} text-white relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 pattern-dots" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-3 relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate">{message.title}</p>
              <p className="text-xs sm:text-sm text-white/80 hidden sm:block">{message.desc}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/subscription">
              <Button 
                size="sm" 
                variant="secondary"
                className="font-semibold shadow-lg hover:scale-105 transition-transform text-xs sm:text-sm"
              >
                {subscriptionInfo.isActive ? (
                  <>
                    Upgrade
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 hidden sm:inline-block" />
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </Link>
            
            {subscriptionInfo.isActive && (
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Dismiss banner"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
