import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Invalid Verification Link</CardTitle>
            <CardDescription>
              The verification link is invalid or missing.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/signup">
              <Button>Back to Sign Up</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find user with this token
  const user = await db.user.findUnique({
    where: { emailVerificationToken: token },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Verification Failed</CardTitle>
            <CardDescription>
              This verification link is invalid or has already been used.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              If you need a new verification link, please contact support or try signing up again.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if already verified
  if (user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Already Verified</CardTitle>
            <CardDescription>
              Your email has already been verified. You can sign in now.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button className="w-full">Continue to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verify the email
  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      emailVerificationToken: null, // Clear the token
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="max-w-md w-full border-2 border-green-200">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Email Verified!</CardTitle>
          <CardDescription className="text-base">
            Your account has been successfully verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 text-center">
              🎉 Welcome to PropertyDrop! You can now sign in and start managing your photo deliveries.
            </p>
          </div>
          
          <Link href="/login">
            <Button className="w-full" size="lg">
              Continue to Sign In
            </Button>
          </Link>

          <div className="text-center text-sm text-muted-foreground">
            <p>Ready to get started?</p>
            <ul className="mt-2 space-y-1 text-left inline-block">
              <li>✓ Create your first job</li>
              <li>✓ Upload photos</li>
              <li>✓ Share with clients</li>
              <li>✓ Get paid automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

