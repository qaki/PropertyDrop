"use server";

import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

/**
 * TEMPORARY TESTING FUNCTION
 * This simulates a successful payment for testing purposes
 * TODO: Remove this before production!
 */
export async function markJobAsPaid(jobId: string) {
  try {
    await db.job.update({
      where: { id: jobId },
      data: { isPaid: true },
    });
    
    console.log(`✅ [TEST] Job ${jobId} manually marked as paid`);
    
    // Revalidate the delivery page to show the updated status
    const job = await db.job.findUnique({ where: { id: jobId } });
    if (job) {
      revalidatePath(`/deliver/${job.clientAccessHash}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error marking job as paid:", error);
    return { success: false, error: "Failed to update job" };
  }
}

