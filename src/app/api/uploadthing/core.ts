import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { z } from "zod";
import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 20 } })
    .input(z.object({ 
      jobId: z.string(),
      resizeType: z.string().default("mls")
    }))
    .middleware(async ({ req, input }) => {
      console.log("--> MIDDLEWARE START. JobID:", input.jobId, "ResizeType:", input.resizeType);
      
      const session = await auth();
      if (!session?.user) {
          console.log("--> MIDDLEWARE ERROR: No Session");
          throw new Error("Unauthorized");
      }

      console.log("--> MIDDLEWARE SUCCESS. User:", session.user.id);
      return { 
        userId: session.user.id, 
        jobId: input.jobId,
        resizeType: input.resizeType 
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("--> UPLOAD COMPLETE START");
      console.log("Metadata:", metadata);
      console.log("File:", file.url, "Name:", file.name);
      
      try {
          // Create asset record in database (NOT processed yet - waiting for "Publish" button)
          const asset = await db.asset.create({
            data: {
                jobId: metadata.jobId,
                originalKey: file.url, // Store full URL for original
                originalFilename: file.name,
                resizeType: metadata.resizeType,
                isProcessed: false, // Will be true after "Publish" button clicked
                mimeType: file.type || "image/jpeg",
                size: file.size,
            }
          });
          console.log("--> DB INSERT SUCCESS (staged):", asset.id);
          console.log("--> Waiting for user to click 'Publish' button...");
          
          // ⏸️ NO AUTO-PROCESSING - Wait for user to click "Publish to Delivery Page"
          
      } catch (e) {
          console.error("--> UPLOAD ERROR:", e);
      }
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
