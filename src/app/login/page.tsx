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
import { Image, Mail, Lock, Loader2, ArrowRight, Shield, Zap, CreditCard } from "lucide-react";

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
    <div className="min-h-screen flex bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Left Side - Branding & Quick Stats */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Image className="h-10 w-10" />
            <span className="text-3xl font-bold">
              Property<span className="text-primary-foreground/80">Drop</span>
            </span>
          </Link>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome back!
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed">
            Sign in to manage your photo delivery jobs and track payments.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm text-primary-foreground/80">Active Photographers</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">99.99%</div>
              <div className="text-sm text-primary-foreground/80">Payment Success Rate</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">10 sec</div>
              <div className="text-sm text-primary-foreground/80">MLS Processing Time</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-sm text-primary-foreground/80">Collected for Photographers</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <span className="text-primary-foreground/90">Bank-grade security & encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5" />
              <span className="text-primary-foreground/90">Lightning-fast photo delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <span className="text-primary-foreground/90">Guaranteed payment before download</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="text-sm text-primary-foreground/70">
            Trusted by professional photographers in 50+ states
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
              <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
              <CardDescription className="text-base">
                Access your dashboard and manage your photo delivery jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
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
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
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
                    className="h-11"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {/* Demo Credentials (Remove in production) */}
                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                  <p className="font-semibold mb-1">Demo Access:</p>
                  <p>Email: demo@propertydrop.com</p>
                  <p>Password: demo123</p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 p-6">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                  Start your free trial
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span>Encrypted</span>
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

