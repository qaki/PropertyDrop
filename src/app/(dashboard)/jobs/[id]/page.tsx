import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { UploadManager } from "./_components/upload-manager";
import { AssetList } from "./_components/asset-list";
import { CopyLinkButton } from "./_components/copy-link-button";
import { EditJobModal } from "./_components/edit-job-modal";
import { PhotoReorder } from "./_components/photo-reorder";
import { ArrowLeft, ExternalLink, CheckCircle2, AlertCircle, Image as ImageIcon, Mail, DollarSign, Share2 } from "lucide-react";

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/");

  const job = await db.job.findUnique({
    where: { id, photographerId: session.user.id },
    include: { assets: { orderBy: { order: 'asc' } } },
  });

  if (!job) notFound();

  const deliveryUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/deliver/${job.clientAccessHash}`;
  const hasPhotos = job.assets.length > 0;

  return (
    <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-full sm:flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 break-words">{job.name}</h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{job.agentEmail}</span>
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  ${(job.jobAmount / 100).toFixed(2)}
                </span>
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  {job.assets.length} photo{job.assets.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <EditJobModal 
                jobId={job.id}
                currentName={job.name}
                currentEmail={job.agentEmail}
                currentAmount={job.jobAmount}
                isPaid={job.isPaid}
              />
              
              <Badge
                variant={job.isPaid ? "default" : "secondary"}
                className={`text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 ${
                  job.isPaid
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {job.isPaid ? <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" /> : <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />}
                <span className="hidden sm:inline">{job.isPaid ? "PAID" : "AWAITING PAYMENT"}</span>
                <span className="sm:hidden">{job.isPaid ? "PAID" : "UNPAID"}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mobile: Share Card First */}
        <div className="lg:hidden space-y-4">
          {/* Share with Client Card */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Share2 className="h-5 w-5 text-primary" />
                Share with Client
              </CardTitle>
              <CardDescription className="text-sm">
                Send this link to your client to view and pay for photos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!hasPhotos && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Upload at least one photo before sharing with your client.
                  </AlertDescription>
                </Alert>
              )}

              {hasPhotos && (
                <>
                  <div className="bg-muted rounded-lg p-3 text-xs sm:text-sm font-mono break-all">
                    {deliveryUrl}
                  </div>

                  <div className="flex flex-col gap-2">
                    <CopyLinkButton url={deliveryUrl} />

                    <Link href={`/deliver/${job.clientAccessHash}`} target="_blank">
                      <Button className="w-full justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Preview Delivery Page
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Upload Manager (with resize selector & publish button) */}
          <UploadManager jobId={job.id} initialAssetCount={job.assets.length} />

          {/* Assets List */}
          {job.assets.length > 0 && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Uploaded Photos ({job.assets.length})</CardTitle>
                <CardDescription className="text-sm">
                  {job.assets.filter(a => a.isProcessed).length} of {job.assets.length} processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssetList assets={job.assets} />
              </CardContent>
            </Card>
          )}

          {/* Photo Reordering */}
          {job.assets.length > 1 && (
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <PhotoReorder jobId={job.id} initialAssets={job.assets} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop Sidebar - Delivery Info */}
        <div className="hidden lg:block space-y-6">
          {/* Share with Client Card */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                Share with Client
              </CardTitle>
              <CardDescription>
                Send this link to your client to view and pay for photos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!hasPhotos && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Upload at least one photo before sharing with your client.
                  </AlertDescription>
                </Alert>
              )}

              {hasPhotos && (
                <>
                  <div className="bg-muted rounded-lg p-3 text-sm font-mono break-all">
                    {deliveryUrl}
                  </div>

                  <div className="flex flex-col gap-2">
                    <CopyLinkButton url={deliveryUrl} />

                    <Link href={`/deliver/${job.clientAccessHash}`} target="_blank">
                      <Button className="w-full justify-start gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Preview Delivery Page
                      </Button>
                    </Link>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Next Steps:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Copy the link above</li>
                      <li>Send it to {job.agentEmail}</li>
                      <li>They'll pay ${(job.jobAmount / 100).toFixed(2)}</li>
                      <li>Photos unlock automatically</li>
                    </ol>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Job Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium capitalize">{job.status}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${(job.jobAmount / 100).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className={`font-medium ${job.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                  {job.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">
                  {job.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Photos:</span>
                <span className="font-medium">{job.assets.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                Photos are automatically resized to MLS standards (≤1280px) and compressed.
              </p>
              <a 
                href="mailto:support@property-drop.com" 
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Contact Support →
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Mobile: Job Details Card at Bottom */}
        <div className="lg:hidden space-y-4">
          {/* Job Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground block text-xs">Status</span>
                  <span className="font-medium capitalize">{job.status}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Amount</span>
                  <span className="font-medium">${(job.jobAmount / 100).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Payment</span>
                  <span className={`font-medium ${job.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                    {job.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Photos</span>
                  <span className="font-medium">{job.assets.length}</span>
                </div>
              </div>
              <Separator />
              <div>
                <span className="text-muted-foreground block text-xs">Created</span>
                <span className="font-medium">
                  {job.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-muted/50">
            <CardContent className="py-4 text-sm space-y-2">
              <p className="text-muted-foreground">
                Photos are automatically resized to MLS standards (≤1280px) and compressed.
              </p>
              <a 
                href="mailto:support@property-drop.com" 
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Contact Support →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
