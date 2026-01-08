"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AlertTriangle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cancelSubscription } from "~/app/actions/subscription";
import { useRouter } from "next/navigation";

interface CancelSubscriptionDialogProps {
  subscriptionExpiresAt?: Date | null;
}

export function CancelSubscriptionDialog({ subscriptionExpiresAt }: CancelSubscriptionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);
    
    try {
      const result = await cancelSubscription();
      
      if (result.success) {
        toast.success(result.message || "Subscription cancelled successfully");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const expiryDate = subscriptionExpiresAt 
    ? new Date(subscriptionExpiresAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : "the end of your billing period";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
          <XCircle className="mr-2 h-4 w-4" />
          Cancel Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Cancel Subscription?</DialogTitle>
              <DialogDescription className="mt-1">
                This action will cancel your PropertyDrop subscription
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important: No Refund Policy
            </h4>
            <ul className="text-sm text-amber-800 space-y-1.5 ml-6 list-disc">
              <li>You will <strong>not receive a refund</strong> for the current billing period</li>
              <li>Your subscription remains active until <strong>{expiryDate}</strong></li>
              <li>After that date, you'll lose access to PropertyDrop features</li>
              <li>Your data will be retained for 30 days in case you resubscribe</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll lose access to:</h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-6 list-disc">
              <li>Creating new jobs and uploading photos</li>
              <li>Sharing delivery links with clients</li>
              <li>Receiving payments through the platform</li>
              <li>Access to your photo library and analytics</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Keep Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Yes, Cancel Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

