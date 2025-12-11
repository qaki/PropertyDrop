"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { inngest } from "~/server/inngest/client";

export async function registerAsset(jobId: string, originalKey: string, mimeType: string, size: number) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    // Verify job belongs to user
    const job = await db.job.findUnique({
        where: { id: jobId, photographerId: session.user.id }
    });
    if (!job) return { success: false, error: "Job not found" };

    try {
        const asset = await db.asset.create({
            data: {
                jobId,
                originalKey,
                mimeType,
                size,
            }
        });

        // Trigger Inngest
        await inngest.send({
            name: "image/process",
            data: {
                assetId: asset.id,
                key: originalKey,
            }
        });

        return { success: true, data: asset };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Failed to register asset" };
    }
}

