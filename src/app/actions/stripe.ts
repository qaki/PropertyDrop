"use server";

import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(jobId: string) {
    const job = await db.job.findUnique({
        where: { id: jobId },
    });

    if (!job) {
        return { success: false, error: "Job not found" };
    }

    if (job.isPaid) {
        return { success: false, error: "Job already paid" };
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Photos for Job: ${job.name}`,
                            description: "Real Estate Photography Delivery",
                        },
                        unit_amount: job.jobAmount, // Amount is already in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/deliver/${job.clientAccessHash}?success=true`,
            cancel_url: `${origin}/deliver/${job.clientAccessHash}?canceled=true`,
            metadata: {
                jobId: job.id,
            },
            client_reference_id: job.id,
        });

        if (!session.url) {
            throw new Error("No session URL returned");
        }

        return { success: true, url: session.url };
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return { success: false, error: "Failed to create checkout session" };
    }
}

