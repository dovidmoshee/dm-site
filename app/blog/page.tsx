import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Authoritative articles on business systems, automation, workflow design, and operations for growing teams.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <section className="inner-hero blog-hero">
        <div className="container">
          <div className="tag">Insights</div>
          <h1>Authoritative articles on systems, automation, and growth operations.</h1>
          <p>
            Practical frameworks for founders and operators who want less chaos, better execution, and scalable
            internal infrastructure.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
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
                    By {post.author.name}, {post.author.role}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
