import Link from "next/link";

import { Container } from "@/components/layout/container";
import { navLinks, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-white/70 py-12">
      <Container className="grid gap-10 md:grid-cols-3 md:gap-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold">Business Systems Architect</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Calm systems, faster execution, and clear ownership for founder-led teams.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Navigation</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <Link href="/legal/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Social</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {socialLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
