import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              Calibrate <span>Media</span>
            </div>
            <div className="footer-tagline">
              I design and install the operating system that runs your business. Systems mapping, automation, and AI
              for growing teams.
            </div>
            <div className="footer-socials" aria-label="Social">
              <span className="footer-social" aria-hidden="true" title="LinkedIn">
                in
              </span>
              <span className="footer-social" aria-hidden="true" title="Twitter/X">
                𝕏
              </span>
              <Link className="footer-social" title="Email" href="mailto:hello@calibratemedia.co" aria-label="Email">
                @
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              <li>
                <Link href="/offer">Business OS Setup</Link>
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
                  color: "rgba(255,255,255,0.8)",
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
                style={{ background: "var(--lime)", color: "var(--ink)", fontSize: 13 }}
                href="/contact"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Calibrate Media. All rights reserved.</span>
          <span>hello@calibratemedia.co</span>
        </div>
      </div>
    </footer>
  );
}
