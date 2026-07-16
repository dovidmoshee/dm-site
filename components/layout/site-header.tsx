import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header ref-site-header">
      <nav className="ref-nav" aria-label="Main navigation">
        <Link href="/#top" className="ref-nav-logo" aria-label="Cohevo">
          <Image src="/cohevo-logo-light.svg" alt="Cohevo" width={128} height={28} priority />
        </Link>
        <Link href="/#start" className="ref-nav-cta">
          Get Tech Help
        </Link>
      </nav>
    </header>
  );
}
