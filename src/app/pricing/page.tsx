import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle2, ArrowRight, Zap, Sparkles, Star, HelpCircle, Camera } from "lucide-react";
import { MarketingNav, MarketingFooter } from "~/components/marketing-nav";

export const metadata = {
  title: "Pricing - PropertyDrop",
  description: "Simple, transparent pricing. No credits, no limits, no surprises.",
};

export default function PricingPage() {
  const features = [
    { title: "Unlimited Jobs", desc: "Create as many delivery jobs as you need" },
    { title: "Unlimited Storage", desc: "No caps on photos or file sizes (up to 16MB per file)" },
    { title: "Unlimited Photos Per Job", desc: "Upload up to 20 photos at once, no job limits" },
    { title: "Automatic MLS Resizing", desc: "Every photo automatically resized to ≤1280px and compressed to <3MB" },
    { title: "Payment Protection", desc: "3-layer security ensures 100% payment before download" },
    { title: "Secure Delivery Portal", desc: "Professional branded delivery links for your clients" },
    { title: "Email Notifications", desc: "Automatic emails to agents with delivery link" },
    { title: "ZIP Download Option", desc: "Clients can download all photos as one ZIP file" },
    { title: "Priority Support", desc: "Email support with 24-hour response time" },
    { title: "Dashboard Analytics", desc: "Track jobs, payments, and delivery status" },
  ];

  const faqs = [
    {
      q: "Why flat-rate pricing instead of per-job or credits?",
      a: "Because you shouldn't have to calculate credits or worry about surprise fees before every job. With flat-rate pricing, you can take on as many jobs as you want without worrying about costs. It's simple, predictable, and designed for busy professionals who want to focus on photography, not accounting.",
    },
    {
      q: "What happens after my 14-day free trial?",
      a: "After your trial ends, you'll be charged $69/month. You can cancel anytime before the trial ends and you won't be charged. No tricks, no hidden fees. We believe you'll love PropertyDrop enough to stay!",
    },
    {
      q: "Are there really no limits on storage or jobs?",
      a: "Correct! Unlimited means unlimited. Create as many jobs as you need, upload as many photos as you want (up to 20 per batch), and store everything indefinitely. The only technical limit is 16MB per individual file upload.",
    },
    {
      q: "How does the payment protection work?",
      a: "When you create a job, we automatically apply 3-layer protection: visual watermarks, right-click prevention, and server-side download blocks. Your client can preview photos but cannot download until they complete payment through our secure Stripe gateway.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We use Stripe as our payment processor, which accepts all major credit cards (Visa, Mastercard, Amex, Discover), and various local payment methods. Your clients can pay through Stripe's secure checkout page.",
    },
    {
      q: "Can I cancel at any time?",
      a: "Yes! You can cancel your subscription at any time from your account settings. If you cancel, you'll retain access until the end of your current billing period. No cancellation fees, no questions asked.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav activePage="pricing" />

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge variant="secondary" className="mb-4 sm:mb-6 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border border-primary/20">
            <Star className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary fill-primary" />
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
            No Credits. No Limits.
            <br />
            <span className="text-gradient">No Surprises.</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            One simple price. Unlimited jobs, storage, and photos. Because you shouldn&apos;t have to calculate credits before every job.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-12 sm:py-20 -mt-4 sm:-mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary shadow-xl sm:shadow-2xl relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 gradient-primary" />
              
              {/* Popular badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <Badge className="bg-primary text-white px-2.5 sm:px-4 py-1 sm:py-1.5 font-semibold shadow-lg text-xs sm:text-sm">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
                  MOST POPULAR
                </Badge>
              </div>
              
              <CardHeader className="text-center pt-12 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-3xl mb-2">Professional Plan</CardTitle>
                <CardDescription className="text-sm sm:text-lg">
                  Everything you need to run your real estate photography business
                </CardDescription>
                <div className="mt-8 sm:mt-10">
                  <div className="flex items-baseline justify-center gap-1 sm:gap-2">
                    <span className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gradient">$69</span>
                    <span className="text-xl sm:text-2xl text-muted-foreground font-medium">/month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">Billed monthly • Cancel anytime</p>
                </div>
              </CardHeader>
              
              <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-xs sm:text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-8 pb-8 sm:pb-10 pt-4 border-t bg-muted/30">
                <Link href="/signup" className="w-full">
                  <Button size="lg" className="w-full text-base sm:text-lg py-6 sm:py-7 shadow-xl glow-primary font-bold">
                    <Zap className="mr-2 h-5 w-5" />
                    Start 14-Day Free Trial
                  </Button>
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    Cancel anytime
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    Full access
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 border-primary/30">
                <HelpCircle className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                FAQs
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-lg text-muted-foreground">Everything you need to know about PropertyDrop</p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.q} className="card-hover border-2">
                  <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
                    <CardTitle className="text-sm sm:text-lg font-semibold">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 lg:py-32 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Join hundreds of photographers who never worry about unpaid invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 font-bold shadow-xl hover:scale-105 transition-transform">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold">
                See All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
