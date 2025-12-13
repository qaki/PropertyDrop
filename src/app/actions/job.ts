"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createJobSchema = z.object({
  name: z.string().min(1),
  agentEmail: z.string().email(),
  jobAmount: z.number().min(1), // in dollars
  deliverySize: z.enum(["mls", "web", "both"]).default("mls"), // P2.3
  includeOriginals: z.boolean().default(false), // P2.3
});

export async function createJob(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const rawData = {
        name: formData.get("name"),
        agentEmail: formData.get("agentEmail"),
        jobAmount: Number(formData.get("jobAmount")),
        deliverySize: formData.get("deliverySize") || "mls",
        includeOriginals: formData.get("includeOriginals") === "true",
    };

    const parsed = createJobSchema.safeParse(rawData);
    if (!parsed.success) return { success: false, error: "Invalid data" };

    try {
        const job = await db.job.create({
            data: {
                name: parsed.data.name,
                agentEmail: parsed.data.agentEmail,
                jobAmount: parsed.data.jobAmount * 100, // convert to cents
                photographerId: session.user.id,
                status: "uploading",
                deliverySize: parsed.data.deliverySize, // P2.3
                includeOriginals: parsed.data.includeOriginals, // P2.3
            }
        });
        
        revalidatePath("/jobs");
        return { success: true, data: job };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Failed to create job" };
    }
}

