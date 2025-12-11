"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Info } from "lucide-react";

const resizeOptions = [
  {
    value: "mls",
    label: "MLS Standard",
    description: "1280px max width, 80% quality",
    recommended: true,
  },
  {
    value: "web",
    label: "Web Optimized",
    description: "1920px max width, 85% quality",
    recommended: false,
  },
  {
    value: "full",
    label: "Full Resolution",
    description: "Original size, minimal compression",
    recommended: false,
  },
];

interface ResizeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResizeSelector({ value, onChange }: ResizeSelectorProps) {
  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="flex items-start gap-2 mb-4">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg">Choose Resize Option</h3>
            <p className="text-sm text-muted-foreground">
              Select how your photos should be processed before delivery
            </p>
          </div>
        </div>

        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {resizeOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                value === option.value
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-primary/50"
              }`}
              onClick={() => onChange(option.value)}
            >
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={option.value} className="cursor-pointer flex items-center gap-2">
                  <span className="font-semibold">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

