"use client";

import { useState, useTransition } from "react";
import { updateBranding } from "~/app/actions/profile";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Briefcase, Upload, X } from "lucide-react";
import { UploadButton } from "~/lib/uploadthing";

interface BrandingFormProps {
  currentCompanyName?: string | null;
  currentCompanyLogo?: string | null;
}

export function BrandingForm({ currentCompanyName, currentCompanyLogo }: BrandingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [companyName, setCompanyName] = useState(currentCompanyName || "");
  const [logoUrl, setLogoUrl] = useState(currentCompanyLogo || "");
  const [isUploading, setIsUploading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyLogo", logoUrl);

    startTransition(async () => {
      const result = await updateBranding(formData);
      if (result.success) {
        toast.success("Branding updated successfully!");
      } else {
        toast.error(result.error || "Failed to update branding");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Company Name
        </Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Your Photography Business"
          required
        />
        <p className="text-xs text-muted-foreground">
          This will appear on your client delivery pages instead of "PropertyDrop"
        </p>
      </div>

      {/* Company Logo */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Company Logo
        </Label>
        
        {logoUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
              <img
                src={logoUrl}
                alt="Company logo"
                className="h-16 w-16 object-contain rounded border bg-white"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Logo uploaded</p>
                <p className="text-xs text-muted-foreground truncate max-w-xs">
                  {logoUrl}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLogoUrl("")}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <UploadButton
              endpoint="profilePhotoUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setLogoUrl(res[0].url);
                  toast.success("Logo uploaded!");
                }
                setIsUploading(false);
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
                setIsUploading(false);
              }}
              onUploadBegin={() => {
                setIsUploading(true);
              }}
              appearance={{
                button: "bg-primary text-primary-foreground hover:bg-primary/90 ut-uploading:bg-primary/50",
                allowedContent: "text-xs text-muted-foreground"
              }}
            />
            <p className="text-xs text-muted-foreground mt-2">
              PNG, JPG, or SVG up to 4MB
            </p>
          </div>
        )}
      </div>

      {/* Preview */}
      {(companyName || logoUrl) && (
        <div className="border rounded-lg p-4 bg-muted/30">
          <p className="text-sm font-medium mb-3">Preview</p>
          <div className="flex items-center gap-3 bg-white rounded p-3 border">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{companyName || "Your Company"}</p>
              <p className="text-xs text-gray-600">Professional Photo Delivery</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending || isUploading || !companyName}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Branding"
        )}
      </Button>
    </form>
  );
}

