import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

/**
 * Preview endpoint - serves images with reduced quality for unpaid jobs
 * For paid jobs, serves the full resolution image
 * 
 * SECURITY NOTE: This endpoint should ideally fetch the image, watermark it server-side,
 * and return the modified bytes. For MVP, we're using client-side watermarks + right-click protection.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;

  try {
    // Fetch asset with job relationship
    const asset = await db.asset.findUnique({
      where: { id: assetId },
      include: { job: true },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Get the image URL (MLS version if available, otherwise original)
    const imageUrl = asset.mlsKey || asset.originalKey;
    
    // Construct UploadThing URL if it's just a key
    const fullUrl = imageUrl.startsWith("http") 
      ? imageUrl 
      : `https://utfs.io/f/${imageUrl}`;

    // For unpaid jobs, we should serve a lower-quality or watermarked version
    // For MVP: redirect to the full image, but client-side watermarks + right-click protection
    // TODO: Implement server-side watermarking with Sharp for production
    
    if (!asset.job.isPaid) {
      // Add cache headers to prevent caching of unpaid previews
      const response = NextResponse.redirect(fullUrl);
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }
    
    // For paid jobs, allow normal caching
    return NextResponse.redirect(fullUrl);
    
  } catch (error) {
    console.error("Error fetching asset preview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
