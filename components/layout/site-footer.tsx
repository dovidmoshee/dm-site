import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rescue-footer">
      <div className="rescue-shell rescue-footer-grid">
        <div>
          <Image src="/cohevo-logo-dark.svg" alt="Cohevo" width={140} height={30} className="rescue-footer-logo" loading="eager" />
          <p>I help with computers, websites, email, and business tools.</p>
        </div>
        <div className="rescue-footer-links">
          <Link href="/#services">What I fix</Link>
          <Link href="/#offers">Prices</Link>
          <Link href="/#local">Local service</Link>
          <a href={siteConfig.whatsAppUrl}>WhatsApp</a>
          <a href={`mailto:${siteConfig.contactEmail}`}>Email</a>
        </div>
      </div>
      <div className="rescue-shell rescue-footer-bottom">
        <small>© {currentYear} Cohevo</small>
        <small>Remote worldwide · Repairs in Carmei Gat and Kiryat Gat</small>
      </div>
    </footer>
  );
}
