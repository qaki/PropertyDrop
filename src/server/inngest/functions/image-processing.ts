import { inngest } from "~/server/inngest/client";
import { db } from "~/server/db";
import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const processImage = inngest.createFunction(
    { id: "process-image" },
    { event: "image/process" },
    async ({ event, step }) => {
        const { assetId, key } = event.data; // key is now the Full URL

        await step.run("process-and-upload", async () => {
             // 1. Download
             const response = await fetch(key);
             if (!response.ok) throw new Error("Failed to fetch image");
             const buffer = await response.arrayBuffer();
            
             // 2. Resize
            const processed = await sharp(Buffer.from(buffer))
                .resize({ width: 1280, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toBuffer();
            
            // 3. Upload Resized to UploadThing
            // We need a File object for UT
            const file = new File([processed], "mls-optimized.jpg", { type: "image/jpeg" });
            
            const responseUT = await utapi.uploadFiles([file]);
            const uploaded = responseUT[0];

            if (!uploaded || !uploaded.data) {
                throw new Error("Failed to upload processed image");
            }

            const mlsKey = uploaded.data.url;

            // 4. Update DB
            await db.asset.update({
                where: { id: assetId },
                data: {
                    mlsKey,
                }
            });
            
            return { mlsKey };
        });

        return { success: true };
    }
);
