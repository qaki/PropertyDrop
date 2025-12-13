"use client";

import { Video, Box } from "lucide-react";

interface MediaEmbedsProps {
  videoUrl?: string | null;
  tourUrl?: string | null;
}

// Convert YouTube/Vimeo URLs to embeddable format
function getEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = '';
      
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1).split('?')[0];
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
      
      if (videoId) {
        // Add necessary parameters for embedding
        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
      }
    }
    
    // Matterport - handle both show and models URLs
    if (urlObj.hostname.includes('matterport.com') || urlObj.hostname.includes('my.matterport.com')) {
      // If it's already an embed URL, return as-is
      if (url.includes('/show/') || url.includes('&play=1')) {
        return url;
      }
      // Convert model URL to embed URL
      const modelMatch = url.match(/m=([^&]+)/);
      if (modelMatch) {
        return `https://my.matterport.com/show/?m=${modelMatch[1]}&play=1&qs=1`;
      }
    }
    
    // Return original URL if already embeddable or unknown format
    return url;
  } catch {
    return null;
  }
}

export function MediaEmbeds({ videoUrl, tourUrl }: MediaEmbedsProps) {
  const embedVideoUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const embedTourUrl = tourUrl ? getEmbedUrl(tourUrl) : null;

  if (!embedVideoUrl && !embedTourUrl) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Video Tour */}
      {embedVideoUrl && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Video className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Video Tour</h3>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={embedVideoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Property Video Tour"
            />
          </div>
        </div>
      )}

      {/* 3D Tour */}
      {embedTourUrl && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Box className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">3D Virtual Tour</h3>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={embedTourUrl}
              className="absolute inset-0 w-full h-full"
              allow="xr-spatial-tracking; fullscreen"
              allowFullScreen
              title="Property 3D Tour"
            />
          </div>
        </div>
      )}
    </div>
  );
}

