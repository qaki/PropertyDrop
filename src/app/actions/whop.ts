"use server";

import { db } from "~/server/db";
import { env } from "~/env";

export async function createWhopCheckout(jobId: string) {
  const job = await db.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { success: false, error: "Job not found" };
  }

  if (job.isPaid) {
    return { success: false, error: "Job already paid" };
  }

  const productId = env.NEXT_PUBLIC_WHOP_PRODUCT_ID;

  if (!productId) {
    return { 
      success: false, 
      error: "Whop product ID not configured. Please add NEXT_PUBLIC_WHOP_PRODUCT_ID to your environment variables." 
    };
  }

  // Whop checkout URL format
  // You can pass custom data via the checkout_data parameter
  const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const successUrl = `${appUrl}/deliver/${job.clientAccessHash}?payment=success`;
  const cancelUrl = `${appUrl}/deliver/${job.clientAccessHash}?payment=cancelled`;

  // Build Whop checkout URL with custom data
  // Format: https://whop.com/checkout/plan_XXXXX?checkout_data={"jobId":"xxx"}&success_url=...
  const checkoutData = encodeURIComponent(JSON.stringify({ 
    jobId: job.id,
    jobName: job.name,
  }));

  const checkoutUrl = new URL(`https://whop.com/checkout/${productId}`);
  checkoutUrl.searchParams.set("checkout_data", checkoutData);
  checkoutUrl.searchParams.set("success_url", successUrl);
  checkoutUrl.searchParams.set("cancel_url", cancelUrl);

  return { 
    success: true, 
    url: checkoutUrl.toString() 
  };
}

