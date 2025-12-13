import { headers } from "next/headers";
import { db } from "~/server/db";
import { env } from "~/env";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("x-whop-signature");

    // Verify webhook signature
    if (env.WHOP_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", env.WHOP_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Invalid Whop webhook signature");
        return new Response("Invalid signature", { status: 401 });
      }
    }

    const event = JSON.parse(body);
    console.log("Whop webhook received:", event.type);

    switch (event.type) {
      case "membership.went_valid": {
        // User subscribed
        const { user_id, membership_id, expires_at } = event.data;
        
        await db.user.update({
          where: { email: user_id }, // Whop uses email as user_id
          data: {
            whopMembershipId: membership_id,
            subscriptionStatus: "active",
            subscriptionExpiresAt: new Date(expires_at),
          },
        });

        console.log("Subscription activated:", user_id);
        break;
      }

      case "membership.went_invalid": {
        // Subscription expired or cancelled
        const { user_id } = event.data;
        
        await db.user.update({
          where: { email: user_id },
          data: {
            subscriptionStatus: "expired",
          },
        });

        console.log("Subscription deactivated:", user_id);
        break;
      }

      case "membership.deleted": {
        // User cancelled subscription
        const { user_id } = event.data;
        
        await db.user.update({
          where: { email: user_id },
          data: {
            subscriptionStatus: "cancelled",
            whopMembershipId: null,
          },
        });

        console.log("Subscription cancelled:", user_id);
        break;
      }

      default:
        console.log("Unhandled Whop webhook type:", event.type);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Whop webhook error:", error);
    return new Response("Webhook error", { status: 500 });
  }
}
