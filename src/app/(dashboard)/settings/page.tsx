import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { User, CreditCard, Bell, Shield, Wallet, Briefcase } from "lucide-react";
import { StripeConnectButton } from "./_components/stripe-connect-button";
import { ProfileForm } from "./_components/profile-form";
import { PasswordForm } from "./_components/password-form";
import { ProfilePhotoUpload } from "./_components/profile-photo-upload";
import { BrandingForm } from "./_components/branding-form";
import { db } from "~/server/db";
import { checkSubscriptionStatus } from "~/lib/subscription";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/");

  const subscriptionInfo = checkSubscriptionStatus(user);
  const hasPaidSubscription = subscriptionInfo.status === "active";

  const userInitials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and how it appears to clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <ProfilePhotoUpload />
            </div>

            <Separator />

            <ProfileForm 
              defaultName={session.user.name || ""}
              email={session.user.email || ""}
            />
          </CardContent>
        </Card>

        {/* Branding Section (P3.1) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Company Branding
            </CardTitle>
            <CardDescription>
              Customize how your brand appears on client delivery pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BrandingForm 
              currentCompanyName={user.companyName}
              currentCompanyLogo={user.companyLogo}
            />
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what emails you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when a client pays for photos
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Enabled
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Upload Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when photo processing is complete
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Enabled
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">
                  Receive tips, updates, and special offers
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Disabled
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>
              Connect your payment account to receive money from clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StripeConnectButton />
          </CardContent>
        </Card>

        {/* Billing Section - Only show if user has paid subscription */}
        {hasPaidSubscription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription through Whop
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Professional Plan</p>
                  <p className="text-sm text-muted-foreground">
                    $69.99/month • Billed monthly
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <a 
                    href="https://whop.com/hub/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Manage on Whop
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                To update your payment method or cancel your subscription, please visit your Whop dashboard.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Coming Soon Notice */}
        <Card className="bg-muted/50 border-2 border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              🚧 Some settings features are coming soon! You'll be able to fully customize your profile, notifications, and billing preferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

