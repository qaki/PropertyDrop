import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Lock, CreditCard, Zap, Shield, Download, 
  CheckCircle2, Clock, Settings, Globe, FileType, 
  BarChart3, Mail, ArrowRight, Camera, Sparkles
} from "lucide-react";
import { MarketingNav, MarketingFooter } from "~/components/marketing-nav";

export const metadata = {
  title: "Features - PropertyDrop",
  description: "Discover all the powerful features that make PropertyDrop the best photo delivery platform for real estate photographers.",
};

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Lock,
      title: "Payment Protection",
      desc: "3-layer security ensures 100% payment before download",
      color: "primary",
      items: [
        "Visual watermarks (3 layers)",
        "Right-click and drag prevention",
        "Server-side download enforcement",
        "Automatic unlock after payment",
      ],
    },
    {
      icon: Camera,
      title: "MLS Auto-Resizing",
      desc: "Automatic image processing in 5-10 seconds",
      color: "blue",
      items: [
        "Resize to ≤1280px width (MLS compliant)",
        "Compress to <3MB (quality 80, mozjpeg)",
        "Store both original + MLS versions",
        "Upload up to 20 photos at once",
      ],
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      desc: "Bank-grade payment processing with Stripe",
      color: "green",
      items: [
        "All major credit cards accepted",
        "PayPal and local methods",
        "Instant payment verification",
        "PCI compliant (we don't store cards)",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "From upload to delivery in under 5 minutes",
      color: "amber",
      items: [
        "Drag & drop upload interface",
        "Real-time upload progress",
        "Instant delivery link generation",
        "CDN-powered global delivery",
      ],
    },
    {
      icon: Download,
      title: "Flexible Downloads",
      desc: "Multiple download options for your clients",
      color: "purple",
      items: [
        "Individual photo downloads",
        "Bulk ZIP download (all photos)",
        "MLS-compliant versions delivered",
        "Original filenames preserved",
      ],
    },
    {
      icon: Globe,
      title: "Professional Delivery",
      desc: "Branded delivery portal for your clients",
      color: "indigo",
      items: [
        "Clean, professional interface",
        "No account needed (for buyers)",
        "Mobile-friendly responsive design",
        "Secure unique links per job",
      ],
    },
  ];

  const additionalFeatures = [
    { icon: Mail, title: "Email Notifications", desc: "Automatic emails to agents with delivery links. Payment confirmation notifications." },
    { icon: BarChart3, title: "Dashboard Analytics", desc: "Track all jobs, payments, and delivery status from one central dashboard." },
    { icon: FileType, title: "File Format Support", desc: "JPEG, PNG, WebP supported. Files up to 16MB each. Automatic format optimization." },
    { icon: Clock, title: "Indefinite Storage", desc: "Files stored forever. No deletion, no archiving. Access your old jobs anytime." },
    { icon: Shield, title: "Data Security", desc: "Encrypted transfers, secure storage, GDPR compliant. Your data is safe with us." },
    { icon: Settings, title: "Simple Setup", desc: "No complicated configuration. Create account, upload photos, share link. That's it." },
  ];

  const specs = [
    {
      title: "File Upload Limits",
      items: [
        { label: "Max file size", value: "16MB per file" },
        { label: "Batch upload", value: "20 files at once" },
        { label: "Supported formats", value: "JPEG, PNG, WebP" },
        { label: "Storage per job", value: "Unlimited" },
      ],
    },
    {
      title: "MLS Processing",
      items: [
        { label: "Max width", value: "1280px (MLS standard)" },
        { label: "Target size", value: "<3MB" },
        { label: "Compression", value: "JPEG quality 80 (mozjpeg)" },
        { label: "Processing time", value: "5-10 seconds per image" },
      ],
    },
    {
      title: "Payment Processing",
      items: [
        { label: "Payment gateway", value: "Stripe" },
        { label: "Verification", value: "Instant (webhook)" },
        { label: "Security", value: "PCI DSS Level 1" },
        { label: "Unlock time", value: "<1 second" },
      ],
    },
    {
      title: "Performance",
      items: [
        { label: "Upload speed", value: "Limited by your internet" },
        { label: "CDN delivery", value: "Global edge network" },
        { label: "Uptime", value: "99.99% SLA" },
        { label: "Page load", value: "<2 seconds" },
      ],
    },
  ];

  const getColorClasses = (color: string): { bg: string; icon: string } => {
    const colorMap: Record<string, { bg: string; icon: string }> = {
      primary: { bg: "bg-primary/10", icon: "text-primary" },
      blue: { bg: "bg-blue-100", icon: "text-blue-600" },
      green: { bg: "bg-green-100", icon: "text-green-600" },
      amber: { bg: "bg-amber-100", icon: "text-amber-600" },
      purple: { bg: "bg-purple-100", icon: "text-purple-600" },
      indigo: { bg: "bg-indigo-100", icon: "text-indigo-600" },
    };
    return colorMap[color] ?? { bg: "bg-primary/10", icon: "text-primary" };
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav activePage="features" />

      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge variant="secondary" className="mb-6 px-5 py-2.5 text-sm font-semibold border border-primary/20">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Powerful Features
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Everything You Need to
            <br />
            <span className="text-gradient">Deliver and Get Paid</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PropertyDrop combines payment protection, automatic MLS compliance, and professional delivery in one simple platform.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/30">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              Core Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">The essentials that set PropertyDrop apart</h2>
            <p className="text-lg text-muted-foreground">Everything you need to protect your work and get paid</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {coreFeatures.map((feature) => {
              const colors = getColorClasses(feature.color);
              return (
                <Card key={feature.title} className="border-2 hover:border-primary/50 transition-all duration-300 card-hover group">
                  <CardHeader className="pb-4">
                    <div className={`h-14 w-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-7 w-7 ${colors.icon}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything Else You Need</h2>
            <p className="text-lg text-muted-foreground">Complete feature set for professional photographers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/30">
                <Settings className="mr-2 h-4 w-4 text-primary" />
                Technical Details
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-lg text-muted-foreground">For photographers who want the details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {specs.map((spec) => (
                <Card key={spec.title} className="border-2 card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{spec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {spec.items.map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Ready to Try PropertyDrop?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            All features included in your free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-7 font-bold shadow-xl hover:scale-105 transition-transform">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold">
                See Pricing
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
