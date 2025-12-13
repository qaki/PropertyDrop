import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { checkSubscriptionStatus, getSubscriptionMessage } from "~/lib/subscription";
import { SubscriptionCard } from "./_components/subscription-card";

export default async function SubscriptionPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const subscriptionInfo = checkSubscriptionStatus(user);
  const message = getSubscriptionMessage(subscriptionInfo);

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="mt-2 text-gray-600">
          Manage your PropertyDrop subscription
        </p>
      </div>

      {/* Current Status Banner */}
      <div
        className={`mb-8 rounded-lg p-6 ${
          subscriptionInfo.isActive
            ? subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 7
              ? "bg-yellow-50 border border-yellow-200"
              : "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {subscriptionInfo.isTrial ? "Free Trial" : 
               subscriptionInfo.status === "active" ? "Pro Plan" : 
               "No Active Subscription"}
            </h2>
            <p className="text-gray-700">{message}</p>
            {subscriptionInfo.trialEndDate && (
              <p className="mt-2 text-sm text-gray-600">
                Trial ends on: {subscriptionInfo.trialEndDate.toLocaleDateString()}
              </p>
            )}
          </div>
          
          {!subscriptionInfo.isActive && (
            <div className="ml-4">
              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                Expired
              </span>
            </div>
          )}
          
          {subscriptionInfo.isTrial && (
            <div className="ml-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Trial Active
              </span>
            </div>
          )}
          
          {subscriptionInfo.status === "active" && (
            <div className="ml-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Free Trial Card */}
        <SubscriptionCard
          title="Free Trial"
          price="$0"
          period="14 days"
          features={[
            "Unlimited photo uploads",
            "MLS auto-resizing",
            "Secure payment gate",
            "Client delivery portals",
            "14-day trial period",
          ]}
          isCurrentPlan={subscriptionInfo.isTrial}
          buttonText="Current Plan"
          buttonDisabled={true}
        />

        {/* Pro Plan Card */}
        <SubscriptionCard
          title="Pro Plan"
          price="$69.99"
          period="per month"
          features={[
            "Everything in Free Trial",
            "Unlimited photo uploads",
            "Priority email support",
            "Advanced analytics",
            "No watermarks",
            "Custom branding",
          ]}
          isCurrentPlan={subscriptionInfo.status === "active"}
          isPro={true}
          buttonText={
            subscriptionInfo.status === "active" 
              ? "Current Plan" 
              : subscriptionInfo.isTrial 
              ? "Upgrade Now" 
              : "Subscribe Now"
          }
          buttonDisabled={subscriptionInfo.status === "active"}
          checkoutPlanId={process.env.NEXT_PUBLIC_WHOP_PLAN_ID || ""}
        />
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">What happens after my trial ends?</h3>
            <p className="text-gray-600">
              After your 14-day trial, you'll need to subscribe to the Pro Plan to continue
              using PropertyDrop. Your data will be saved for 30 days if you decide to upgrade later.
            </p>
          </div>
          
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">
              Yes! You can cancel your subscription anytime. You'll continue to have access
              until the end of your current billing period.
            </p>
          </div>
          
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">How do I receive payments from clients?</h3>
            <p className="text-gray-600">
              Client payments go directly to your Stripe Connect account. We only charge you
              the monthly subscription fee to use PropertyDrop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

