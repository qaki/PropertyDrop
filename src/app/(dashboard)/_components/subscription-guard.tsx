import Link from "next/link";
import { type SubscriptionInfo } from "~/lib/subscription";
import { CreditCard, Lock } from "lucide-react";

interface SubscriptionGuardProps {
  subscriptionInfo: SubscriptionInfo;
  children: React.ReactNode;
}

export function SubscriptionGuard({ subscriptionInfo, children }: SubscriptionGuardProps) {
  // If subscription is active (trial or paid), show the content
  if (subscriptionInfo.isActive) {
    return <>{children}</>;
  }

  // Otherwise, show upgrade prompt
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <Lock className="h-16 w-16 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          Subscription Required
        </h1>
        
        <p className="text-xl text-gray-600 mb-2">
          Your free trial has ended.
        </p>
        
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to PropertyDrop Pro to continue uploading photos, creating jobs, 
          and delivering your work to clients.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-2">What you get with Pro:</h3>
          <ul className="text-left space-y-2 max-w-md mx-auto">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unlimited photo uploads and jobs</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Automatic MLS-compliant resizing</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Secure payment gate - guaranteed payments</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Client delivery portals</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Direct Stripe Connect payouts</span>
            </li>
          </ul>
        </div>

        <Link
          href="/subscription"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          <CreditCard className="h-5 w-5" />
          View Subscription Plans
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          Only $49.99/month • Cancel anytime • Your data is saved
        </p>
      </div>
    </div>
  );
}

