"use client";

import { useState } from "react";
import { signup } from "~/app/actions/auth";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Image, Mail, Lock, User, CheckCircle2, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await signup(formData);
      if (result && !result.success) {
        setError(result.error);
      } else if (result && result.success) {
        setSuccess(result.message || "Account created! Check your email.");
      }
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Image className="h-10 w-10" />
            <span className="text-3xl font-bold">
              Property<span className="text-primary-foreground/80">Drop</span>
            </span>
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Stop Chasing Payments.<br />
            Start Selling Photos.
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed">
            Join hundreds of real estate photographers who never worry about unpaid invoices.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Payment Protection</h3>
                <p className="text-primary-foreground/80">
                  3-layer security ensures 100% payment before download. No more chasing invoices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">MLS Auto-Resize</h3>
                <p className="text-primary-foreground/80">
                  Automatic image processing. Upload any size, get MLS-compliant photos in 10 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Flat-Rate Pricing</h3>
                <p className="text-primary-foreground/80">
                  $69/month for unlimited jobs, storage, and photos. No credits, no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="text-sm text-primary-foreground/70">
            "PropertyDrop cut my payment collection time from 3 weeks to instant. Game changer!"
          </p>
          <p className="text-sm font-semibold mt-2">— Sarah M., Miami Real Estate Photographer</p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Image className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">
              Property<span className="text-primary">Drop</span>
            </span>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
              <CardDescription className="text-base">
                Start your 14-day free trial. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    required
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your name will appear on client delivery pages
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@photography.com"
                    autoComplete="email"
                    required
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send your delivery links and payment notifications here
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters long
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <Mail className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 text-base font-semibold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    "Create Account & Start Free Trial"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>By signing up, you agree to our</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Link href="/legal/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    <span>and</span>
                    <Link href="/legal/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 p-6">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Back to Homepage */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
