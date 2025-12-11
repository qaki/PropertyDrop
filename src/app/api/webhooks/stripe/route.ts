import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    return new NextResponse("Missing Stripe Signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      console.error("No jobId in session metadata");
      return new NextResponse("No jobId in metadata", { status: 400 });
    }

    try {
      await db.job.update({
        where: { id: jobId },
        data: { isPaid: true },
      });
      console.log(`Job ${jobId} marked as paid.`);

      // TODO: Trigger email notification to Agent
      // await sendPaymentSuccessEmail(session.customer_details?.email);

    } catch (error) {
      console.error("Failed to update job status", error);
      return new NextResponse("Database update failed", { status: 500 });
    }
  }

  return new NextResponse("Received", { status: 200 });
}

