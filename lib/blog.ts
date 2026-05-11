import { fetchAllSanityPosts, fetchSanityPostBySlug } from "@/lib/sanity/queries";

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
  const posts = await fetchAllSanityPosts();

  return posts
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readingMinutes: post.readingMinutes,
      tags: post.tags,
      author: post.author,
      cta: post.cta,
    }));
}

export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  allPosts: BlogPostSummary[],
  limit = 3
): BlogPostSummary[] {
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime()
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return fetchSanityPostBySlug(slug);
}
