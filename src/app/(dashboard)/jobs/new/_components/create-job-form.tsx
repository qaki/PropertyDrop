"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "~/app/actions/job";

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
    <form action={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Job Name</label>
        <input
          name="name"
          required
          placeholder="e.g. 123 Main St"
          className="w-full border rounded p-2 bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Agent Email</label>
        <input
          name="agentEmail"
          type="email"
          required
          placeholder="agent@example.com"
          className="w-full border rounded p-2 bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Job Amount ($)</label>
        <input
          name="jobAmount"
          type="number"
          min="1"
          required
          defaultValue="150"
          className="w-full border rounded p-2 bg-background"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}

