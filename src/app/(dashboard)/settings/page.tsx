import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { 
  User, CreditCard, Bell, Shield, Wallet, Briefcase, 
  CheckCircle2, Mail, ExternalLink, Settings as SettingsIcon
} from "lucide-react";
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
    <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <Card className="border-2 card-hover">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              Profile Information
            </CardTitle>
            <CardDescription className="text-sm">
              Update your personal information and how it appears to clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-primary/20 shadow-lg">
                {session.user.image && <AvatarImage src={session.user.image} />}
                <AvatarFallback className="gradient-primary text-white text-xl sm:text-2xl font-bold">
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

        {/* Branding Section */}
        <Card className="border-2 card-hover">
          <CardHeader className="pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl">Company Branding</CardTitle>
                  <CardDescription className="mt-1 text-sm">
                    Customize how your brand appears on client delivery pages
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 self-start sm:self-center">Pro Feature</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <BrandingForm 
              currentCompanyName={user.companyName}
              currentCompanyLogo={user.companyLogo}
            />
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="border-2 card-hover">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
              </div>
              Security
            </CardTitle>
            <CardDescription className="text-sm">
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>

        {/* Payment Settings Section */}
        <Card className="border-2 card-hover">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
              </div>
              Payment Settings
            </CardTitle>
            <CardDescription className="text-sm">
              Connect your Stripe account to receive payments from clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StripeConnectButton />
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="border-2 card-hover">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              Notifications
            </CardTitle>
            <CardDescription className="text-sm">
              Choose what emails you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Payment Notifications", desc: "Get notified when a client pays for photos", enabled: true },
              { title: "Upload Notifications", desc: "Get notified when photo processing is complete", enabled: true },
              { title: "Marketing Emails", desc: "Receive tips, updates, and special offers", enabled: false },
            ].map((notification) => (
              <div key={notification.title}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2">
                  <div className="flex items-start sm:items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{notification.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {notification.desc}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={notification.enabled ? "default" : "secondary"}
                    className={`self-start sm:self-center flex-shrink-0 ${notification.enabled ? "bg-green-100 text-green-700" : ""}`}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {notification.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-2">
              Notification preferences will be customizable in a future update.
            </p>
          </CardContent>
        </Card>

        {/* Billing Section - Only show if user has paid subscription */}
        {hasPaidSubscription && (
          <Card className="border-2 card-hover">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
                </div>
                Billing & Subscription
              </CardTitle>
              <CardDescription className="text-sm">
                Manage your subscription through Whop
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-base sm:text-lg">Professional Plan</p>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    $49.99/month • Billed monthly
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-medium w-full sm:w-auto"
                  asChild
                >
                  <a 
                    href="https://whop.com/hub/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Manage
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                To update your payment method or cancel your subscription, please visit your Whop dashboard.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
