"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Mail, Lock, Loader2, ArrowRight, Shield, Zap, CreditCard, Camera, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/jobs");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
            Welcome back!
          </h1>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-md">
            Sign in to manage your photo delivery jobs and track payments.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {[
              { value: "500+", label: "Active Photographers" },
              { value: "99.9%", label: "Payment Success" },
              { value: "10s", label: "MLS Processing" },
              { value: "$2M+", label: "Revenue Collected" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: Shield, text: "Bank-grade security & encryption" },
              { icon: Zap, text: "Lightning-fast photo delivery" },
              { icon: CreditCard, text: "Guaranteed payment before download" },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <feature.icon className="h-4 w-4" />
                </div>
                <span className="text-white/90">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 relative">
          <p className="text-sm text-white/70">
            Trusted by professional photographers in 50+ states
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
              <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
              <CardDescription className="text-base">
                Access your dashboard and manage your photo delivery jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-5">
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
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="h-12 text-base"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="animate-slide-up">
                    <AlertDescription>{error}</AlertDescription>
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 p-6">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don&apos;t have an account? </span>
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                  Start your free trial
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-green-500" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-green-500" />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span>HTTPS</span>
                </div>
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
