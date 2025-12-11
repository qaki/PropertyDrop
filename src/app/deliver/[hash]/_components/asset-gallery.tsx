"use client";

import Image from "next/image";

interface Asset {
  id: string;
  previewUrl: string;
  downloadUrl: string;
}

interface AssetGalleryProps {
  assets: Asset[];
  isPaid: boolean;
}

export function AssetGallery({ assets, isPaid }: AssetGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="relative group bg-white rounded-lg shadow-sm overflow-hidden aspect-[4/3] select-none"
          onContextMenu={(e) => !isPaid && e.preventDefault()} // Disable right-click for unpaid
        >
          <Image
            src={asset.previewUrl}
            alt="Property Photo"
            fill
            className="object-cover pointer-events-none" // Disable dragging
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized // Required for dynamic proxy URLs
            draggable={false}
          />

          {/* Watermark Overlay for Unpaid Jobs - Multiple layers for visibility */}
          {!isPaid && (
            <>
              {/* Semi-transparent overlay to prevent direct viewing */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 pointer-events-none z-10" />

              {/* Large centered watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="bg-black/70 text-white px-8 py-4 rounded-xl text-2xl font-bold transform -rotate-12 shadow-2xl border-4 border-white/30">
                  PREVIEW ONLY
                </div>
              </div>

              {/* Corner watermarks for redundancy */}
              <div className="absolute top-4 left-4 bg-red-600/80 text-white px-3 py-1 rounded text-xs font-bold z-20 pointer-events-none">
                UNPAID
              </div>
              <div className="absolute bottom-4 right-4 bg-red-600/80 text-white px-3 py-1 rounded text-xs font-bold z-20 pointer-events-none">
                LOCKED
              </div>
            </>
          )}

          {/* Download Button (only if paid) */}
          {isPaid && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100 z-30">
              <a
                href={asset.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100"
              >
                Download
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

