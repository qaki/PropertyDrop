import { db } from "~/server/db";
import { notFound } from "next/navigation";
import { AssetGallery } from "./_components/asset-gallery";
import { DownloadAllButton } from "./_components/download-all-button";
import { PaymentButton } from "./_components/payment-button";
import { CopyDescription } from "./_components/copy-description";
import { MediaEmbeds } from "./_components/media-embeds";
import { 
  MapPin, Mail, CheckCircle2, Lock, Download, Camera, Shield, 
  Sparkles, CreditCard, Clock
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  
  const job = await db.job.findUnique({
    where: { clientAccessHash: hash },
    include: { 
      assets: { orderBy: { order: 'asc' } },
      photographer: {
        select: {
          name: true,
          email: true,
          companyName: true,
          companyLogo: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }
  
  const assetsWithUrls = job.assets.map((asset) => {
    return { 
      id: asset.id,
      previewUrl: `/api/asset/${asset.id}/preview`,
      downloadUrl: `/api/asset/${asset.id}`,
    };
  });

  const photoCount = job.assets.length;
  const priceFormatted = (job.jobAmount / 100).toFixed(2);

  const displayName = job.photographer.companyName || job.photographer.name || "PropertyDrop";
  const hasCustomLogo = job.photographer.companyLogo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {hasCustomLogo ? (
                <img 
                  src={job.photographer.companyLogo!} 
                  alt={displayName}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg sm:rounded-xl shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">{displayName}</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Professional Photo Delivery</p>
              </div>
            </div>
            {job.isPaid ? (
              <Badge className="bg-green-100 text-green-700 border-green-200 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-sm flex-shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Paid & Unlocked</span>
                <span className="sm:hidden">Unlocked</span>
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-sm flex-shrink-0">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Awaiting Payment</span>
                <span className="sm:hidden">Unpaid</span>
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Main Property Card */}
        <Card className="shadow-xl sm:shadow-2xl border-2 overflow-hidden mb-6 sm:mb-8">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Property Info */}
              <div className="p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">{job.name}</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">Property Photos</span>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm text-gray-500">Delivered to</span>
                      <p className="font-semibold text-sm sm:text-base truncate">{job.agentEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Package includes</span>
                      <p className="font-semibold text-sm sm:text-base">{photoCount} professional {photoCount === 1 ? 'photo' : 'photos'}</p>
                    </div>
                  </div>
                </div>

                {job.photographer && (
                  <div className="pt-4 sm:pt-6 border-t border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Photographed by</p>
                    <p className="font-bold text-base sm:text-lg text-gray-900">{displayName}</p>
                  </div>
                )}
              </div>

              {/* Right Column - Payment/Download Area */}
              <div className="p-5 sm:p-8 lg:p-10 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                {job.isPaid ? (
                  <div className="text-center space-y-4 sm:space-y-6 w-full max-w-sm">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-8 w-8 sm:h-12 sm:w-12 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Photos Unlocked!
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        All photos are now available for download in full resolution, MLS-compliant format.
                      </p>
                    </div>
                    <div className="pt-2">
                      <DownloadAllButton 
                        assets={assetsWithUrls} 
                        jobName={job.name}
                        deliverySize={job.deliverySize}
                        includeOriginals={job.includeOriginals}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 sm:space-y-6 w-full max-w-sm">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
                      <Lock className="h-8 w-8 sm:h-12 sm:w-12 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Unlock Your Photos
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Complete your secure payment to instantly unlock and download all {photoCount} high-resolution photos.
                      </p>
                    </div>
                    
                    <div className="bg-white border-2 border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-1">
                        ${priceFormatted}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 font-medium">One-time payment</div>
                    </div>

                    <PaymentButton hash={hash} />
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Shield className="h-3.5 w-3.5" />
                      Secure payment powered by Stripe
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Banner (for unpaid jobs) */}
        {!job.isPaid && (
          <Card className="shadow-lg border-2 mb-6 sm:mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {[
                  { icon: Camera, color: "blue", title: "High Resolution", desc: "Full-size, professional quality photos" },
                  { icon: Sparkles, color: "purple", title: "MLS Compliant", desc: "Automatically sized and optimized" },
                  { icon: Download, color: "green", title: "Instant Access", desc: "Download immediately after payment" },
                ].map((feature) => (
                  <div key={feature.title} className="p-4 sm:p-6 text-center">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 ${
                      feature.color === 'blue' ? 'bg-blue-100' :
                      feature.color === 'purple' ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      <feature.icon className={`h-5 w-5 sm:h-7 sm:w-7 ${
                        feature.color === 'blue' ? 'text-blue-600' :
                        feature.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                      }`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Property Description */}
        {job.description && (
          <CopyDescription description={job.description} />
        )}

        {/* Media Embeds */}
        <MediaEmbeds videoUrl={job.videoUrl} tourUrl={job.tourUrl} />

        {/* Gallery Section */}
        <Card className="shadow-xl border-2 overflow-hidden">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center shadow-md">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Photo Gallery</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-10 sm:ml-13">
                {job.isPaid 
                  ? 'Click any photo to view full resolution and download' 
                  : 'Preview photos • Full resolution available after payment'}
              </p>
            </div>
            <AssetGallery assets={assetsWithUrls} isPaid={job.isPaid} />
          </CardContent>
        </Card>
      </div>

      {/* Premium Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">
                Powered by <span className="font-semibold text-gray-900">PropertyDrop</span>
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Questions? Contact{' '}
              <a href={`mailto:${job.photographer?.email || job.agentEmail}`} className="text-primary hover:underline font-medium">
                {job.photographer?.email || job.agentEmail}
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield className="h-3.5 w-3.5" />
              Secure & Encrypted
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
