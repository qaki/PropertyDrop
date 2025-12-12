import { db } from "~/server/db";
import { notFound, redirect } from "next/navigation";
import { createStripeCheckout } from "~/app/actions/stripe";
import { markJobAsPaid } from "~/app/actions/test-payment";
import { AssetGallery } from "./_components/asset-gallery";
import { DownloadAllButton } from "./_components/download-all-button";

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  
  const job = await db.job.findUnique({
    where: { clientAccessHash: hash },
    include: { assets: true },
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.name}</h1>
          <p className="text-lg text-gray-600">
            Prepared for: {job.agentEmail}
          </p>
          {!job.isPaid && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 inline-block text-left">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Payment is required to download full resolution assets.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="flex justify-center mb-12">
          {job.isPaid ? (
            <div className="bg-green-100 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                All Paid & Unlocked!
              </h3>
              <p className="text-green-700 mb-4">
                You can now download your compliant images.
              </p>
              <DownloadAllButton 
                assets={assetsWithUrls} 
                jobName={job.name}
              />
            </div>
          ) : (
             <div className="flex flex-col gap-4 items-center">
               {/* Stripe Checkout Button */}
               <form action={async () => {
                  "use server";
                  const result = await createStripeCheckout(hash);
                  if (result.success && result.url) {
                    redirect(result.url);
                  }
               }}>
                  <button
                      type="submit"
                      className="bg-indigo-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
                  >
                      💳 Unlock Photos - ${(job.jobAmount / 100).toFixed(2)}
                  </button>
               </form>
               
               {/* TEMPORARY: Manual "Mark as Paid" button for testing */}
               <form action={async () => {
                  "use server";
                  await markJobAsPaid(job.id);
                  const { revalidatePath } = await import("next/cache");
                  revalidatePath(`/deliver/${job.clientAccessHash}`);
               }}>
                  <button
                      type="submit"
                      className="bg-gray-500 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors"
                  >
                      🧪 [TEST] Mark as Paid (Skip Payment)
                  </button>
               </form>
             </div>
          )}
        </div>

        {/* Gallery Grid */}
        <AssetGallery assets={assetsWithUrls} isPaid={job.isPaid} />
      </div>
    </div>
  );
}
