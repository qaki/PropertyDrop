import { type User } from "@prisma/client";

export type SubscriptionInfo = {
  isActive: boolean;
  isTrial: boolean;
  isExpired: boolean;
  daysRemaining: number;
  status: "trial" | "active" | "inactive" | "expired" | "cancelled";
  trialEndDate: Date | null;
};

/**
 * Check if user has active subscription or trial
 */
export function checkSubscriptionStatus(user: User): SubscriptionInfo {
  const now = new Date();
  
  // Handle users created before trial system was implemented
  // If no trial end date but we have a trial start date, calculate from that
  if (!user.trialEndDate && user.trialStartDate && (!user.subscriptionStatus || user.subscriptionStatus === "trial" || user.subscriptionStatus === "inactive")) {
    const trialStart = new Date(user.trialStartDate);
    const trialEnd = new Date(trialStart);
    trialEnd.setDate(trialEnd.getDate() + 14); // 14 day trial
    
    const isTrialActive = trialEnd > now;
    if (isTrialActive) {
      const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        isActive: true,
        isTrial: true,
        isExpired: false,
        daysRemaining,
        status: "trial",
        trialEndDate: trialEnd,
      };
    } else {
      // Trial expired
      return {
        isActive: false,
        isTrial: false,
        isExpired: true,
        daysRemaining: 0,
        status: "expired",
        trialEndDate: trialEnd,
      };
    }
  }
  
  // Fallback for legacy users with no trial dates at all - calculate from account creation
  if (!user.trialEndDate && !user.trialStartDate && (!user.subscriptionStatus || user.subscriptionStatus === "trial" || user.subscriptionStatus === "inactive")) {
    // For users without trial dates, use a conservative approach
    // Assume trial is active for a limited time only
    return {
      isActive: true,
      isTrial: true,
      isExpired: false,
      daysRemaining: 3, // Reduced to encourage using the fix-trial endpoint
      status: "trial",
      trialEndDate: null,
    };
  }
  
  // Check if user is in trial period
  if (user.trialEndDate && user.subscriptionStatus === "trial") {
    const trialEnd = new Date(user.trialEndDate);
    const isTrialActive = trialEnd > now;
    
    if (isTrialActive) {
      const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        isActive: true,
        isTrial: true,
        isExpired: false,
        daysRemaining,
        status: "trial",
        trialEndDate: trialEnd,
      };
    } else {
      // Trial expired
      return {
        isActive: false,
        isTrial: false,
        isExpired: true,
        daysRemaining: 0,
        status: "expired",
        trialEndDate: trialEnd,
      };
    }
  }
  
  // Check if user has active paid subscription
  if (user.subscriptionStatus === "active") {
    const subscriptionEnd = user.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : null;
    const isSubscriptionActive = !subscriptionEnd || subscriptionEnd > now;
    
    if (isSubscriptionActive) {
      const daysRemaining = subscriptionEnd 
        ? Math.ceil((subscriptionEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 999; // Unlimited if no expiration date
      
      return {
        isActive: true,
        isTrial: false,
        isExpired: false,
        daysRemaining,
        status: "active",
        trialEndDate: null,
      };
    }
  }
  
  // Subscription inactive or cancelled
  return {
    isActive: false,
    isTrial: false,
    isExpired: true,
    daysRemaining: 0,
    status: user.subscriptionStatus as "inactive" | "expired" | "cancelled" || "inactive",
    trialEndDate: user.trialEndDate ? new Date(user.trialEndDate) : null,
  };
}

/**
 * Get user-friendly subscription status message
 */
export function getSubscriptionMessage(info: SubscriptionInfo): string {
  if (info.isTrial) {
    if (info.daysRemaining > 7) {
      return `You have ${info.daysRemaining} days left in your free trial.`;
    } else if (info.daysRemaining > 0) {
      return `⚠️ Your trial expires in ${info.daysRemaining} days. Upgrade to continue!`;
    }
  }
  
  if (info.status === "active") {
    return "✅ Pro Plan Active";
  }
  
  if (info.isExpired) {
    return "❌ Your trial has expired. Please upgrade to continue using PropertyDrop.";
  }
  
  return "Please subscribe to access PropertyDrop.";
}

