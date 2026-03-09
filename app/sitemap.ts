import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/offer",
  "/process",
  "/pricing",
  "/about",
  "/blog",
  "/faq",
  "/contact",
  "/thank-you",
  "/legal/privacy",
  "/legal/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

  return [...routes, ...blogRoutes].map((route) => {
    const blogPost = blogPosts.find((post) => route === `/blog/${post.slug}`);
    const lastModified = blogPost ? new Date(blogPost.updatedAt ?? blogPost.publishedAt) : now;

    return {
      url: `${siteConfig.url}${route || "/"}`,
      lastModified,
      changeFrequency: route.startsWith("/blog/") || route === "/blog" ? "weekly" : route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/contact" ? 0.9 : route.startsWith("/blog/") ? 0.75 : 0.7,
    };
  });
}
