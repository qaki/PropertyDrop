"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { env } from "~/env";

/**
 * Cancel user's subscription
 * Important: No refund policy - cancellation takes effect at end of current billing period
 */
export async function cancelSubscription() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  // Check if user has an active subscription
  if (user.subscriptionStatus !== "active" || !user.whopMembershipId) {
    return { success: false, error: "No active subscription to cancel" };
  }

  try {
    // Call Whop API to cancel the membership
    // This will trigger a webhook that updates our DB
    if (!env.WHOP_API_KEY) {
      return { success: false, error: "Subscription service not configured" };
    }

    const response = await fetch(`https://api.whop.com/api/v2/memberships/${user.whopMembershipId}/cancel`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Whop cancellation failed:", errorData);
      return { success: false, error: "Failed to cancel subscription. Please contact support." };
    }

    // Update our database immediately (webhook will also update)
    await db.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: "cancelled",
      },
    });

    return {
      success: true,
      message: "Subscription cancelled successfully. You'll have access until the end of your current billing period. No refunds will be issued for the current period.",
    };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, error: "Failed to cancel subscription. Please try again or contact support." };
  }
}

/**
 * Reactivate a cancelled subscription
 */
export async function reactivateSubscription() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.subscriptionStatus !== "cancelled") {
    return { success: false, error: "Subscription is not cancelled" };
  }

  // User needs to go through Whop checkout again
  return {
    success: false,
    error: "Please use the Subscribe Now button to reactivate your subscription.",
  };
}

