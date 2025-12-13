"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editJobSchema = z.object({
  jobId: z.string(),
  name: z.string().min(1, "Job name is required"),
  agentEmail: z.string().email("Valid email is required"),
  jobAmount: z.number().min(1, "Amount must be at least $0.01"),
});

export async function editJob(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const data = {
      jobId: formData.get("jobId") as string,
      name: formData.get("name") as string,
      agentEmail: formData.get("agentEmail") as string,
      jobAmount: parseInt(formData.get("jobAmount") as string) * 100, // Convert to cents
    };

    const parsed = editJobSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || "Invalid data" };
    }

    // Verify job belongs to user
    const job = await db.job.findUnique({
      where: { id: data.jobId, photographerId: session.user.id },
    });

    if (!job) {
      return { success: false, error: "Job not found or access denied" };
    }

    // Don't allow editing if already paid
    if (job.isPaid) {
      return { success: false, error: "Cannot edit a paid job" };
    }

    // Update job
    await db.job.update({
      where: { id: data.jobId },
      data: {
        name: parsed.data.name,
        agentEmail: parsed.data.agentEmail,
        jobAmount: parsed.data.jobAmount,
      },
    });

    revalidatePath(`/jobs/${data.jobId}`);
    revalidatePath("/jobs");
    
    return { success: true, message: "Job updated successfully" };
  } catch (error) {
    console.error("Job edit error:", error);
    return { success: false, error: "Failed to update job" };
  }
}

