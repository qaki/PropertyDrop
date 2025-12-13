"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Search, ImageIcon } from "lucide-react";
import Image from "next/image";

type Asset = {
  id: string;
  originalKey: string;
  mlsKey: string | null;
  originalFilename: string;
  createdAt: Date;
  jobName: string;
  jobId: string;
  isPaid: boolean;
};

export function PhotosList({ assets }: { assets: Asset[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = assets.filter((asset) =>
    asset.jobName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search photos by job name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredAssets.length} photo{filteredAssets.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Photos Grid */}
      {filteredAssets.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No photos found" : "No photos yet"}
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {searchQuery 
                ? `No photos match "${searchQuery}". Try a different search.`
                : "Upload photos to your jobs to see them here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={asset.mlsKey || asset.originalKey}
                  alt={asset.originalFilename}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {asset.isPaid && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">Paid</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-medium truncate mb-1">
                  {asset.originalFilename}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {asset.jobName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {asset.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

