import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const OUTPUT_PATH = path.join(BLOG_CONTENT_DIR, "posts.generated.json");

async function main() {
  const files = await readBlogFiles();
  const posts = await Promise.all(files.map((file) => parseBlogPostFile(file)));

  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  console.log(`Generated ${posts.length} blog post entries at content/blog/posts.generated.json`);
}

async function readBlogFiles() {
  let files = [];

  try {
    files = await fs.readdir(BLOG_CONTENT_DIR);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      throw new Error(`Missing blog content directory: ${BLOG_CONTENT_DIR}`);
    }

    throw error;
  }

  return files.filter((file) => file.endsWith(".mdx"));
}

async function parseBlogPostFile(fileName) {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const fileContent = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(fileContent);
  const frontmatter = parseFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    readingMinutes: calculateReadingMinutes(content),
    content: content.trim(),
  };
}

function parseFrontmatter(data, slug) {
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

function calculateReadingMinutes(content) {
  const words = content
    .replace(/[`*_>#-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

function getString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(value) {
  const nextValue = getString(value);
  return nextValue || undefined;
}

function getStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => getString(item)).filter(Boolean);
}

function getAuthor(value) {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid author frontmatter in blog post.");
  }

  const authorValue = value;
  const name = getString(authorValue.name);
  const role = getString(authorValue.role);

  if (!name || !role) {
    throw new Error("Missing author name or role in blog post frontmatter.");
  }

  return { name, role };
}

function getOptionalCta(value) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const ctaValue = value;
  const title = getString(ctaValue.title);
  const description = getString(ctaValue.description);
  const href = getString(ctaValue.href);
  const label = getString(ctaValue.label);

  if (!title || !description || !href || !label) {
    return undefined;
  }

  return { title, description, href, label };
}

function isNodeError(error) {
  return typeof error === "object" && error !== null && "code" in error;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
