import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Image as ImageIcon, Search, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default async function AllPhotosPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

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

      {/* Search (placeholder for future) */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search photos by job name..."
            className="pl-10"
            disabled
          />
        </div>
      </div>

      {/* Photos Grid */}
      {allAssets.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No photos yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Upload photos to your jobs to see them here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={asset.mlsKey || asset.originalKey}
                  alt={asset.originalFilename}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {asset.isPaid && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">Paid</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-medium truncate mb-1">
                  {asset.originalFilename}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {asset.jobName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {asset.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

