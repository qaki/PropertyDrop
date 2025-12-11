"use client";

import { UploadDropzone as UTDropzone } from "~/lib/uploadthing";

interface UploadDropzoneProps {
  jobId: string;
  resizeType: string;
  onUploadComplete?: () => void;
}

export function UploadDropzone({ jobId, resizeType, onUploadComplete }: UploadDropzoneProps) {
  return (
    <UTDropzone
      endpoint="imageUploader"
      input={{ jobId, resizeType }}
      onClientUploadComplete={(res) => {
        console.log("Files uploaded: ", res);
        if (onUploadComplete) onUploadComplete();
      }}
      onUploadError={(error: Error) => {
        alert(`Upload failed: ${error.message}`);
      }}
      appearance={{
        container: {
            border: "2px dashed #e5e7eb",
            background: "#f9fafb",
        },
        button: {
            background: "#4f46e5",
        }
      }}
    />
  );
}
