import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { env } from "~/env";
import { headers } from "next/headers";
import type Stripe from "stripe";

/**
 * Stripe webhook handler
 * Receives events from Stripe and updates job payment status
 */
export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("No Stripe signature found");
    return Response.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature (only if webhook secret is configured)
    if (env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // For development/testing without webhook secret
      console.warn("⚠️ Stripe webhook secret not configured - skipping signature verification");
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Check if payment was successful
        if (session.payment_status === "paid") {
          const jobId = session.metadata?.jobId;

          if (!jobId) {
            console.error("No jobId in session metadata");
            break;
          }

          // Mark job as paid
          await db.job.update({
            where: { id: jobId },
            data: { isPaid: true },
          });

          console.log(`✅ Job ${jobId} marked as paid via Stripe`);
        }
        break;
      }

      case "account.updated": {
        // When photographer completes Stripe Connect onboarding
        const account = event.data.object as Stripe.Account;
        const userId = account.metadata?.userId;

        if (userId) {
          const isComplete = account.details_submitted && account.charges_enabled;
          
          await db.user.update({
            where: { id: userId },
            data: {
              stripeAccountStatus: isComplete ? "complete" : "pending",
            },
          });

          console.log(`✅ User ${userId} Stripe account status updated to ${isComplete ? "complete" : "pending"}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
    
  } catch (error) {
    console.error("Webhook handler error:", error);
    return Response.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

