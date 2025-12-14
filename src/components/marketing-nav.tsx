"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Camera, ArrowRight, Menu, Users } from "lucide-react";

interface MarketingNavProps {
  activePage?: 'home' | 'pricing' | 'features';
}

export function MarketingNav({ activePage }: MarketingNavProps) {
  return (
    <nav className="border-b glass sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              Property<span className="text-gradient">Drop</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors underline-animated ${
                activePage === 'pricing' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/features" 
              className={`text-sm font-medium transition-colors underline-animated ${
                activePage === 'features' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Features
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="shadow-lg glow-primary font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/signup">
              <Button size="sm" className="text-xs sm:text-sm">Try Free</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/pricing" className={`text-lg font-medium transition-colors ${
                    activePage === 'pricing' ? 'text-primary' : 'hover:text-primary'
                  }`}>
                    Pricing
                  </Link>
                  <Link href="/features" className={`text-lg font-medium transition-colors ${
                    activePage === 'features' ? 'text-primary' : 'hover:text-primary'
                  }`}>
                    Features
                  </Link>
                  <hr className="my-2" />
                  <Link href="/login">
                    <Button variant="outline" className="w-full font-medium">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full shadow-lg glow-primary font-semibold">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t bg-card py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl">PropertyDrop</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The professional photo delivery platform built for real estate photographers.
            </p>
            <div className="flex items-center gap-3 mt-4 sm:mt-6">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">500+ photographers trust us</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors underline-animated">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider text-muted-foreground">Contact</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:support@property-drop.com" className="hover:text-foreground transition-colors underline-animated">
                  support@property-drop.com
                </a>
              </li>
              <li className="pt-4">
                <p className="text-xs">© 2025 PropertyDrop. All rights reserved.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
