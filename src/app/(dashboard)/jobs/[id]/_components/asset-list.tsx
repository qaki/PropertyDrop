"use client";

import { Loader2, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";

// Types
type Asset = {
    id: string;
    originalKey: string;
    mlsKey: string | null;
    originalFilename: string;
    resizeType: string;
    isProcessed: boolean;
};

export function AssetList({ assets }: { assets: Asset[] }) {
    if (assets.length === 0) {
        return <div className="text-center text-gray-500 py-8">No photos uploaded yet.</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
                <div key={asset.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 hover:border-primary/50 transition-all">
                    {/* Show thumbnail */}
                    <Image
                        src={asset.mlsKey || asset.originalKey}
                        alt={asset.originalFilename}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    
                    {/* Status overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <p className="text-xs font-medium truncate">{asset.originalFilename}</p>
                            <p className="text-xs opacity-75 capitalize">{asset.resizeType} resize</p>
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-2 right-2">
                        {asset.isProcessed ? (
                            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                <CheckCircle2 className="h-3 w-3" />
                                Ready
                            </div>
                        ) : (
                            <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                <Clock className="h-3 w-3" />
                                Staged
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

