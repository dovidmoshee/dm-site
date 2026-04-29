"use client";

import { useState } from "react";
import Link from "next/link";

import type { BlogPostSummary } from "@/lib/blog";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPosts({ posts }: { posts: BlogPostSummary[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const [featured, ...rest] = filtered;

  return (
    <div className="blog-posts-root">
      {allTags.length > 1 && (
        <div className="blog-tag-filter" role="group" aria-label="Filter by topic">
          <button
            className={`blog-filter-pill${activeTag === null ? " blog-filter-pill-active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`blog-filter-pill${activeTag === tag ? " blog-filter-pill-active" : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="blog-empty">No posts found for this topic.</p>
      )}

      {featured && (
        <article className="blog-featured">
          <div className="blog-featured-meta">
            <span className="mono">{formatDate(featured.publishedAt)}</span>
            <span className="mono" aria-hidden>·</span>
            <span className="mono">{featured.readingMinutes} min read</span>
          </div>
          <h2 className="blog-featured-title">
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div className="blog-featured-footer">
            <ul className="blog-tag-list" aria-label="Topics">
              {featured.tags.map((tag) => (
                <li key={tag} className="blog-tag">
                  {tag}
                </li>
              ))}
            </ul>
            <Link href={`/blog/${featured.slug}`} className="btn btn-primary btn-lg">
              Read article →
            </Link>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="blog-grid">
          {rest.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-card-meta">
                <span>{formatDate(post.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="blog-card-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <ul className="blog-tag-list" aria-label="Topics">
                {post.tags.map((tag) => (
                  <li key={tag} className="blog-tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="blog-card-footer">
                <span>
                  By {post.author.name}
                </span>
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
