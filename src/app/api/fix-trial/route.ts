import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

/**
 * One-time fix for users who have missing trialEndDate
 * This recalculates trial dates from trialStartDate or sets them fresh
 */
export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user already has valid trial dates, just report them
    if (user.trialEndDate) {
      const daysRemaining = Math.ceil(
        (new Date(user.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      return NextResponse.json({
        message: "Trial dates already set",
        trialStartDate: user.trialStartDate,
        trialEndDate: user.trialEndDate,
        daysRemaining: Math.max(0, daysRemaining),
        subscriptionStatus: user.subscriptionStatus,
      });
    }

    // Calculate trial end from start date if available
    let trialStartDate = user.trialStartDate;
    let trialEndDate: Date;

    if (trialStartDate) {
      // User has a start date but no end date - calculate end date
      trialEndDate = new Date(trialStartDate);
      trialEndDate.setDate(trialEndDate.getDate() + 14);
    } else {
      // No trial dates at all - set them from now
      trialStartDate = new Date();
      trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 14);
    }

    // Update the user record
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        trialStartDate,
        trialEndDate,
        subscriptionStatus: "trial",
      },
    });

    const daysRemaining = Math.ceil(
      (trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return NextResponse.json({
      message: "Trial dates fixed successfully",
      trialStartDate: updatedUser.trialStartDate,
      trialEndDate: updatedUser.trialEndDate,
      daysRemaining: Math.max(0, daysRemaining),
      subscriptionStatus: updatedUser.subscriptionStatus,
    });
  } catch (error) {
    console.error("Error fixing trial dates:", error);
    return NextResponse.json(
      { error: "Failed to fix trial dates" },
      { status: 500 }
    );
  }
}

// GET method to check current trial status
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        trialStartDate: true,
        trialEndDate: true,
        subscriptionStatus: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const daysRemaining = user.trialEndDate
      ? Math.ceil(
          (new Date(user.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      : null;

    return NextResponse.json({
      email: user.email,
      trialStartDate: user.trialStartDate,
      trialEndDate: user.trialEndDate,
      daysRemaining: daysRemaining !== null ? Math.max(0, daysRemaining) : "not set",
      subscriptionStatus: user.subscriptionStatus,
      needsFix: !user.trialEndDate,
    });
  } catch (error) {
    console.error("Error checking trial status:", error);
    return NextResponse.json(
      { error: "Failed to check trial status" },
      { status: 500 }
    );
  }
}

