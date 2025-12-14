import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { 
  LayoutDashboard, Image as ImageIcon, Settings, LogOut, CreditCard, 
  Plus, ChevronRight, Sparkles, Camera, Menu
} from "lucide-react";
import { checkSubscriptionStatus } from "~/lib/subscription";
import { TrialBanner } from "./_components/trial-banner";

async function signOut() {
  "use server";
  const { signOut: nextAuthSignOut } = await import("~/server/auth");
  await nextAuthSignOut();
  redirect("/");
}

function SidebarContent({ 
  session, 
  subscriptionInfo, 
  userInitials,
  navItems,
  isMobile = false
}: { 
  session: any;
  subscriptionInfo: any;
  userInitials: string;
  navItems: Array<{ href: string; icon: any; label: string }>;
  isMobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/jobs" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Property<span className="text-gradient">Drop</span>
          </span>
        </Link>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b">
        <Link href="/jobs/new">
          <Button className="w-full justify-center gap-2 shadow-lg glow-primary font-semibold h-11">
            <Plus className="h-4 w-4" />
            Create New Job
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
            >
              <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">{item.label}</span>
              <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </Button>
          </Link>
        ))}
      </nav>

      {/* Pro Badge (for trial users) */}
      {subscriptionInfo.isTrial && (
        <div className="mx-4 mb-4">
          <Link href="/subscription">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-4 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Unlock unlimited jobs and premium features
              </p>
              <div className="mt-2 text-xs font-medium text-primary group-hover:underline">
                View plans →
              </div>
            </div>
          </Link>
        </div>
      )}

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <Avatar className="h-11 w-11 border-2 border-primary/20">
            {session.user.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback className="gradient-primary text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {session.user.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </div>

        <form action={signOut}>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2.5 h-10 text-muted-foreground hover:text-foreground hover:border-destructive/50 hover:bg-destructive/5 transition-colors"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/");
  }

  const subscriptionInfo = checkSubscriptionStatus(user);

  const userInitials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const navItems = [
    { href: "/jobs", icon: LayoutDashboard, label: "My Jobs" },
    { href: "/photos", icon: ImageIcon, label: "All Photos" },
    { href: "/subscription", icon: CreditCard, label: "Subscription" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r bg-card flex-col shadow-sm">
        <SidebarContent 
          session={session}
          subscriptionInfo={subscriptionInfo}
          userInitials={userInitials}
          navItems={navItems}
        />
      </aside>

      {/* Mobile Header + Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-card border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/jobs" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Property<span className="text-gradient">Drop</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Quick Add Button (Mobile) */}
              <Link href="/jobs/new">
                <Button size="sm" className="gap-1 shadow-md">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Job</span>
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <SidebarContent 
                    session={session}
                    subscriptionInfo={subscriptionInfo}
                    userInitials={userInitials}
                    navItems={navItems}
                    isMobile={true}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Trial Banner */}
          <TrialBanner subscriptionInfo={subscriptionInfo} />
          
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
