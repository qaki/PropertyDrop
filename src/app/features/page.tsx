import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Image, Lock, CreditCard, Zap, Shield, Download, 
  CheckCircle2, Clock, Settings, Globe, FileType, 
  BarChart3, Mail, ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Features - PropertyDrop",
  description: "Discover all the powerful features that make PropertyDrop the best photo delivery platform for real estate photographers.",
};

export default function FeaturesPage() {
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
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/features" className="text-sm font-medium text-foreground">
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
            <Shield className="mr-2 h-4 w-4" />
            Powerful Features
          </Badge>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Everything You Need to <span className="text-primary">Deliver and Get Paid</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PropertyDrop combines payment protection, automatic MLS compliance, and professional delivery in one simple platform.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-muted-foreground">The essentials that set PropertyDrop apart</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Payment Protection</CardTitle>
                <CardDescription>
                  3-layer security ensures 100% payment before download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Visual watermarks (3 layers)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Right-click and drag prevention
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Server-side download enforcement
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Automatic unlock after payment
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>MLS Auto-Resizing</CardTitle>
                <CardDescription>
                  Automatic image processing in 5-10 seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Resize to ≤1280px width (MLS compliant)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Compress to {"<3MB"} (quality 80, mozjpeg)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Store both original + MLS versions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Upload up to 20 photos at once
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Bank-grade payment processing with Paddle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    All major credit cards accepted
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    PayPal and local methods
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Instant payment verification
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    PCI compliant (we don't store cards)
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  From upload to delivery in under 5 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Drag & drop upload interface
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Real-time upload progress
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Instant delivery link generation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    CDN-powered global delivery
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Flexible Downloads</CardTitle>
                <CardDescription>
                  Multiple download options for your clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Individual photo downloads
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Bulk ZIP download (all photos)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    MLS-compliant versions delivered
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Original filenames preserved
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Delivery</CardTitle>
                <CardDescription>
                  Branded delivery portal for your clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Clean, professional interface
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    No account needed (for buyers)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Mobile-friendly responsive design
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Secure unique links per job
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything Else You Need</h2>
            <p className="text-muted-foreground">Complete feature set for professional photographers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic emails to agents with delivery links. Payment confirmation notifications.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dashboard Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track all jobs, payments, and delivery status from one central dashboard.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileType className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">File Format Support</h3>
                <p className="text-sm text-muted-foreground">
                  JPEG, PNG, WebP supported. Files up to 16MB each. Automatic format optimization.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Indefinite Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Files stored forever. No deletion, no archiving. Access your old jobs anytime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Data Security</h3>
                <p className="text-sm text-muted-foreground">
                  Encrypted transfers, secure storage, GDPR compliant. Your data is safe with us.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Simple Setup</h3>
                <p className="text-sm text-muted-foreground">
                  No complicated configuration. Create account, upload photos, share link. That's it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-muted-foreground">For photographers who want the details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>File Upload Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max file size:</span>
                    <span className="font-semibold">16MB per file</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batch upload:</span>
                    <span className="font-semibold">20 files at once</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supported formats:</span>
                    <span className="font-semibold">JPEG, PNG, WebP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage per job:</span>
                    <span className="font-semibold">Unlimited</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>MLS Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max width:</span>
                    <span className="font-semibold">1280px (MLS standard)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target size:</span>
                    <span className="font-semibold">{"<3MB"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compression:</span>
                    <span className="font-semibold">JPEG quality 80 (mozjpeg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing time:</span>
                    <span className="font-semibold">5-10 seconds per image</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment gateway:</span>
                    <span className="font-semibold">Paddle</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verification:</span>
                    <span className="font-semibold">Instant (webhook)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security:</span>
                    <span className="font-semibold">PCI DSS Level 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unlock time:</span>
                    <span className="font-semibold">{"<1 second"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upload speed:</span>
                    <span className="font-semibold">Limited by your internet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CDN delivery:</span>
                    <span className="font-semibold">Global edge network</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="font-semibold">99.99% SLA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Page load:</span>
                    <span className="font-semibold">{"<2 seconds"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Try PropertyDrop?</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            All features included in your free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30">
                See Pricing
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

