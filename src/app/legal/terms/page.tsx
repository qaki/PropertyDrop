import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Image } from "lucide-react";

export const metadata = {
  title: "Terms of Service - PropertyDrop",
  description: "Terms of Service for PropertyDrop photo delivery platform.",
};

export default function TermsPage() {
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

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 10, 2025</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using PropertyDrop ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              PropertyDrop provides a photo delivery and payment processing platform for real estate photographers and their clients. The Service includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Photo upload and storage</li>
              <li>Automatic image resizing and optimization</li>
              <li>Payment processing integration</li>
              <li>Secure photo delivery to end clients</li>
              <li>Dashboard and analytics tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To use PropertyDrop, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Subscription Billing:</strong> PropertyDrop charges a monthly subscription fee of $69/month (subject to change with 30 days notice). Subscriptions are billed on a recurring monthly basis.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Free Trial:</strong> New users may be offered a 14-day free trial. No credit card is required during the trial. After the trial period ends, you will be charged the monthly subscription fee unless you cancel before the trial ends.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Payment Processing:</strong> All payments are processed securely through Paddle.com. PropertyDrop does not store credit card information.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Cancellation:</strong> You may cancel your subscription at any time from your account settings. Upon cancellation, you will retain access to the Service until the end of your current billing period.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Refunds:</strong> Refunds are provided at our sole discretion. No refunds will be provided for partial months of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Content and Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Your Content:</strong> You retain all rights to the photos and content you upload to PropertyDrop. By uploading content, you grant us a limited license to store, display, and deliver your content as necessary to provide the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Our Intellectual Property:</strong> The Service, including its original content, features, and functionality, is owned by PropertyDrop and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Acceptable Use Policy</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Upload illegal, harmful, or infringing content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for any commercial purpose beyond its intended use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Data Storage and Deletion</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Storage:</strong> All uploaded content is stored indefinitely while your account is active and in good standing.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Account Deletion:</strong> If you delete your account or your subscription ends, your content may be retained for up to 30 days for recovery purposes, after which it will be permanently deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Service Availability</h2>
            <p className="text-muted-foreground mb-4">
              We strive to provide 99.99% uptime but do not guarantee uninterrupted access to the Service. We may modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PropertyDrop SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-muted-foreground mb-4">
              Our total liability to you for any damages shall not exceed the amount you paid us in the twelve (12) months prior to the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground mb-4">
              You agree to indemnify and hold harmless PropertyDrop, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Modifications to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Email:</strong> support@propertydrop.com
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 mt-auto">
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
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/legal/terms" className="hover:text-foreground transition-colors font-semibold">
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

