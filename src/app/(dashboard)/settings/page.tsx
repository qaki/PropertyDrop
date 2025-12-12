import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { User, Mail, Lock, CreditCard, Bell, Shield, Wallet } from "lucide-react";
import { StripeConnectButton } from "./_components/stripe-connect-button";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

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
              <div>
                <Button variant="outline" size="sm" disabled>
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={session.user.name || ""}
                  placeholder="Your name"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  This name appears on your client delivery pages
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={session.user.email || ""}
                  placeholder="your@email.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Used for login and receiving notifications
                </p>
              </div>

              <Button disabled className="w-full sm:w-auto">
                Save Changes
              </Button>
            </div>
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>

            <Button disabled className="w-full sm:w-auto">
              Update Password
            </Button>
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

        {/* Billing Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>
              Manage your subscription and payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Professional Plan</p>
                <p className="text-sm text-muted-foreground">
                  $69/month • Billed monthly
                </p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Manage
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 bg-muted rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Update
                </Button>
              </div>
            </div>

            <Button variant="destructive" disabled className="w-full sm:w-auto">
              Cancel Subscription
            </Button>
          </CardContent>
        </Card>

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

