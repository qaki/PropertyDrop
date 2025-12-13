"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyDescriptionProps {
  description: string;
}

export function CopyDescription({ description }: CopyDescriptionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      toast.success("Description copied to clipboard!");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy description");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Property Description</h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium text-sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Description
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Perfect for MLS listings and marketing materials
      </p>
    </div>
  );
}

