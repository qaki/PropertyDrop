import { db } from "~/server/db";
import { notFound, redirect } from "next/navigation";
import { createStripeCheckout } from "~/app/actions/stripe";
import { AssetGallery } from "./_components/asset-gallery";
import { DownloadAllButton } from "./_components/download-all-button";
import { MapPin, Mail, CheckCircle2, Lock, Download, Image as ImageIcon, Shield } from "lucide-react";

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  
  const job = await db.job.findUnique({
    where: { clientAccessHash: hash },
    include: { 
      assets: true,
      photographer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }
  
  // Use secure proxy URLs that check payment status
  const assetsWithUrls = job.assets.map((asset) => {
    return { 
      id: asset.id,
      previewUrl: `/api/asset/${asset.id}/preview`, // Always accessible for preview
      downloadUrl: `/api/asset/${asset.id}`, // Only works if paid
    };
  });

  const photoCount = job.assets.length;
  const priceFormatted = (job.jobAmount / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PropertyDrop</h1>
                <p className="text-sm text-gray-600">Professional Photo Delivery</p>
              </div>
            </div>
            {job.isPaid && (
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Paid & Unlocked</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Info Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.name}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="font-medium">Property Address</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span>Delivered to: <span className="font-semibold">{job.agentEmail}</span></span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <ImageIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span><span className="font-semibold">{photoCount}</span> professional {photoCount === 1 ? 'photo' : 'photos'}</span>
                </div>
              </div>

              {job.photographer && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Photographed by</p>
                  <p className="font-semibold text-gray-900">{job.photographer.name}</p>
                </div>
              )}
            </div>

            {/* Right Column - Payment/Download Area */}
            <div className="flex items-center justify-center">
              {job.isPaid ? (
                <div className="text-center space-y-4 w-full">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Photos Unlocked!
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    All photos are now available for download in full resolution, MLS-compliant format.
                  </p>
                  <div className="pt-4">
                    <DownloadAllButton 
                      assets={assetsWithUrls} 
                      jobName={job.name}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 w-full">
                  <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Unlock Your Photos
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Complete your secure payment to instantly unlock and download all {photoCount} high-resolution photos.
                  </p>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 inline-block">
                    <div className="text-4xl font-bold text-indigo-600 mb-1">
                      ${priceFormatted}
                    </div>
                    <div className="text-sm text-indigo-700">One-time payment</div>
                  </div>

                  <form action={async () => {
                    "use server";
                    const result = await createStripeCheckout(hash);
                    if (result.success && result.url) {
                      redirect(result.url);
                    }
                  }} className="pt-4">
                    <button
                      type="submit"
                      className="w-full max-w-md mx-auto bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Shield className="h-5 w-5" />
                      Pay Now & Download Photos
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 max-w-md mx-auto pt-2">
                    🔒 Secure payment powered by Stripe • Industry-standard encryption
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Banner (for unpaid jobs) */}
        {!job.isPaid && (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">High Resolution</h4>
                <p className="text-sm text-gray-600">Full-size, professional quality photos</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">MLS Compliant</h4>
                <p className="text-sm text-gray-600">Automatically sized and optimized</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Instant Access</h4>
                <p className="text-sm text-gray-600">Download immediately after payment</p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Photo Gallery</h3>
            <p className="text-gray-600">
              {job.isPaid 
                ? 'Click any photo to view full resolution and download' 
                : 'Preview photos • Full resolution available after payment'}
            </p>
          </div>
          <AssetGallery assets={assetsWithUrls} isPaid={job.isPaid} />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 PropertyDrop • Professional Photo Delivery Platform</p>
            <p className="mt-1">Questions? Contact your photographer at {job.photographer?.email || job.agentEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
