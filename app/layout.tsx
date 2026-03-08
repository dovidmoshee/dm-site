import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Calibrate Media",
    template: "%s | Calibrate Media",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${ibmPlexMono.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#f4f9f8_45%,_#ffffff_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-[-20rem] h-[32rem] bg-[radial-gradient(circle,_rgba(15,118,110,0.14),_transparent_65%)]" />
          <div className="pointer-events-none absolute right-[-10rem] top-40 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
