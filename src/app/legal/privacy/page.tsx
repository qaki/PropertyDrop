import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Image } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - PropertyDrop",
  description: "Privacy Policy for PropertyDrop photo delivery platform.",
};

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 10, 2025</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              PropertyDrop ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our photo delivery service ("Service").
            </p>
            <p className="text-muted-foreground mb-4">
              By using PropertyDrop, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-muted-foreground mb-4">
              We collect information you directly provide to us, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Account Information:</strong> Name, email address, password</li>
              <li><strong>Job Information:</strong> Property addresses, agent emails, job amounts</li>
              <li><strong>Photos:</strong> Images you upload through the Service</li>
              <li><strong>Payment Information:</strong> Billing information (processed securely by Paddle)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">
              When you use the Service, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on pages</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              <li><strong>Cookies:</strong> Small files stored on your device (see Section 8)</li>
              <li><strong>Analytics:</strong> Aggregate usage statistics and performance metrics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Provide the Service:</strong> Store and deliver photos, process payments</li>
              <li><strong>Account Management:</strong> Create and maintain your account</li>
              <li><strong>Communication:</strong> Send delivery links, payment confirmations, support responses</li>
              <li><strong>Improvement:</strong> Analyze usage to improve features and performance</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
              <li><strong>Marketing:</strong> Send promotional emails (you can opt out anytime)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. How We Share Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Service Providers:</strong> Third parties who help us operate the Service (hosting, payment processing, email delivery)</li>
              <li><strong>Payment Processors:</strong> Paddle.com processes all payments and may collect billing information</li>
              <li><strong>Your Clients:</strong> Photos and job details are shared with recipients you specify</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              PropertyDrop uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Paddle:</strong> Payment processing (PCI DSS compliant)</li>
              <li><strong>UploadThing:</strong> File storage and CDN delivery</li>
              <li><strong>Neon:</strong> Database hosting (PostgreSQL)</li>
              <li><strong>Vercel:</strong> Application hosting and deployment</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Each third party has their own privacy policy governing their use of your information. We recommend reviewing their policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Encryption:</strong> All data transmitted via HTTPS/TLS encryption</li>
              <li><strong>Password Protection:</strong> Passwords are hashed using bcrypt</li>
              <li><strong>Secure Storage:</strong> Files stored with access controls and encryption at rest</li>
              <li><strong>Payment Security:</strong> We never store credit card information (handled by Paddle)</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              However, no method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your information for as long as your account is active or as needed to provide the Service:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>Photos:</strong> Stored indefinitely while your account is active</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for tax and legal purposes</li>
              <li><strong>After Account Deletion:</strong> Data deleted within 30 days (except as required by law)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Session Management:</strong> Keep you logged in</li>
              <li><strong>Preferences:</strong> Remember your settings</li>
              <li><strong>Analytics:</strong> Understand how you use the Service</li>
              <li><strong>Security:</strong> Detect and prevent fraud</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You can configure your browser to refuse cookies, but some features may not work properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              To exercise these rights, contact us at support@propertydrop.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure adequate safeguards are in place for such transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Children's Privacy</h2>
            <p className="text-muted-foreground mb-4">
              PropertyDrop is not intended for children under 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. California Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to delete personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Note:</strong> PropertyDrop does not sell personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">13. GDPR Compliance (European Users)</h2>
            <p className="text-muted-foreground mb-4">
              If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Legal Basis:</strong> We process your data based on consent, contract performance, and legitimate interests</li>
              <li><strong>Data Controller:</strong> PropertyDrop is the data controller for your information</li>
              <li><strong>Data Protection Officer:</strong> Contact support@propertydrop.com</li>
              <li><strong>Supervisory Authority:</strong> You may lodge a complaint with your local data protection authority</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">14. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification (for material changes)</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Your continued use of the Service after changes are posted constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">15. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Email:</strong> support@propertydrop.com
            </p>
            <p className="text-muted-foreground mb-4">
              We will respond to your inquiry within 30 days.
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
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-foreground transition-colors font-semibold">
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

