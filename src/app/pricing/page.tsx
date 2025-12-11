import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle2, Image, ArrowRight, Zap } from "lucide-react";

export const metadata = {
  title: "Pricing - PropertyDrop",
  description: "Simple, transparent pricing. No credits, no limits, no surprises.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">
                Property<span className="text-primary">Drop</span>
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/pricing" className="text-sm font-medium text-foreground">
                Pricing
              </Link>
              <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6">
            <Zap className="mr-2 h-4 w-4" />
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            No Credits. No Limits. <span className="text-primary">No Surprises.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One simple price. Unlimited jobs, storage, and photos. Because you shouldn't have to calculate credits before every job.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                MOST POPULAR
              </div>
              <CardHeader className="text-center pt-12 pb-8">
                <CardTitle className="text-3xl mb-2">Professional Plan</CardTitle>
                <CardDescription className="text-lg">
                  Everything you need to run your real estate photography business
                </CardDescription>
                <div className="mt-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-extrabold tracking-tight">$69</span>
                    <span className="text-2xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Billed monthly • Cancel anytime</p>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Unlimited Jobs</p>
                      <p className="text-sm text-muted-foreground">Create as many delivery jobs as you need</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Unlimited Storage</p>
                      <p className="text-sm text-muted-foreground">No caps on photos or file sizes (up to 16MB per file)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Unlimited Photos Per Job</p>
                      <p className="text-sm text-muted-foreground">Upload up to 20 photos at once, no job limits</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Automatic MLS Resizing</p>
                      <p className="text-sm text-muted-foreground">Every photo automatically resized to ≤1280px and compressed to {"<3MB"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Payment Protection (Payment Gate)</p>
                      <p className="text-sm text-muted-foreground">3-layer security ensures 100% payment before download</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Secure Delivery Portal</p>
                      <p className="text-sm text-muted-foreground">Professional branded delivery links for your clients</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email Delivery Notifications</p>
                      <p className="text-sm text-muted-foreground">Automatic email to agents with delivery link</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ZIP Download Option</p>
                      <p className="text-sm text-muted-foreground">Clients can download all photos as one ZIP file</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Priority Support</p>
                      <p className="text-sm text-muted-foreground">Email support with 24-hour response time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Dashboard Analytics</p>
                      <p className="text-sm text-muted-foreground">Track jobs, payments, and delivery status</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 px-8 pb-8">
                <Link href="/signup" className="w-full">
                  <Button size="lg" className="w-full text-lg py-6">
                    <Zap className="mr-2 h-5 w-5" />
                    Start 14-Day Free Trial
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">
                  No credit card required • Cancel anytime • Full access
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Why flat-rate pricing instead of per-job or credits?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Because you shouldn't have to calculate credits or worry about surprise fees before every job. 
                    With flat-rate pricing, you can take on as many jobs as you want without worrying about costs. 
                    It's simple, predictable, and designed for busy professionals who want to focus on photography, not accounting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What happens after my 14-day free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After your trial ends, you'll be charged $69/month. You can cancel anytime before the trial ends and you won't be charged. 
                    No tricks, no hidden fees. We believe you'll love PropertyDrop enough to stay!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Are there really no limits on storage or jobs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Correct! Unlimited means unlimited. Create as many jobs as you need, upload as many photos as you want (up to 20 per batch), 
                    and store everything indefinitely. The only technical limit is 16MB per individual file upload, which is plenty for high-resolution photos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">How does the payment protection work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When you create a job and upload photos, we automatically apply 3-layer protection: visual watermarks, right-click prevention, 
                    and server-side download blocks. Your client can preview the photos but cannot download them until they complete payment through 
                    our secure Paddle gateway. Once payment is confirmed, the watermarks disappear and downloads are instantly enabled.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We use Paddle as our payment processor, which accepts all major credit cards (Visa, Mastercard, Amex, Discover), 
                    PayPal, and various local payment methods. Your clients can pay through Paddle's secure checkout page.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Can I cancel at any time?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! You can cancel your subscription at any time from your account settings. If you cancel, you'll retain access until the end 
                    of your current billing period. No cancellation fees, no questions asked.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What makes PropertyDrop different from competitors?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Three things: (1) <strong>Built-in payment protection</strong> - most competitors only offer manual invoicing. 
                    (2) <strong>Automatic MLS resizing</strong> - saves you hours of manual work every week. 
                    (3) <strong>Simple flat-rate pricing</strong> - no complicated credit systems or per-job fees. We built PropertyDrop specifically for 
                    real estate photographers who are tired of chasing payments and want a simple, professional solution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join hundreds of photographers who never worry about unpaid invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30">
                See All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">PropertyDrop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The professional photo delivery platform built for real estate photographers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-foreground transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@propertydrop.com</li>
                <li>© 2025 PropertyDrop</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

