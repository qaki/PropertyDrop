"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Pencil, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { editJob } from "~/app/actions/jobs";

interface EditJobModalProps {
  jobId: string;
  currentName: string;
  currentEmail: string;
  currentAmount: number; // in cents
  isPaid: boolean;
}

export function EditJobModal({ jobId, currentName, currentEmail, currentAmount, isPaid }: EditJobModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await editJob(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message || "Job updated!" });
      setTimeout(() => {
        setOpen(false);
        window.location.reload(); // Refresh to show updated data
      }, 1500);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update job" });
    }

    setLoading(false);
  }

  if (isPaid) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Pencil className="h-4 w-4 mr-2" />
        Edit Job (Paid - Locked)
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Job Details</DialogTitle>
          <DialogDescription>
            Update the job name, client email, or price. Changes will be reflected on the delivery page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="jobId" value={jobId} />

          <div className="space-y-2">
            <Label htmlFor="name">Job Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={currentName}
              placeholder="e.g., 123 Main St"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentEmail">Client Email</Label>
            <Input
              id="agentEmail"
              name="agentEmail"
              type="email"
              defaultValue={currentEmail}
              placeholder="client@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobAmount">Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="jobAmount"
                name="jobAmount"
                type="number"
                step="0.01"
                min="0.01"
                defaultValue={(currentAmount / 100).toFixed(2)}
                placeholder="50.00"
                className="pl-7"
                required
                disabled={loading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This is what the client will pay to unlock the photos
            </p>
          </div>

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

          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

