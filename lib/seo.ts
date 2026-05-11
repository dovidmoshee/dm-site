import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  ogImage = siteConfig.ogImage,
  ogImageAlt = `${siteConfig.name} preview`,
}: BuildMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteConfig.url}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
