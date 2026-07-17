import { packages, processPhases, siteConfig, socialLinks } from "@/lib/site";
import type { BlogPost, BlogPostSummary } from "@/lib/blog";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

type BreadcrumbItem = {
  name: string;
  path: string;
};

type WebPageSchemaInput = {
  path: string;
  title: string;
  description: string;
  type?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    logo: absoluteUrl("/cohevo-logo-dark.png"),
    image: absoluteUrl(siteConfig.ogImage),
    sameAs: socialLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("https://")),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  breadcrumbs,
}: WebPageSchemaInput) {
  const pageUrl = absoluteUrl(path);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    headline: title,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  if (breadcrumbs?.length) {
    schema.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  }

  return schema;
}

export function pageSchemas(input: WebPageSchemaInput) {
  const data = [webPageSchema(input)];

  if (input.breadcrumbs?.length) {
    data.push({
      ...breadcrumbSchema(input.breadcrumbs),
      "@id": `${absoluteUrl(input.path)}#breadcrumb`,
    });
  }

  return data;
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/")}#service`,
    name: "Cohevo technology help",
    serviceType: "Computer, website, and business technology help",
    url: absoluteUrl("/"),
    description: siteConfig.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: "Individuals and small businesses that need practical technology help",
    },
    hasOfferCatalog: offerCatalogSchema(),
  };
}

export function offerCatalogSchema() {
  return {
    "@type": "OfferCatalog",
    name: "Cohevo practical technology help",
    itemListElement: packages.map((item) => ({
      "@type": "Offer",
      name: item.name,
      description: item.description,
      price: item.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#offers"),
      itemOffered: {
        "@type": "Service",
        name: item.name,
        serviceType: "Practical technology help",
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    })),
  };
}

export function pricingSchema() {
  return {
    "@context": "https://schema.org",
    ...offerCatalogSchema(),
    "@id": `${absoluteUrl("/pricing")}#offers`,
  };
}

export function processSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl("/process")}#process`,
    name: "Cohevo business cleanup delivery process",
    itemListElement: processPhases.map((phase, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: phase.title,
      description: phase.description,
    })),
  };
}

export function blogSchema(posts: BlogPostSummary[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "Cohevo Blog",
    url: absoluteUrl("/blog"),
    description:
      "Articles on cleaning up operations, reducing owner dependence, and making small businesses easier to run.",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    blogPost: posts.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: { "@type": "Person", name: post.author.name },
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: absoluteUrl(siteConfig.ogImages.blogAndServicePages),
    mainEntityOfPage: { "@id": `${absoluteUrl(`/blog/${post.slug}`)}#webpage` },
    keywords: post.tags.join(", "),
  };
}
