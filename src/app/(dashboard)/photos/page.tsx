import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Image as ImageIcon, Calendar, CheckCircle2 } from "lucide-react";
import { checkSubscriptionStatus } from "~/lib/subscription";
import { SubscriptionGuard } from "../_components/subscription-guard";
import { PhotosList } from "./_components/photos-list";

export default async function AllPhotosPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  // Check subscription status
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });
  
  if (!user) redirect("/");
  
  const subscriptionInfo = checkSubscriptionStatus(user);

  const jobs = await db.job.findMany({
    where: { photographerId: session.user.id },
    include: {
      assets: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const allAssets = jobs.flatMap(job => 
    job.assets.map(asset => ({
      ...asset,
      jobName: job.name,
      jobId: job.id,
      isPaid: job.isPaid,
    }))
  );

  const totalPhotos = allAssets.length;
  const totalJobs = jobs.length;
  const totalPaid = jobs.filter(j => j.isPaid).length;

  return (
    <SubscriptionGuard subscriptionInfo={subscriptionInfo}>
      <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">All Photos</h1>
        <p className="text-muted-foreground">
          View and manage all photos across your jobs
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Photos</CardDescription>
            <CardTitle className="text-4xl">{totalPhotos}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              Across {totalJobs} jobs
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Jobs</CardDescription>
            <CardTitle className="text-4xl">{totalJobs}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              All time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Paid Jobs</CardDescription>
            <CardTitle className="text-4xl">{totalPaid}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              {totalJobs > 0 ? Math.round((totalPaid / totalJobs) * 100) : 0}% conversion
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photos with Search */}
      <PhotosList assets={allAssets} />
    </div>
    </SubscriptionGuard>
  );
}

