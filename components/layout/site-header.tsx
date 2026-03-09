"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = "mobile-menu";

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Calibrate <span>Media</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`.trim()}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-ctas">
            <Link href="/contact#checklist" className="btn btn-ghost">
              Get the Checklist
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Book a Call
            </Link>
          </div>

          <button
            className="nav-mobile-toggle"
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close mobile menu"
            onClick={() => setMenuOpen(false)}
          />
          <div id={menuId} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile menu">
            <div className="mobile-menu-inner">
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close mobile menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>

              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${active ? "nav-link-active" : ""}`.trim()}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mobile-menu-ctas">
                <Link href="/contact#checklist" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                  Get the Checklist
                </Link>
                <Link href="/contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
