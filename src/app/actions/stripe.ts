"use server";

import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { env } from "~/env";

export async function createStripeCheckout(deliveryHash: string) {
  try {
    // Get job and photographer
    const job = await db.job.findUnique({
      where: { clientAccessHash: deliveryHash },
      include: { 
        photographer: {
          select: {
            id: true,
            stripeAccountId: true,
            stripeAccountStatus: true,
            name: true,
          },
        },
      },
    });

    if (!job) {
      return { 
        success: false, 
        error: "Job not found" 
      };
    }

    if (job.isPaid) {
      return { 
        success: false, 
        error: "This job has already been paid" 
      };
    }

    const photographer = job.photographer;

    // Check if photographer has connected Stripe
    if (!photographer.stripeAccountId) {
      return { 
        success: false, 
        error: "Photographer hasn't set up payment processing yet. Please contact them directly." 
      };
    }

    // Check if photographer's Stripe account is ready
    if (photographer.stripeAccountStatus !== "complete") {
      return { 
        success: false, 
        error: "Photographer's payment account is still being set up. Please try again later." 
      };
    }

    // Create Stripe Checkout session with direct transfer to photographer
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Real Estate Photos: ${job.name}`,
              description: `High-resolution property photos from ${photographer.name || "your photographer"}`,
            },
            unit_amount: job.jobAmount, // Already in cents
          },
          quantity: 1,
        },
      ],

      // 🎯 KEY: Money goes directly to photographer's account
      payment_intent_data: {
        application_fee_amount: 0, // PropertyDrop takes $0 (can change to take commission)
        transfer_data: {
          destination: photographer.stripeAccountId, // Money goes to photographer
        },
      },

      metadata: {
        jobId: job.id,
        photographerId: photographer.id,
        deliveryHash: deliveryHash,
      },

      success_url: `${env.NEXT_PUBLIC_APP_URL}/deliver/${deliveryHash}?paid=true`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/deliver/${deliveryHash}`,
    });

    return { 
      success: true, 
      url: session.url 
    };
    
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return { 
      success: false, 
      error: "Failed to create payment session. Please try again." 
    };
  }
}

