import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { BlogPosts } from "./blog-posts";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Authoritative articles on business systems, automation, workflow design, and operations for growing teams.",
  path: "/blog",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo business systems articles preview",
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
          <BlogPosts posts={posts} />
        </div>
      </section>
    </>
  );
}
