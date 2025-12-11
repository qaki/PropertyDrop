"use server";

import { paddle } from "~/lib/paddle";
import { db } from "~/server/db";
import { headers } from "next/headers";
import type { CreateTransactionRequest } from "@paddle/paddle-node-sdk";

export async function createPaddleCheckout(jobId: string) {
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
    // Create a Paddle transaction with inline pricing (no Product/Price setup needed for MVP)
    const transactionData: CreateTransactionRequest = {
      items: [
        {
          price: {
            description: `Real Estate Photos - ${job.name}`,
            name: `Photos for Job: ${job.name}`,
            unitPrice: {
              amount: job.jobAmount.toString(), // Paddle expects string, amount in cents
              currencyCode: "USD",
            },
            quantity: 1,
          },
        },
      ],
      customData: {
        jobId: job.id, // Store jobId to update database later via webhook
      },
      // Paddle doesn't have success_url in transaction create, you configure it in checkout settings
      // We'll handle redirect via webhook notification
    };

    const transaction = await paddle.transactions.create(transactionData);

    // Paddle checkout URL format
    const checkoutUrl = transaction.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error("No checkout URL returned from Paddle");
    }

    return { success: true, url: checkoutUrl };
  } catch (error) {
    console.error("Paddle Checkout Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create checkout session" 
    };
  }
}

