"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

interface SubscriptionCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isCurrentPlan: boolean;
  isPro?: boolean;
  buttonText: string;
  buttonDisabled: boolean;
  checkoutPlanId?: string;
}

export function SubscriptionCard({
  title,
  price,
  period,
  features,
  isCurrentPlan,
  isPro = false,
  buttonText,
  buttonDisabled,
  checkoutPlanId,
}: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!checkoutPlanId || buttonDisabled) return;

    setIsLoading(true);
    
    // Redirect to Whop checkout
    const checkoutUrl = `https://whop.com/checkout/${checkoutPlanId}`;
    window.location.href = checkoutUrl;
  };

  return (
    <div
      className={`rounded-lg border-2 p-6 ${
        isPro
          ? "border-indigo-600 bg-indigo-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          <span className="ml-2 text-gray-600">/{period}</span>
        </div>
      </div>

      <ul className="mb-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleUpgrade}
        disabled={buttonDisabled || isLoading}
        className={`w-full rounded-lg px-4 py-3 font-semibold transition-colors ${
          buttonDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : isPro
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-600 text-white hover:bg-gray-700"
        }`}
      >
        {isLoading ? "Redirecting..." : buttonText}
      </button>

      {isCurrentPlan && (
        <p className="mt-2 text-center text-sm text-gray-600">
          This is your current plan
        </p>
      )}
    </div>
  );
}

