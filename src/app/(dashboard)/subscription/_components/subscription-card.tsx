"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight, Loader2, Crown } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

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
    
    // Redirect to Whop checkout with success redirect
    const successUrl = `${window.location.origin}/welcome`;
    const checkoutUrl = `https://whop.com/checkout/${checkoutPlanId}?success_url=${encodeURIComponent(successUrl)}`;
    window.location.href = checkoutUrl;
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        isPro
          ? "border-2 border-primary shadow-xl"
          : "border-2 hover:border-primary/30"
      } ${isCurrentPlan ? "ring-2 ring-green-500 ring-offset-2" : ""}`}
    >
      {/* Popular badge */}
      {isPro && (
        <div className="absolute top-0 left-0 right-0 h-1.5 gradient-primary" />
      )}
      
      <CardHeader className="text-center pb-4 pt-8">
        {isPro && (
          <Badge className="w-fit mx-auto mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 font-semibold">
            <Crown className="h-3.5 w-3.5 mr-1.5" />
            RECOMMENDED
          </Badge>
        )}
        
        <h3 className="text-2xl font-bold">{title}</h3>
        
        <div className="mt-4 flex items-baseline justify-center">
          <span className={`text-5xl font-extrabold tracking-tight ${isPro ? "text-gradient" : ""}`}>
            {price}
          </span>
          <span className="ml-2 text-muted-foreground font-medium">/{period}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <ul className="mb-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isPro ? "text-primary" : "text-green-500"}`} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleUpgrade}
          disabled={buttonDisabled || isLoading}
          className={`w-full h-12 text-base font-semibold transition-all ${
            isPro && !buttonDisabled
              ? "shadow-lg glow-primary hover:scale-105"
              : ""
          }`}
          variant={buttonDisabled ? "secondary" : isPro ? "default" : "outline"}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirecting...
            </>
          ) : buttonDisabled ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              {buttonText}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        {isCurrentPlan && (
          <p className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            This is your current plan
          </p>
        )}
      </CardContent>
    </Card>
  );
}
