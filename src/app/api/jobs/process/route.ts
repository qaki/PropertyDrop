import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Resize configurations
const resizeConfigs = {
  mls: { width: 1280, quality: 80, name: "mls" },
  web: { width: 1920, quality: 85, name: "web" },
  full: { width: null, quality: 95, name: "full" }, // No resize, minimal compression
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId, resizeType } = await req.json();

    // Verify job belongs to user
    const job = await db.job.findUnique({
      where: { id: jobId, photographerId: session.user.id },
      include: { assets: { where: { isProcessed: false } } },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const config = resizeConfigs[resizeType as keyof typeof resizeConfigs] || resizeConfigs.mls;
    
    console.log(`🚀 Processing ${job.assets.length} assets with ${resizeType} config...`);

    // Process each unprocessed asset
    for (const asset of job.assets) {
      try {
        console.log(`→ Processing asset ${asset.id}...`);

        // 1. Download original
        const response = await fetch(asset.originalKey);
        if (!response.ok) throw new Error("Failed to fetch original");
        const buffer = await response.arrayBuffer();

        // 2. Process based on resize type
        let processedBuffer: Buffer;
        
        if (config.width) {
          // Resize
          processedBuffer = await sharp(Buffer.from(buffer))
            .resize({ width: config.width, withoutEnlargement: true })
            .jpeg({ quality: config.quality, mozjpeg: true })
            .toBuffer();
        } else {
          // Full resolution - just compress
          processedBuffer = await sharp(Buffer.from(buffer))
            .jpeg({ quality: config.quality, mozjpeg: true })
            .toBuffer();
        }

        console.log(`  Original: ${asset.size} bytes → Processed: ${processedBuffer.length} bytes`);

        // 3. Upload processed version
        const filename = `${config.name}-${asset.originalFilename}`;
        const processedFile = new File([processedBuffer], filename, { type: "image/jpeg" });
        const uploadRes = await utapi.uploadFiles([processedFile]);

        if (uploadRes[0]?.data?.url) {
          // 4. Update asset with processed version
          await db.asset.update({
            where: { id: asset.id },
            data: {
              mlsKey: uploadRes[0].data.url,
              isProcessed: true,
            },
          });
          console.log(`  ✓ Asset ${asset.id} processed successfully`);
        } else {
          console.error(`  ✗ Failed to upload processed version for ${asset.id}`);
        }
      } catch (err) {
        console.error(`Error processing asset ${asset.id}:`, err);
        // Continue with next asset even if one fails
      }
    }

    // Update job status to "ready"
    await db.job.update({
      where: { id: jobId },
      data: { status: "ready" },
    });

    console.log(`✅ Job ${jobId} processing complete!`);

    return NextResponse.json({ success: true, processed: job.assets.length });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 }
    );
  }
}

