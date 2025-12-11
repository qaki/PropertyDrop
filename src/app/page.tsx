import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle2, Lock, CreditCard, Unlock, Image, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/jobs");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">
                Property<span className="text-primary">Drop</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-20 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Zap className="mr-2 h-4 w-4 inline" />
              Revenue Assurance for Real Estate Photographers
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
              Stop Chasing Payments.
              <br />
              <span className="text-primary">Start Selling Photos.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              PropertyDrop is the only photo delivery platform that <span className="font-semibold text-foreground">guarantees payment before download</span>. Flat-rate, unlimited, and MLS-compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6 h-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Free 14-Day Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                  See Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • Cancel anytime • Join 500+ photographers
            </p>
          </div>

          {/* Hero Image / Demo Screenshot */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-12 text-center">
                <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Professional Photos</p>
                      <p className="font-bold text-lg">123 Main Street</p>
                    </div>
                    <Badge variant="destructive" className="px-3 py-1">
                      <Lock className="h-3 w-3 mr-1" />
                      Unpaid
                    </Badge>
                  </div>
                  <Button size="lg" className="w-full text-lg py-6">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay $150.00 to Unlock Photos
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">Secure payment powered by Paddle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Assurance Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="mr-2 h-4 w-4" />
              Payment Protection
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Protect Your Work. <span className="text-primary">Guaranteed Payment, Every Time.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No more chasing invoices. No more unpaid work. Our 3-layer security ensures payment before download.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lock Files</CardTitle>
                <CardDescription>
                  Upload photos with automatic watermarks and access restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Visual watermarks (3 layers)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Right-click protection
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Server-side enforcement
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Payment First</CardTitle>
                <CardDescription>
                  Secure payment gateway with instant verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Bank-grade security (Paddle)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Instant payment verification
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    100% payment enforcement
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Unlock className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Unlock Access</CardTitle>
                <CardDescription>
                  Instant delivery after confirmed payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Watermarks removed
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    Full-resolution downloads
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    MLS-compliant files
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simplicity Differentiator */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <TrendingUp className="mr-2 h-4 w-4" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Flat-Rate, Unlimited. <span className="text-primary">Built for Busy Photographers.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No calculating credits. No per-job fees. No surprise charges. Just one simple price.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        <span className="text-primary">PropertyDrop</span>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Competitors
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Pricing Model</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-primary">$69/month flat-rate</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        $0.50-$5 per job or credit system
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Jobs per Month</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="default">Unlimited</Badge>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        Limited by plan (10-50)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Storage</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="default">Unlimited</Badge>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        2-10GB caps
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">Payment Gate</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        Manual invoicing only
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium">MLS Auto-Resize</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        Manual or extra fee
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="text-center mt-8">
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  See Full Pricing Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MLS Compliance Feature */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Image className="mr-2 h-4 w-4" />
              Automatic Processing
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Eliminate Manual Resizing. <span className="text-primary">MLS-Compliant in 10 Seconds.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload any size photo. Our system automatically creates MLS-compliant versions. No manual work required.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="bg-muted/50 border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Before (Manual Process)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 text-destructive rounded-full p-1 mt-1">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Open Photoshop/Lightroom</p>
                        <p className="text-sm text-muted-foreground">5-10 minutes per batch</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 text-destructive rounded-full p-1 mt-1">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Manually resize each photo</p>
                        <p className="text-sm text-muted-foreground">Check MLS dimensions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 text-destructive rounded-full p-1 mt-1">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Compress and optimize</p>
                        <p className="text-sm text-muted-foreground">Hope you got settings right</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 text-destructive rounded-full p-1 mt-1">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Export and upload</p>
                        <p className="text-sm text-muted-foreground">Repeat for every job</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-primary/5 border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl">After (PropertyDrop)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Drag & drop RAW files</p>
                        <p className="text-sm text-muted-foreground">Up to 20 photos at once</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Automatic MLS resizing</p>
                        <p className="text-sm text-muted-foreground">≤1280px width, optimized</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Smart compression</p>
                        <p className="text-sm text-muted-foreground">{"<3MB, 80% quality (mozjpeg)"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium font-bold text-primary">Done in 5-10 seconds! ⚡</p>
                        <p className="text-sm text-muted-foreground">Both versions stored automatically</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/features">
                <Button size="lg">
                  See All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Trusted by Professional Photographers
            </h2>
            <p className="text-muted-foreground">
              Join hundreds of photographers who never chase payments anymore
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Miami, FL</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "PropertyDrop cut my payment collection time from 3 weeks to instant. I've never had a single unpaid invoice since switching. Absolute game changer."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    JC
                  </div>
                  <div>
                    <p className="font-semibold">James Chen</p>
                    <p className="text-sm text-muted-foreground">Austin, TX</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "The MLS auto-resize alone saves me 2 hours per week. The payment protection is just icing on the cake. Best investment I've made for my business."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    EP
                  </div>
                  <div>
                    <p className="font-semibold">Emily Parker</p>
                    <p className="text-sm text-muted-foreground">Seattle, WA</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Finally, a platform that puts photographers first. The flat pricing makes budgeting so easy, and my clients love the professional delivery portal."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Ready to Stop Chasing Payments?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Start your 14-day free trial today. No credit card required.
            <br />
            Join the photographers who never worry about unpaid invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 h-auto">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/70 mt-8">
            Questions? Contact us anytime at support@propertydrop.com
          </p>
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
