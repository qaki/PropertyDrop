import { db } from "~/server/db";
import { env } from "~/env";
import { NextResponse, type NextRequest } from "next/server";
import { createHmac } from "crypto";

/**
 * Whop Webhook Handler for Photographer Subscriptions
 * 
 * This webhook handles photographer subscription events:
 * - membership_activated → Photographer paid subscription → Grant access
 * - membership_deactivated → Subscription expired/cancelled → Block access
 * - payment_succeeded → Track successful subscription payments
 * - payment_failed → Alert when subscription payment fails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-whop-signature");
    
    // Verify webhook signature for security
    if (env.WHOP_WEBHOOK_SECRET && signature) {
      const expectedSignature = createHmac("sha256", env.WHOP_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");
      
      if (signature !== expectedSignature) {
        console.error("❌ Invalid Whop webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const action = event.action || event.type;
    const data = event.data;

    console.log("📥 Whop Webhook:", action);

    // Handle photographer subscription activation
    if (action === "membership_activated" || action === "membership.went_valid") {
      const userId = data?.user_id || data?.metadata?.userId;
      const membershipId = data?.id || data?.membership_id;
      const email = data?.email || data?.user?.email;

      console.log("✅ Subscription activated:", { userId, membershipId, email });

      // Find user by Whop membership ID or email
      let user;
      if (userId) {
        user = await db.user.findFirst({
          where: { whopMembershipId: userId },
        });
      }
      
      if (!user && email) {
        user = await db.user.findUnique({
          where: { email },
        });
      }

      if (user) {
        // Activate photographer's subscription
        await db.user.update({
          where: { id: user.id },
          data: {
            whopMembershipId: membershipId,
            subscriptionStatus: "active",
            subscriptionExpiresAt: data?.valid_until 
              ? new Date(data.valid_until * 1000) 
              : null,
          },
        });

        console.log(`✅ Photographer ${user.email} subscription activated!`);
      } else {
        console.warn("⚠️ User not found for subscription activation:", { userId, email });
      }

      return NextResponse.json({ success: true });
    }

    // Handle photographer subscription deactivation
    if (action === "membership_deactivated" || action === "membership.went_invalid") {
      const userId = data?.user_id || data?.metadata?.userId;
      const membershipId = data?.id || data?.membership_id;
      const email = data?.email || data?.user?.email;

      console.log("❌ Subscription deactivated:", { userId, membershipId, email });

      // Find user
      let user;
      if (membershipId) {
        user = await db.user.findFirst({
          where: { whopMembershipId: membershipId },
        });
      }
      
      if (!user && email) {
        user = await db.user.findUnique({
          where: { email },
        });
      }

      if (user) {
        // Deactivate photographer's subscription
        await db.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: "inactive",
          },
        });

        console.log(`❌ Photographer ${user.email} subscription deactivated!`);
      } else {
        console.warn("⚠️ User not found for subscription deactivation:", { userId, email });
      }

      return NextResponse.json({ success: true });
    }

    // Handle successful subscription payments (logging only)
    if (action === "payment_succeeded" || action === "payment.succeeded") {
      const email = data?.email || data?.user?.email;
      const amount = data?.amount || data?.total;
      
      console.log("💰 Subscription payment received:", { email, amount });
      
      // Optional: Track payment in database for analytics
      return NextResponse.json({ success: true });
    }

    // Handle failed subscription payments
    if (action === "payment_failed" || action === "payment.failed") {
      const email = data?.email || data?.user?.email;
      
      console.error("❌ Subscription payment failed:", { email });
      
      // Optional: Send alert to photographer
      // Optional: Implement grace period before deactivating
      return NextResponse.json({ success: true });
    }

    // Log unhandled events
    console.log("ℹ️ Unhandled Whop event:", action);
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error("❌ Whop Webhook Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook processing failed" },
      { status: 500 }
    );
  }
}

