"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { ResizeSelector } from "./resize-selector";
import { UploadDropzone } from "./upload-dropzone";
import { CheckCircle2, ImageIcon, Upload, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadManagerProps {
  jobId: string;
  initialAssetCount: number;
}

export function UploadManager({ jobId, initialAssetCount }: UploadManagerProps) {
  const router = useRouter();
  const [resizeType, setResizeType] = useState("mls");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAssets = initialAssetCount + uploadedCount;

  const handlePublish = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/jobs/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, resizeType }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to process images:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Choose Resize Type */}
      <ResizeSelector value={resizeType} onChange={setResizeType} />

      {/* Step 2: Upload Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Photos
          </CardTitle>
          <CardDescription>
            Drag and drop your photos here. They'll be processed using the{" "}
            <strong>
              {resizeType === "mls" && "MLS Standard"}
              {resizeType === "web" && "Web Optimized"}
              {resizeType === "full" && "Full Resolution"}
            </strong>{" "}
            setting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadDropzone 
            jobId={jobId} 
            resizeType={resizeType}
            onUploadComplete={() => {
              setUploadedCount(prev => prev + 1);
              router.refresh();
            }}
          />
        </CardContent>
      </Card>

      {/* Upload Status */}
      {totalAssets > 0 && (
        <Alert className="border-2 border-primary/20 bg-primary/5">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <AlertDescription className="ml-2">
            <strong>{totalAssets} photo{totalAssets !== 1 ? 's' : ''}</strong> ready for processing with{" "}
            <strong>
              {resizeType === "mls" && "MLS Standard"}
              {resizeType === "web" && "Web Optimized"}
              {resizeType === "full" && "Full Resolution"}
            </strong> settings
          </AlertDescription>
        </Alert>
      )}

      {/* Step 3: Publish Button */}
      {totalAssets > 0 && (
        <Card className="border-2 border-primary">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ready to Publish?</h3>
                  <p className="text-sm text-muted-foreground">
                    This will process all {totalAssets} photo{totalAssets !== 1 ? 's' : ''} and make them available on the delivery page
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full md:w-auto gap-2"
                onClick={handlePublish}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    Publish to Delivery Page
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

