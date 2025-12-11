import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { paddle } from "~/lib/paddle";
import { db } from "~/server/db";

/**
 * Paddle Webhook Handler
 * Processes payment notifications from Paddle
 * 
 * Paddle Webhook Events we care about:
 * - transaction.completed: Payment successful
 * - transaction.payment_failed: Payment failed
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("paddle-signature");

  if (!signature) {
    console.error("Missing Paddle Signature");
    return new NextResponse("Missing Paddle Signature", { status: 400 });
  }

  try {
    // Verify webhook signature
    const secretKey = env.PADDLE_WEBHOOK_SECRET;
    const eventData = paddle.webhooks.unmarshal(body, secretKey, signature);

    console.log("Paddle Webhook Event:", eventData.eventType);

    // Handle transaction.completed event
    if (eventData.eventType === "transaction.completed") {
      const transaction = eventData.data;
      const jobId = transaction.customData?.jobId as string | undefined;

      if (!jobId) {
        console.error("No jobId in transaction customData");
        return new NextResponse("No jobId in custom data", { status: 400 });
      }

      // Update job to mark as paid
      await db.job.update({
        where: { id: jobId },
        data: { isPaid: true },
      });

      console.log(`✅ Job ${jobId} marked as paid via Paddle transaction ${transaction.id}`);

      // TODO: Send email notification to agent
      // await sendPaymentSuccessEmail(transaction.customerEmail);
    }

    // Handle failed payments
    if (eventData.eventType === "transaction.payment_failed") {
      const transaction = eventData.data;
      const jobId = transaction.customData?.jobId as string | undefined;
      console.error(`❌ Payment failed for job ${jobId}`);
      // TODO: Send notification to photographer
    }

    return new NextResponse("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Paddle Webhook Error:", err);
    return new NextResponse(
      err instanceof Error ? err.message : "Webhook processing failed",
      { status: 400 }
    );
  }
}

