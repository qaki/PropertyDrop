import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { LayoutDashboard, Image as ImageIcon, Settings, LogOut } from "lucide-react";

async function signOut() {
  "use server";
  const { signOut: nextAuthSignOut } = await import("~/server/auth");
  await nextAuthSignOut();
  redirect("/");
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

  const userInitials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b bg-sidebar">
          <Link href="/jobs" className="flex items-center gap-2">
            <ImageIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">
              Property<span className="text-primary">Drop</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/jobs">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-sidebar-accent"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>My Jobs</span>
            </Button>
          </Link>

          <Link href="/photos">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-sidebar-accent"
            >
              <ImageIcon className="h-5 w-5" />
              <span>All Photos</span>
            </Button>
          </Link>

          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-sidebar-accent"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
          </Link>
        </nav>

        <Separator />

        {/* User Profile */}
        <div className="p-4 border-t bg-sidebar">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">
                {session.user.name || "User"}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          <form action={signOut}>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

