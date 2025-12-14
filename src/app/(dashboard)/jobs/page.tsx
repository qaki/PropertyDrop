import Link from "next/link";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Plus, ExternalLink, Calendar, Mail, DollarSign, Image as ImageIcon, 
  TrendingUp, Clock, CheckCircle2, ArrowUpRight, Sparkles, Camera
} from "lucide-react";
import { checkSubscriptionStatus } from "~/lib/subscription";
import { SubscriptionGuard } from "../_components/subscription-guard";

export default async function JobsDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });
  
  if (!user) redirect("/");
  
  const subscriptionInfo = checkSubscriptionStatus(user);

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
    <SubscriptionGuard subscriptionInfo={subscriptionInfo}>
      <div className="container mx-auto py-8 px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">My Jobs</h1>
            <p className="text-muted-foreground text-lg">
              Manage your photo delivery jobs and track payments
            </p>
          </div>
          <Link href="/jobs/new">
            <Button size="lg" className="gap-2 shadow-lg glow-primary font-semibold">
              <Plus className="h-5 w-5" />
              Create New Job
            </Button>
          </Link>
        </div>

        {/* Dashboard Analytics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Total Revenue Earned */}
          <Card className="border-2 border-green-200/80 bg-gradient-to-br from-green-50 to-emerald-50/50 card-hover overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-200/30 rounded-full blur-2xl" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-green-700 font-medium">Total Revenue Earned</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-green-700">
                ${(totalRevenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <TrendingUp className="h-4 w-4" />
                {paidJobs} of {totalJobs} jobs paid ({conversionRate}%)
              </div>
            </CardContent>
          </Card>

          {/* Pending Revenue */}
          <Card className="border-2 border-amber-200/80 bg-gradient-to-br from-amber-50 to-yellow-50/50 card-hover overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-amber-700 font-medium">Pending Revenue</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-amber-700">
                ${(pendingRevenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                <Mail className="h-4 w-4" />
                {totalJobs - paidJobs} awaiting payment
              </div>
            </CardContent>
          </Card>

          {/* Total Assets Delivered */}
          <Card className="border-2 border-blue-200/80 bg-gradient-to-br from-blue-50 to-indigo-50/50 card-hover overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-blue-700 font-medium">Photos Delivered</CardDescription>
                <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-blue-700">
                {totalAssetsDelivered.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Processed and ready
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Jobs</h2>
          <Badge variant="secondary" className="font-medium">
            {jobs.length} total
          </Badge>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-5">
          {jobs.length === 0 ? (
            <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-xl glow-primary animate-float">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No jobs yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md text-lg">
                  Get started by creating your first job. Upload photos and share the delivery link with your clients.
                </p>
                <Link href="/jobs/new">
                  <Button size="lg" className="gap-2 shadow-lg glow-primary font-semibold">
                    <Sparkles className="h-5 w-5" />
                    Create Your First Job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="card-hover border-2 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl truncate">{job.name}</CardTitle>
                        <Badge
                          className={`flex-shrink-0 font-semibold ${
                            job.isPaid
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}
                        >
                          {job.isPaid ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              PAID
                            </>
                          ) : (
                            <>
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              UNPAID
                            </>
                          )}
                        </Badge>
                      </div>
                      <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {job.agentEmail}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {job.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          {job.assets.length} photo{job.assets.length !== 1 ? "s" : ""}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-2xl font-bold">
                        <DollarSign className="h-6 w-6 text-muted-foreground" />
                        {(job.jobAmount / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      {job.assets.slice(0, 4).map((asset, i) => (
                        <div
                          key={asset.id}
                          className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
                          style={{ marginLeft: i > 0 ? '-8px' : '0' }}
                        >
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                      {job.assets.length > 4 && (
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary" style={{ marginLeft: '-8px' }}>
                          +{job.assets.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm" className="font-medium group-hover:border-primary/50 transition-colors">
                          View Details
                          <ArrowUpRight className="h-4 w-4 ml-1.5 opacity-70" />
                        </Button>
                      </Link>
                      <Link
                        href={`/deliver/${job.clientAccessHash}`}
                        target="_blank"
                      >
                        <Button variant="default" size="sm" className="gap-2 font-medium shadow-sm">
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
    </SubscriptionGuard>
  );
}
