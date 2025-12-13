import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { z } from "zod";
import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const f = createUploadthing();

export const ourFileRouter = {
  // Profile photo uploader (single image, no job required)
  profilePhotoUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session?.user) {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile photo uploaded:", file.url);
      
      // TODO: Save to user.image in database
      // await db.user.update({
      //   where: { id: metadata.userId },
      //   data: { image: file.url },
      // });
      
      return { uploadedBy: metadata.userId };
    }),

  // Job photo uploader (multiple images, requires jobId)
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
          // Get the current max order for this job to assign the next order
          const maxOrderAsset = await db.asset.findFirst({
            where: { jobId: metadata.jobId },
            orderBy: { order: 'desc' },
            select: { order: true },
          });
          const nextOrder = (maxOrderAsset?.order ?? -1) + 1;

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
                order: nextOrder, // P2.1 - Assign sequential order
            }
          });
          console.log("--> DB INSERT SUCCESS (staged):", asset.id, "Order:", nextOrder);
          console.log("--> Waiting for user to click 'Publish' button...");
          
          // ⏸️ NO AUTO-PROCESSING - Wait for user to click "Publish to Delivery Page"
          
      } catch (e) {
          console.error("--> UPLOAD ERROR:", e);
      }
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
