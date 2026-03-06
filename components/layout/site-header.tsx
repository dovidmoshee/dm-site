"use client";

import Link from "next/link";
import { Menu, Workflow } from "lucide-react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Workflow className="h-4 w-4" aria-hidden />
          </span>
          <span>Business Systems Architect</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/contact#checklist">Get the Checklist</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/contact#book-call">Book a Call</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px]">
            <SheetHeader>
              <SheetTitle>Business Systems Architect</SheetTitle>
              <SheetDescription>Choose a page to continue.</SheetDescription>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button key={link.href} asChild variant="ghost" className="justify-start text-base">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/contact#checklist">Get the Checklist</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/contact#book-call">Book a Call</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
