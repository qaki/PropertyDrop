import { db } from "~/server/db";
import { env } from "~/env";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook signature (if Whop provides one)
    const signature = request.headers.get("x-whop-signature");
    const webhookSecret = env.WHOP_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      // TODO: Implement signature verification once you have Whop's docs
      // For now, we'll trust the webhook in development
      console.log("Webhook signature:", signature);
    }

    console.log("Whop Webhook Event:", body.action);
    console.log("Whop Webhook Data:", body.data);

    // Whop webhook event types:
    // - payment.succeeded
    // - payment.failed
    // - membership.went_valid
    // - membership.went_invalid
    
    // Handle successful payment
    if (body.action === "payment.succeeded" || body.action === "membership.went_valid") {
      // Extract custom data from checkout_data
      const checkoutData = body.data?.checkout_data || body.data?.metadata;
      
      if (!checkoutData) {
        console.error("No checkout_data found in webhook");
        return NextResponse.json({ error: "No checkout_data" }, { status: 400 });
      }

      let jobId: string;
      
      // Parse checkout_data if it's a string
      if (typeof checkoutData === "string") {
        const parsed = JSON.parse(checkoutData);
        jobId = parsed.jobId;
      } else {
        jobId = checkoutData.jobId;
      }

      if (!jobId) {
        console.error("No jobId in checkout_data");
        return NextResponse.json({ error: "No jobId" }, { status: 400 });
      }

      // Update job to mark as paid
      await db.job.update({
        where: { id: jobId },
        data: { isPaid: true },
      });

      console.log(`✅ Job ${jobId} marked as paid via Whop webhook`);
      
      return NextResponse.json({ success: true });
    }

    // Handle other webhook events if needed
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error("Whop Webhook Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook processing failed" },
      { status: 500 }
    );
  }
}

