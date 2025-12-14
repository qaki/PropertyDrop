import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { checkSubscriptionStatus, getSubscriptionMessage } from "~/lib/subscription";
import { SubscriptionCard } from "./_components/subscription-card";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { 
  CreditCard, Clock, CheckCircle2, AlertTriangle, Sparkles,
  HelpCircle, Zap, Shield
} from "lucide-react";

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

  const getStatusConfig = () => {
    if (!subscriptionInfo.isActive) {
      return {
        bg: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200",
        icon: AlertTriangle,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        badge: { bg: "bg-red-100 text-red-700 border-red-200", text: "Expired" },
      };
    } else if (subscriptionInfo.isTrial && subscriptionInfo.daysRemaining <= 7) {
      return {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
        icon: Clock,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        badge: { bg: "bg-amber-100 text-amber-700 border-amber-200", text: "Trial Ending Soon" },
      };
    } else if (subscriptionInfo.isTrial) {
      return {
        bg: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
        icon: Zap,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        badge: { bg: "bg-blue-100 text-blue-700 border-blue-200", text: "Trial Active" },
      };
    } else {
      return {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
        icon: CheckCircle2,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        badge: { bg: "bg-green-100 text-green-700 border-green-200", text: "Active" },
      };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  const faqs = [
    {
      q: "What happens after my trial ends?",
      a: "After your 14-day trial, you'll need to subscribe to the Pro Plan to continue using PropertyDrop. Your data will be saved for 30 days if you decide to upgrade later.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes! You can cancel your subscription anytime. You'll continue to have access until the end of your current billing period.",
    },
    {
      q: "How do I receive payments from clients?",
      a: "Client payments go directly to your Stripe Connect account. We only charge you the monthly subscription fee to use PropertyDrop.",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Subscription</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Manage your PropertyDrop subscription
        </p>
      </div>

      {/* Current Status Banner */}
      <Card className={`mb-10 border-2 ${config.bg} overflow-hidden`}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl ${config.iconBg} flex items-center justify-center shadow-sm`}>
                <StatusIcon className={`h-7 w-7 ${config.iconColor}`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold">
                    {subscriptionInfo.isTrial ? "Free Trial" : 
                     subscriptionInfo.status === "active" ? "Pro Plan" : 
                     "No Active Subscription"}
                  </h2>
                  <Badge className={config.badge.bg}>{config.badge.text}</Badge>
                </div>
                <p className="text-gray-700">{message}</p>
                {subscriptionInfo.trialEndDate && (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Trial ends: {subscriptionInfo.trialEndDate.toLocaleDateString("en-US", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Choose Your Plan
          </Badge>
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground mt-2">Unlimited everything. No hidden fees.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
      </div>

      {/* FAQ Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <HelpCircle className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.q} className="border-2 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
