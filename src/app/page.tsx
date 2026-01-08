import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  CheckCircle2, Lock, CreditCard, Unlock, Zap, Shield, TrendingUp, ArrowRight,
  Camera, Download, Star, Users, Sparkles, Play, Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/jobs");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation - Premium Glass Effect */}
      <nav className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between py-3 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg glow-primary">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                Property<span className="text-gradient">Drop</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-animated">
                Pricing
              </Link>
              <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-animated">
                Features
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="shadow-lg glow-primary font-semibold">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/signup">
                <Button size="sm" className="text-xs sm:text-sm">Try Free</Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link href="/pricing" className="text-lg font-medium hover:text-primary transition-colors">
                      Pricing
                    </Link>
                    <Link href="/features" className="text-lg font-medium hover:text-primary transition-colors">
                      Features
                    </Link>
                    <hr className="my-2" />
                    <Link href="/login">
                      <Button variant="outline" className="w-full font-medium">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full shadow-lg glow-primary font-semibold">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Gradient Background */}
      <section className="relative overflow-hidden gradient-hero pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-32 lg:pb-40">
        {/* Background decoration */}
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-5xl text-center animate-stagger">
            {/* Trust Badge */}
            <div>
              <Badge variant="secondary" className="mb-6 sm:mb-8 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border border-primary/20 shadow-sm">
                <Sparkles className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                Trusted by 500+ Real Estate Photographers
              </Badge>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.1]">
              Stop Chasing Payments.
              <br />
              <span className="text-gradient">Start Selling Photos.</span>
            </h1>
            
            <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
              The only photo delivery platform that <span className="font-semibold text-foreground">guarantees payment before download</span>. 
              Flat-rate pricing. Unlimited jobs. MLS-compliant.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 px-4 sm:px-0">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 h-auto shadow-xl glow-primary animate-pulse-glow font-bold">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your 14-Day Free Trial
                </Button>
              </Link>
              <Link href="/features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 h-auto border-2 font-semibold group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  See How It Works
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground px-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Setup in 2 minutes
              </div>
            </div>
          </div>

          {/* Hero Image / Product Preview */}
          <div className="mt-12 sm:mt-20 mx-auto max-w-5xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-xl sm:rounded-2xl border-2 border-primary/20 bg-card shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 sm:p-6 lg:p-10">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto shadow-xl border">
                  {/* Mock delivery card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Professional Photos</p>
                      <p className="font-bold text-lg sm:text-xl">123 Main Street</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1 sm:py-1.5 self-start sm:self-center">
                      <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
                      Awaiting Payment
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {[1,2,3].map((i) => (
                      <div key={i} className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-md sm:rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="h-5 w-5 sm:h-8 sm:w-8 text-slate-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6 shadow-lg glow-primary font-bold">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay $150.00 to Unlock Photos
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3 sm:mt-4 flex items-center justify-center gap-2">
                    <Shield className="h-3.5 w-3.5" />
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-y bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gradient">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Active Photographers</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gradient">$2M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Collected Payments</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gradient">99.9%</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Payment Success Rate</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gradient">10s</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">MLS Processing Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Assurance Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border-primary/30">
              <Shield className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              Payment Protection
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Protect Your Work.
              <br />
              <span className="text-gradient">Get Paid Every Time.</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-2">
              No more chasing invoices. No more unpaid work. Our 3-layer security ensures payment before download—guaranteed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 card-hover group">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Lock className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Lock Files</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Upload photos with automatic watermarks and access restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Visual watermarks (3 layers)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Right-click protection</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Server-side enforcement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2 - Featured */}
            <Card className="border-2 border-primary shadow-xl relative overflow-hidden card-hover sm:col-span-2 lg:col-span-1">
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-primary" />
              <CardHeader className="pb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg glow-primary">
                  <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Payment First</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Secure payment gateway with instant verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Bank-grade security (Stripe)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Instant payment verification</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>100% payment enforcement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 card-hover group sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Unlock className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Unlock Access</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Instant delivery after confirmed payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Watermarks removed</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Full-resolution downloads</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>MLS-compliant files</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simplicity Differentiator */}
      <section className="py-16 sm:py-24 lg:py-32 bg-muted/30 relative">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border-primary/30">
              <TrendingUp className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              Simple Pricing
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Flat-Rate, Unlimited.
              <br />
              <span className="text-gradient">Built for Busy Photographers.</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-2">
              No calculating credits. No per-job fees. No surprise charges. Just one simple price for unlimited everything.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl border-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold">Feature</th>
                      <th className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm font-semibold">
                        <div className="inline-flex items-center gap-1 sm:gap-2">
                          <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                          <span className="text-gradient">PropertyDrop</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm font-semibold text-muted-foreground">
                        Competitors
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-medium">Pricing Model</td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                        <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">$49/month flat</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm text-muted-foreground">
                        $0.50-$5 per job
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-medium">Jobs per Month</td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold text-xs">Unlimited</Badge>
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm text-muted-foreground">
                        Limited (10-50)
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-medium">Storage</td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold text-xs">Unlimited</Badge>
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm text-muted-foreground">
                        2-10GB caps
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-medium">Payment Gate</td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm text-muted-foreground">
                        Manual invoicing
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-medium">MLS Auto-Resize</td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm text-muted-foreground">
                        Manual or extra fee
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="text-center mt-8 sm:mt-10">
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="font-semibold group">
                  See Full Pricing Details
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MLS Compliance Feature */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border-primary/30">
              <Camera className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              Automatic Processing
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Eliminate Manual Resizing.
              <br />
              <span className="text-gradient">MLS-Compliant in 10 Seconds.</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-2">
              Upload any size photo. We automatically create MLS-compliant versions. Zero manual work.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* Before */}
              <Card className="bg-muted/50 border-2 border-dashed">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-base sm:text-lg">😓</span>
                    </div>
                    <CardTitle className="text-base sm:text-xl text-muted-foreground">Before (Manual Process)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5">
                  {[
                    { step: '1', title: 'Open Photoshop/Lightroom', desc: '5-10 minutes per batch' },
                    { step: '2', title: 'Manually resize each photo', desc: 'Check MLS dimensions' },
                    { step: '3', title: 'Compress and optimize', desc: 'Hope settings are right' },
                    { step: '4', title: 'Export and upload', desc: 'Repeat for every job' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 sm:gap-4">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base text-muted-foreground">{item.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* After */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary shadow-lg">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-xl">After (PropertyDrop)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5">
                  {[
                    { title: 'Drag & drop RAW files', desc: 'Up to 20 photos at once' },
                    { title: 'Automatic MLS resizing', desc: '≤1280px width, optimized' },
                    { title: 'Smart compression', desc: '<3MB, 80% quality (mozjpeg)' },
                    { title: 'Done in 5-10 seconds! ⚡', desc: 'Both versions stored automatically', highlight: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <p className={`font-medium text-sm sm:text-base ${item.highlight ? 'text-primary font-bold' : ''}`}>{item.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <Link href="/features">
                <Button size="lg" className="shadow-lg font-semibold group">
                  See All Features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 lg:py-32 bg-muted/30 relative">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border-primary/30">
              <Star className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary fill-primary" />
              Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Trusted by Professional Photographers
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground">
              Join hundreds of photographers who never chase payments anymore
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Mitchell',
                location: 'Miami, FL',
                initials: 'SM',
                quote: '"PropertyDrop cut my payment collection time from 3 weeks to instant. I\'ve never had a single unpaid invoice since switching. Absolute game changer."',
              },
              {
                name: 'James Chen',
                location: 'Austin, TX',
                initials: 'JC',
                quote: '"The MLS auto-resize alone saves me 2 hours per week. The payment protection is just icing on the cake. Best investment for my business."',
              },
              {
                name: 'Emily Parker',
                location: 'Seattle, WA',
                initials: 'EP',
                quote: '"Finally, a platform that puts photographers first. The flat pricing makes budgeting easy, and my clients love the professional delivery portal."',
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="card-hover bg-white border-2">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full gradient-primary flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-1 mt-2 sm:mt-3">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 lg:py-32 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white">
              Ready to Stop Chasing Payments?
            </h2>
            <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Start your 14-day free trial today. No credit card required.
              Join the photographers who never worry about unpaid invoices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 h-auto font-bold shadow-xl hover:scale-105 transition-transform">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 h-auto bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-white/70 mt-8 sm:mt-10">
              Questions? Contact us anytime at{' '}
              <a href="mailto:support@property-drop.com" className="underline hover:text-white transition-colors">
                support@property-drop.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl">PropertyDrop</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The professional photo delivery platform built for real estate photographers.
              </p>
              <div className="flex items-center gap-3 mt-4 sm:mt-6">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm text-muted-foreground">500+ photographers trust us</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm">
                <li>
                  <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Contact</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:support@property-drop.com" className="hover:text-foreground transition-colors underline-animated">
                    support@property-drop.com
                  </a>
                </li>
                <li className="pt-4">
                  <p className="text-xs">© 2025 PropertyDrop. All rights reserved.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
