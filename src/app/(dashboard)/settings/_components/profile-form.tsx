"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile } from "~/app/actions/profile";

export function ProfileForm({ defaultName, email }: { defaultName: string; email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message || "Profile updated!" });
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update profile" });
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={defaultName}
          placeholder="Your name"
          required
          minLength={2}
        />
        <p className="text-xs text-muted-foreground">
          This name appears on your client delivery pages
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed. Contact support if needed.
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

      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}

