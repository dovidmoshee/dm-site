"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "@/lib/site";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "calibrate-theme-preference";
const themeOrder: ThemePreference[] = ["system", "light", "dark"];
const themeLabels: Record<ThemePreference, string> = {
  system: "Auto",
  light: "Light",
  dark: "Dark",
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedPreference === "light" || storedPreference === "dark" || storedPreference === "system") {
    return storedPreference;
  }

  return "system";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>(getStoredThemePreference);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return getSystemTheme();
  });
  const menuId = "mobile-menu";
  const resolvedTheme = themePreference === "system" ? systemTheme : themePreference;

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themePreference = themePreference;
  }, [themePreference, resolvedTheme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSchemeChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSchemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSchemeChange);
    };
  }, []);

  const cycleTheme = () => {
    setThemePreference((currentTheme) => {
      const currentIndex = themeOrder.indexOf(currentTheme);
      const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
      return nextTheme;
    });
  };

  const themeStatusLabel =
    themePreference === "system" ? `${themeLabels.system} (${resolvedTheme})` : themeLabels[themePreference];
  const themeIcon = resolvedTheme === "dark" ? "☾" : "☀";

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
            <button
              type="button"
              className="theme-toggle"
              onClick={cycleTheme}
              aria-label={`Theme mode: ${themeStatusLabel}. Click to change.`}
              title={`Theme: ${themeStatusLabel}`}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {themeIcon}
              </span>
              <span>{themeStatusLabel}</span>
            </button>
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
                <button
                  type="button"
                  className="theme-toggle theme-toggle-mobile"
                  onClick={cycleTheme}
                  aria-label={`Theme mode: ${themeStatusLabel}. Click to change.`}
                  title={`Theme: ${themeStatusLabel}`}
                >
                  <span className="theme-toggle-icon" aria-hidden="true">
                    {themeIcon}
                  </span>
                  <span>{themeStatusLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
