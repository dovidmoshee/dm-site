import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              <Image src="/cohevo-logo-dark.svg" alt="Cohevo" height={32} width={120} />
            </div>
            <div className="footer-tagline">
              I help small and medium businesses bring order to the messy work that keeps pulling the owner back in.
            </div>
            <div className="footer-socials" aria-label="Social">
              <Link
                className="footer-social"
                title="LinkedIn"
                href="https://www.linkedin.com/company/hicohevo"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                in
              </Link>
              <span className="footer-social" aria-hidden="true" title="Twitter/X">
                𝕏
              </span>
              <Link className="footer-social" title="Email" href="mailto:hi@cohevo.co" aria-label="Email">
                @
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              <li>
                <Link href="/offer">Business Cleanup</Link>
              </li>
              <li>
                <Link href="/process">How It Works</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Legal</p>
            <ul className="footer-links">
              <li>
                <Link href="/legal/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/terms">Terms of Service</Link>
              </li>
            </ul>
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--on-strong-muted)",
                  marginBottom: 6,
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Get started
              </div>
              <Link
                className="btn btn-primary"
                style={{ background: "var(--accent-fill)", color: "var(--on-accent)", fontSize: 13 }}
                href="/contact"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Cohevo. All rights reserved.</span>
          <span>hi@cohevo.co</span>
        </div>
      </div>
    </footer>
  );
}
