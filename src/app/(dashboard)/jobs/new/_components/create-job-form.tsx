"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "~/app/actions/job";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { MapPin, Mail, DollarSign, FileText, Phone, User, Loader2, CheckCircle2 } from "lucide-react";

export function CreateJobForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createJob(formData);
    setLoading(false);

    if (result.success) {
      router.push(`/jobs/${result.data?.id}`);
    } else {
      setError(result.error ?? "Something went wrong");
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-2xl">Create New Job</CardTitle>
        <CardDescription>
          Fill in the property and client details to create a new photo delivery job
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={onSubmit} className="space-y-6">
          {/* Property Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <MapPin className="h-4 w-4" />
              Property Information
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                Property Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., 123 Main Street, Cityville, CA 12345"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Full property address for easy identification
              </p>
            </div>
          </div>

          {/* Client Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <User className="h-4 w-4" />
              Client Information
            </div>

            <div className="space-y-2">
              <Label htmlFor="agentEmail" className="flex items-center gap-2">
                Client Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="agentEmail"
                  name="agentEmail"
                  type="email"
                  required
                  placeholder="client@example.com"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The email where the delivery link will be sent
              </p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <DollarSign className="h-4 w-4" />
              Pricing
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobAmount" className="flex items-center gap-2">
                Job Amount (USD) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="jobAmount"
                  name="jobAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  defaultValue="150"
                  placeholder="150.00"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Total amount the client will pay to unlock the photos
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">What happens next?</p>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li>• Upload photos to this job</li>
                  <li>• Share the delivery link with your client</li>
                  <li>• Client pays the amount above to unlock all photos</li>
                  <li>• Payment goes directly to your Stripe account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Job...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Create Job
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

