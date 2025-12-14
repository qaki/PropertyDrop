"use client";

import { useState } from "react";
import { signup } from "~/app/actions/auth";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Mail, Lock, User, CheckCircle2, Loader2, Camera, Sparkles, ArrowRight } from "lucide-react";

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
        setError(result.error ?? "An error occurred");
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
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Premium Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center shadow-lg backdrop-blur">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              PropertyDrop
            </span>
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Stop Chasing Payments.
            <br />
            Start Selling Photos.
          </h1>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-md">
            Join hundreds of real estate photographers who never worry about unpaid invoices.
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Payment Protection",
                desc: "3-layer security ensures 100% payment before download. No more chasing invoices.",
              },
              {
                title: "MLS Auto-Resize",
                desc: "Automatic image processing. Upload any size, get MLS-compliant photos in 10 seconds.",
              },
              {
                title: "Flat-Rate Pricing",
                desc: "$69/month for unlimited jobs, storage, and photos. No credits, no surprises.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 relative">
          <p className="text-sm text-white/80 italic">
            &quot;PropertyDrop cut my payment collection time from 3 weeks to instant. Game changer!&quot;
          </p>
          <p className="text-sm font-semibold mt-2">— Sarah M., Miami Real Estate Photographer</p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 gradient-hero">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Property<span className="text-gradient">Drop</span>
            </span>
          </div>

          <Card className="border-2 shadow-2xl">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">14-Day Free Trial</span>
              </div>
              <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
              <CardDescription className="text-base">
                Start your free trial. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={onSubmit} className="space-y-5">
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
                    className="h-12 text-base"
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
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll send your delivery links and payment notifications here
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
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters long
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="animate-slide-up">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50 animate-slide-up">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold shadow-lg glow-primary"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Create Account & Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  <p>By signing up, you agree to our</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Link href="/legal/terms" className="text-primary hover:underline font-medium">
                      Terms of Service
                    </Link>
                    <span>and</span>
                    <Link href="/legal/privacy" className="text-primary hover:underline font-medium">
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
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                {[
                  { icon: CheckCircle2, text: "14-day free trial" },
                  { icon: CheckCircle2, text: "No credit card" },
                  { icon: CheckCircle2, text: "Cancel anytime" },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5">
                    <badge.icon className="h-3.5 w-3.5 text-green-500" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>

          {/* Back to Homepage */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
