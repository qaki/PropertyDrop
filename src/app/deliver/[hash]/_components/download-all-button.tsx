"use client";

import { useState } from "react";
import JSZip from "jszip";

interface DownloadAllButtonProps {
  assets: Array<{
    id: string;
    downloadUrl: string;
  }>;
  jobName: string;
}

export function DownloadAllButton({ assets, jobName }: DownloadAllButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownloadAll() {
    setIsDownloading(true);

    try {
      const zip = new JSZip();

      // Fetch all images and add them to the ZIP
      await Promise.all(
        assets.map(async (asset, index) => {
          try {
            // Fetch the image from our proxy endpoint
            const response = await fetch(asset.downloadUrl);
            
            if (!response.ok) {
              console.error(`Failed to fetch asset ${asset.id}`);
              return;
            }

            const blob = await response.blob();
            
            // Get file extension from content type
            const contentType = response.headers.get("content-type") || "image/jpeg";
            const extension = contentType.split("/")[1] || "jpg";
            
            // Add to ZIP with sequential naming
            const filename = `${jobName.replace(/[^a-z0-9]/gi, '_')}_${index + 1}.${extension}`;
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
      link.download = `${jobName.replace(/[^a-z0-9]/gi, '_')}_photos.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      alert("Failed to download photos. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      onClick={handleDownloadAll}
      disabled={isDownloading}
      className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isDownloading ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          Preparing ZIP...
        </>
      ) : (
        <>📦 Download All Assets (ZIP)</>
      )}
    </button>
  );
}

