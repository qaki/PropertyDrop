import { CreateJobForm } from "./_components/create-job-form";

export default function NewJobPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Job</h1>
      <CreateJobForm />
    </div>
  );
}

