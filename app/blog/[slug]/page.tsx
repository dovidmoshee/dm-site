import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { extractToc, slugifyHeading } from "@/lib/toc";
import { TableOfContents } from "./table-of-contents";
import { ReadingProgress } from "./reading-progress";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const title = `${post.title} | ${siteConfig.name}`;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${post.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [siteConfig.ogImage],
    },
  };
}

function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return childrenToText(
      (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
    );
  }
  return "";
}

function makeHeadingComponents(): Components {
  function Heading({ level, children }: { level: 2 | 3 | 4; children: React.ReactNode }) {
    const Tag = `h${level}` as "h2" | "h3" | "h4";
    const text = childrenToText(children);
    const id = slugifyHeading(text);

    return (
      <Tag id={id} className="article-heading">
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true" tabIndex={-1}>
          #
        </a>
        {children}
      </Tag>
    );
  }

  return {
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
  };
}

const mdComponents = makeHeadingComponents();

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocEntries = extractToc(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />

      <section className="inner-hero article-hero">
        <div className="container">
          <div className="article-meta-top">
            <Link href="/blog" className="article-back-link">
              ← Back to Blog
            </Link>
            <span className="mono">{formatDate(post.publishedAt)}</span>
          </div>
          <ul className="blog-tag-list article-hero-tags" aria-label="Topics">
            {post.tags.map((tag) => (
              <li key={tag} className="blog-tag">
                {tag}
              </li>
            ))}
          </ul>
          <h1>{post.title}</h1>
          <p className="article-hero-excerpt">{post.excerpt}</p>
          <div className="article-byline">
            <span>
              By {post.author.name}, {post.author.role}
            </span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      <section className="article-section">
        <div className="container">
          <div className="article-layout">
            <article className="article-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {post.content}
              </ReactMarkdown>
            </article>
            <TableOfContents entries={tocEntries} />
          </div>

          {post.cta ? (
            <div className="article-cta">
              <h3>{post.cta.title}</h3>
              <p>{post.cta.description}</p>
              <Link href={post.cta.href} className="btn btn-primary">
                {post.cta.label}
              </Link>
            </div>
          ) : null}
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
