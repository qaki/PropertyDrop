import { CreateJobForm } from "./_components/create-job-form";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { checkSubscriptionStatus } from "~/lib/subscription";
import { SubscriptionGuard } from "../../_components/subscription-guard";

export default async function NewJobPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  // Check subscription status
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });
  
  if (!user) redirect("/");
  
  const subscriptionInfo = checkSubscriptionStatus(user);

  return (
    <SubscriptionGuard subscriptionInfo={subscriptionInfo}>
      <div className="container mx-auto max-w-2xl py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Job</h1>
        <CreateJobForm />
      </div>
    </SubscriptionGuard>
  );
}

