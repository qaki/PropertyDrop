import { auth } from "~/server/auth";
import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { env } from "~/env";

/**
 * POST /api/stripe/connect
 * Creates or retrieves a Stripe Connect account link for the photographer
 */
export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { stripeAccountId: true, email: true },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let accountId = user.stripeAccountId;

    // Create Stripe account if it doesn't exist
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "standard", // Gives photographer full control of their account
        email: user.email ?? undefined,
        metadata: {
          userId: session.user.id,
        },
      });

      accountId = account.id;

      // Save the account ID to database
      await db.user.update({
        where: { id: session.user.id },
        data: { 
          stripeAccountId: accountId,
          stripeAccountStatus: "pending",
        },
      });
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${env.NEXT_PUBLIC_APP_URL}/settings?stripe=refresh`,
      return_url: `${env.NEXT_PUBLIC_APP_URL}/settings?stripe=success`,
      type: "account_onboarding",
    });

    return Response.json({ 
      success: true,
      url: accountLink.url 
    });
    
  } catch (error) {
    console.error("Stripe Connect error:", error);
    return Response.json(
      { error: "Failed to create Stripe account link" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stripe/connect
 * Checks the status of the photographer's Stripe account
 */
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { stripeAccountId: true, stripeAccountStatus: true },
    });

    if (!user?.stripeAccountId) {
      return Response.json({ 
        connected: false,
        status: "not_connected" 
      });
    }

    // Check account status with Stripe
    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    
    const isComplete = account.details_submitted && account.charges_enabled;
    const status = isComplete ? "complete" : "pending";

    // Update status in database if changed
    if (user.stripeAccountStatus !== status) {
      await db.user.update({
        where: { id: session.user.id },
        data: { stripeAccountStatus: status },
      });
    }

    return Response.json({
      connected: true,
      status,
      accountId: user.stripeAccountId,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
    });
    
  } catch (error) {
    console.error("Stripe status check error:", error);
    return Response.json(
      { error: "Failed to check Stripe account status" },
      { status: 500 }
    );
  }
}

