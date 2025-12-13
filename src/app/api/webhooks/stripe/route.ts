import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { env } from "~/env";
import { headers } from "next/headers";
import { resend } from "~/lib/resend";
import { generateClientReceiptEmail, generatePhotographerSalesAlertEmail } from "~/lib/email-templates";
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
          const deliveryHash = session.metadata?.deliveryHash;

          if (!jobId) {
            console.error("No jobId in session metadata");
            break;
          }

          // Get job details with photographer info and assets
          const job = await db.job.findUnique({
            where: { id: jobId },
            include: {
              photographer: {
                select: {
                  name: true,
                  email: true,
                },
              },
              assets: true,
            },
          });

          if (!job) {
            console.error(`Job ${jobId} not found`);
            break;
          }

          // Mark job as paid
          await db.job.update({
            where: { id: jobId },
            data: { isPaid: true },
          });

          console.log(`✅ Job ${jobId} marked as paid via Stripe`);

          // Get Stripe hosted receipt URL
          const paymentIntent = session.payment_intent as string;
          let receiptUrl = "";
          try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntent, {
              expand: ['latest_charge'],
            }) as Stripe.PaymentIntent & {
              latest_charge: Stripe.Charge;
            };
            if (pi.latest_charge && typeof pi.latest_charge !== 'string') {
              receiptUrl = pi.latest_charge.receipt_url || "";
            }
          } catch (err) {
            console.error("Failed to get receipt URL:", err);
          }

          const deliveryUrl = `${env.NEXT_PUBLIC_APP_URL}/deliver/${deliveryHash || job.clientAccessHash}`;
          const amountFormatted = (job.jobAmount / 100).toFixed(2);

          // 1. Send receipt email to CLIENT
          try {
            await resend.emails.send({
              from: "PropertyDrop <no-reply@property-drop.com>",
              to: job.agentEmail,
              subject: `Payment Receipt - ${job.name} Photos`,
              html: generateClientReceiptEmail({
                clientEmail: job.agentEmail,
                jobName: job.name,
                amount: amountFormatted,
                photographerName: job.photographer.name || "Your photographer",
                deliveryUrl,
                stripeReceiptUrl: receiptUrl || deliveryUrl,
                photoCount: job.assets.length,
              }),
            });
            console.log(`📧 Receipt email sent to client: ${job.agentEmail}`);
          } catch (emailError) {
            console.error("Failed to send client receipt email:", emailError);
          }

          // 2. Send sales alert to PHOTOGRAPHER
          try {
            await resend.emails.send({
              from: "PropertyDrop <no-reply@property-drop.com>",
              to: job.photographer.email!,
              subject: `💰 Payment Received: $${amountFormatted} - ${job.name}`,
              html: generatePhotographerSalesAlertEmail({
                photographerName: job.photographer.name || "Photographer",
                jobName: job.name,
                clientEmail: job.agentEmail,
                amount: amountFormatted,
                photoCount: job.assets.length,
                jobDashboardUrl: `${env.NEXT_PUBLIC_APP_URL}/jobs/${jobId}`,
                stripeReceiptUrl: receiptUrl || `${env.NEXT_PUBLIC_APP_URL}/jobs`,
              }),
            });
            console.log(`📧 Sales alert sent to photographer: ${job.photographer.email}`);
          } catch (emailError) {
            console.error("Failed to send photographer alert email:", emailError);
          }
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

