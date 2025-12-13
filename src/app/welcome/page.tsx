import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Rocket, ArrowRight, CreditCard, Upload, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default async function WelcomePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to PropertyDrop Pro! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Your subscription is now active. Let's get you started!
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Quick Start Guide</h2>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                    Connect Your Stripe Account
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Set up your Stripe Connect account to receive payments directly from clients.
                  </p>
                  <Link href="/settings">
                    <Button variant="outline" size="sm">
                      Go to Settings
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-indigo-600" />
                    Create Your First Job
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Upload photos for your first property and set your price.
                  </p>
                  <Link href="/jobs/new">
                    <Button variant="outline" size="sm">
                      Create Job
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Send className="h-5 w-5 text-indigo-600" />
                    Share with Your Client
                  </h3>
                  <p className="text-gray-600">
                    Copy the delivery link and send it to your client. They'll pay to unlock the photos!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Highlight */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Uploads</h3>
              <p className="text-sm text-gray-600">
                No limits on photos or jobs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Direct Payments</h3>
              <p className="text-sm text-gray-600">
                100% of client payments go to you
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">MLS Compliant</h3>
              <p className="text-sm text-gray-600">
                Automatic photo resizing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/jobs">
            <Button size="lg" className="gap-2">
              Go to Dashboard
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Need help? Check out our{" "}
            <a href="mailto:support@property-drop.com" className="text-indigo-600 hover:underline">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

