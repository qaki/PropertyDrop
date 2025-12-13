"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Download, FileArchive, Image as ImageIcon, Printer } from "lucide-react";

interface DownloadAllButtonProps {
  assets: Array<{
    id: string;
    downloadUrl: string;
  }>;
  jobName: string;
  deliverySize: string;
  includeOriginals: boolean;
}

type DownloadType = "mls" | "web" | "originals";

export function DownloadAllButton({ 
  assets, 
  jobName, 
  deliverySize,
  includeOriginals 
}: DownloadAllButtonProps) {
  const [downloading, setDownloading] = useState<DownloadType | null>(null);

  async function handleDownload(type: DownloadType) {
    setDownloading(type);

    try {
      const zip = new JSZip();

      // Determine which asset keys to fetch based on download type
      const assetParam = type === "originals" ? "original" : type;

      // Fetch all images and add them to the ZIP
      await Promise.all(
        assets.map(async (asset, index) => {
          try {
            // Fetch the image from our proxy endpoint with type parameter
            const url = `${asset.downloadUrl}?type=${assetParam}`;
            const response = await fetch(url);
            
            if (!response.ok) {
              console.error(`Failed to fetch asset ${asset.id}`);
              return;
            }

            const blob = await response.blob();
            
            // Get file extension from content type
            const contentType = response.headers.get("content-type") || "image/jpeg";
            const extension = contentType.split("/")[1] || "jpg";
            
            // Add to ZIP with sequential naming and type prefix
            const prefix = type === "mls" ? "MLS" : type === "web" ? "WEB" : "ORIGINAL";
            const filename = `${prefix}_${jobName.replace(/[^a-z0-9]/gi, '_')}_${index + 1}.${extension}`;
            zip.file(filename, blob);
          } catch (error) {
            console.error(`Error downloading asset ${asset.id}:`, error);
          }
        })
      );

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Trigger download
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      const zipName = type === "originals" 
        ? `${jobName.replace(/[^a-z0-9]/gi, '_')}_ORIGINALS.zip`
        : type === "web"
        ? `${jobName.replace(/[^a-z0-9]/gi, '_')}_WEB.zip`
        : `${jobName.replace(/[^a-z0-9]/gi, '_')}_MLS.zip`;
      link.download = zipName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      alert("Failed to download photos. Please try again.");
    } finally {
      setDownloading(null);
    }
  }

  const showMLS = deliverySize === "mls" || deliverySize === "both";
  const showWeb = deliverySize === "web" || deliverySize === "both";

  return (
    <div className="space-y-3 w-full max-w-md mx-auto">
      {showMLS && (
        <button
          onClick={() => handleDownload("mls")}
          disabled={downloading !== null}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
        >
          {downloading === "mls" ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Preparing ZIP...
            </>
          ) : (
            <>
              <FileArchive className="h-5 w-5" />
              <div className="text-left flex-1">
                <div>Download MLS Set</div>
                <div className="text-xs opacity-90">1024px - Optimized for listings</div>
              </div>
            </>
          )}
        </button>
      )}

      {showWeb && (
        <button
          onClick={() => handleDownload("web")}
          disabled={downloading !== null}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
        >
          {downloading === "web" ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Preparing ZIP...
            </>
          ) : (
            <>
              <ImageIcon className="h-5 w-5" />
              <div className="text-left flex-1">
                <div>Download Web Set</div>
                <div className="text-xs opacity-90">1920px - High quality for web</div>
              </div>
            </>
          )}
        </button>
      )}

      {includeOriginals && (
        <button
          onClick={() => handleDownload("originals")}
          disabled={downloading !== null}
          className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
        >
          {downloading === "originals" ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Preparing ZIP...
            </>
          ) : (
            <>
              <Printer className="h-5 w-5" />
              <div className="text-left flex-1">
                <div>Download Print Set</div>
                <div className="text-xs opacity-90">Full resolution - Original files</div>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
}
