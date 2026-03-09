import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type BlogPostAuthor = {
  name: string;
  role: string;
};

type BlogPostCta = {
  title: string;
  description: string;
  href: string;
  label: string;
};

type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: BlogPostAuthor;
  cta?: BlogPostCta;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  let files: string[] = [];

  try {
    files = await fs.readdir(BLOG_CONTENT_DIR);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const slugs = files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
  const posts = await Promise.all(slugs.map((slug) => getBlogPostBySlug(slug)));
  const summaries: BlogPostSummary[] = [];

  for (const post of posts) {
    if (!post) {
      continue;
    }

    summaries.push({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readingMinutes: post.readingMinutes,
      tags: post.tags,
      author: post.author,
      cta: post.cta,
    });
  }

  return summaries.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const postPath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);

  let fileContent: string;
  try {
    fileContent = await fs.readFile(postPath, "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return undefined;
    }

    throw error;
  }

  try {
    const { content, data } = matter(fileContent);
    const frontmatter = parseFrontmatter(data, slug);

    return {
      slug,
      ...frontmatter,
      readingMinutes: calculateReadingMinutes(content),
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Skipping invalid blog post "${slug}".`, error);
    return undefined;
  }
}

function parseFrontmatter(data: matter.GrayMatterFile<string>["data"], slug: string): BlogPostFrontmatter {
  const title = getString(data.title);
  const excerpt = getString(data.excerpt);
  const publishedAt = getString(data.publishedAt);
  const updatedAt = getOptionalString(data.updatedAt);
  const tags = getStringArray(data.tags);
  const author = getAuthor(data.author);
  const cta = getOptionalCta(data.cta);

  if (!title || !excerpt || !publishedAt || tags.length === 0) {
    throw new Error(`Invalid frontmatter in blog post "${slug}".`);
  }

  return {
    title,
    excerpt,
    publishedAt,
    updatedAt,
    tags,
    author,
    cta,
  };
}

function calculateReadingMinutes(content: string) {
  const words = content
    .replace(/[`*_>#-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(value: unknown) {
  const nextValue = getString(value);
  return nextValue || undefined;
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error;
}

function getStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => getString(item)).filter(Boolean);
}

function getAuthor(value: unknown): BlogPostAuthor {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid author frontmatter in blog post.");
  }

  const authorValue = value as Record<string, unknown>;
  const name = getString(authorValue.name);
  const role = getString(authorValue.role);

  if (!name || !role) {
    throw new Error("Missing author name or role in blog post frontmatter.");
  }

  return { name, role };
}

function getOptionalCta(value: unknown): BlogPostCta | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const ctaValue = value as Record<string, unknown>;
  const title = getString(ctaValue.title);
  const description = getString(ctaValue.description);
  const href = getString(ctaValue.href);
  const label = getString(ctaValue.label);

  if (!title || !description || !href || !label) {
    return undefined;
  }

  return { title, description, href, label };
}
