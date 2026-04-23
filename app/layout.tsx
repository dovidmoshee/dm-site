import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cohevo",
    template: "%s | Cohevo",
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const themeInitScript = `(() => {
  try {
    const key = "cohevo-theme-preference";
    const legacyKey = "calibrate-theme-preference";
    const stored = window.localStorage.getItem(key) ?? window.localStorage.getItem(legacyKey);
    const preference =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    window.localStorage.setItem(key, preference);
    window.localStorage.removeItem(legacyKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = preference === "system" ? (prefersDark ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = preference;
  } catch {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <GoogleTagManager gtmId="GTM-KJ8HDKJ" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="app-main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
