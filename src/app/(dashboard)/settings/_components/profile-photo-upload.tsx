"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { UploadButton } from "~/lib/uploadthing";
import { updateProfilePhoto } from "~/app/actions/profile";
import { useRouter } from "next/navigation";

export function ProfilePhotoUpload({ onUploadComplete }: { onUploadComplete?: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  return (
    <div className="space-y-3">
      <UploadButton
        endpoint="profilePhotoUploader"
        onClientUploadComplete={async (res) => {
          if (res && res[0]?.url) {
            // Save the photo URL to the database
            const result = await updateProfilePhoto(res[0].url);
            
            setIsUploading(false);
            if (result.success) {
              setMessage({ type: "success", text: "Profile photo updated successfully!" });
              onUploadComplete?.(res[0].url);
              router.refresh();
            } else {
              setMessage({ type: "error", text: result.error || "Failed to update photo" });
            }
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          setMessage({ type: "error", text: error.message || "Upload failed" });
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setMessage(null);
        }}
        appearance={{
          button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-lg shadow-sm",
          allowedContent: "text-xs text-muted-foreground",
        }}
      />

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading...
        </div>
      )}

      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
          message.type === "success" 
            ? "bg-green-50 text-green-900 border border-green-200" 
            : "bg-red-50 text-red-900 border border-red-200"
        }`}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        JPG, PNG or GIF. Max size 4MB. Your photo will appear throughout the app.
      </p>
    </div>
  );
}

