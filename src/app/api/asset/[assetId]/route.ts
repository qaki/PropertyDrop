import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") || "mls"; // mls, web, or original

  try {
    // Fetch asset with job relationship
    const asset = await db.asset.findUnique({
      where: { id: assetId },
      include: { job: true },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Check if job is paid
    if (!asset.job.isPaid) {
      return NextResponse.json(
        { error: "Payment required" },
        { status: 402 } // 402 Payment Required
      );
    }

    // Determine which version to serve based on type parameter
    let downloadUrl: string;
    
    if (type === "original") {
      // Always serve the original unprocessed file
      downloadUrl = asset.originalKey;
    } else if (type === "web") {
      // For web, use MLS version if available, otherwise original
      // TODO: In future, we could process separate web (1920px) versions
      downloadUrl = asset.mlsKey || asset.originalKey;
    } else {
      // Default to MLS version
      downloadUrl = asset.mlsKey || asset.originalKey;
    }
    
    // For UploadThing URLs, redirect directly
    if (downloadUrl.startsWith("http")) {
      return NextResponse.redirect(downloadUrl);
    }
    
    // Construct UploadThing URL if it's just a key
    const fullUrl = `https://utfs.io/f/${downloadUrl}`;
    return NextResponse.redirect(fullUrl);
    
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

