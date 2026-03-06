import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/offer",
  "/process",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/thank-you",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route || "/"}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
  }));
}
