import Link from "next/link";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Plus, ExternalLink, Calendar, Mail, DollarSign, Image as ImageIcon, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default async function JobsDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const jobs = await db.job.findMany({
    where: { photographerId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      assets: {
        select: { id: true, isProcessed: true },
      },
    },
  });

  // Calculate Analytics
  const totalRevenue = jobs
    .filter(job => job.isPaid)
    .reduce((sum, job) => sum + job.jobAmount, 0);
  
  const pendingRevenue = jobs
    .filter(job => !job.isPaid)
    .reduce((sum, job) => sum + job.jobAmount, 0);
  
  const totalAssetsDelivered = jobs
    .flatMap(job => job.assets)
    .filter(asset => asset.isProcessed).length;
  
  const totalJobs = jobs.length;
  const paidJobs = jobs.filter(job => job.isPaid).length;
  const conversionRate = totalJobs > 0 ? Math.round((paidJobs / totalJobs) * 100) : 0;

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your photo delivery jobs and track payments
          </p>
        </div>
        <Link href="/jobs/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Job
          </Button>
        </Link>
      </div>

      {/* Dashboard Analytics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue Earned */}
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-green-700">Total Revenue Earned</CardDescription>
              <div className="h-10 w-10 rounded-full bg-green-600/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-green-700">
              ${(totalRevenue / 100).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              {paidJobs} of {totalJobs} jobs paid ({conversionRate}%)
            </div>
          </CardContent>
        </Card>

        {/* Pending Revenue */}
        <Card className="border-2 border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-yellow-700">Pending Revenue</CardDescription>
              <div className="h-10 w-10 rounded-full bg-yellow-600/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-yellow-700">
              ${(pendingRevenue / 100).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <Mail className="h-4 w-4" />
              {totalJobs - paidJobs} unpaid job{totalJobs - paidJobs !== 1 ? 's' : ''}
            </div>
          </CardContent>
        </Card>

        {/* Total Assets Delivered */}
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-blue-700">Assets Delivered</CardDescription>
              <div className="h-10 w-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-blue-700">
              {totalAssetsDelivered}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <CheckCircle2 className="h-4 w-4" />
              Processed and ready
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6">
        {jobs.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Get started by creating your first job. Upload photos and share the delivery link with your clients.
              </p>
              <Link href="/jobs/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.name}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {job.agentEmail}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {job.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge
                      variant={job.isPaid ? "default" : "secondary"}
                      className={
                        job.isPaid
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }
                    >
                      {job.isPaid ? "✓ PAID" : "⏳ UNPAID"}
                    </Badge>
                    <div className="flex items-center gap-2 text-lg font-bold">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      {(job.jobAmount / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>{job.assets.length} photo{job.assets.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Link
                      href={`/deliver/${job.clientAccessHash}`}
                      target="_blank"
                    >
                      <Button variant="default" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Delivery Page
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

