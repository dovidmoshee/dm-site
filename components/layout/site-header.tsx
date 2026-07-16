import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="rescue-header">
      <nav className="rescue-nav" aria-label="Main navigation">
        <Link href="/#top" className="rescue-logo" aria-label="Cohevo home">
          <Image src="/cohevo-logo-light.svg" alt="Cohevo" width={134} height={30} priority />
        </Link>
        <div className="rescue-nav-links">
          <Link href="/#services">What I fix</Link>
          <Link href="/#offers">Prices</Link>
          <Link href="/#local">Local help</Link>
        </div>
        <a href={siteConfig.whatsAppUrl} className="rescue-nav-cta">
          <MessageCircle aria-hidden="true" />
          <span>WhatsApp David</span>
        </a>
      </nav>
    </header>
  );
}
