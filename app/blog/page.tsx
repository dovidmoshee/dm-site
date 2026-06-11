import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";
import { blogSchema, JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { BlogPosts } from "./blog-posts";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical articles on cleaning up operations, reducing owner dependence, and making small businesses easier to run.",
  path: "/blog",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo operations cleanup articles preview",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <JsonLd
        data={[
          ...pageSchemas({
            path: "/blog",
            title: "Blog",
            description:
              "Practical articles on cleaning up operations, reducing owner dependence, and making small businesses easier to run.",
            type: "CollectionPage",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ],
          }),
          blogSchema(posts),
        ]}
      />
      <section className="inner-hero blog-hero">
        <div className="container">
          <div className="tag">Insights</div>
          <h1>Practical notes on making a messy business easier to run.</h1>
          <p>
            Guides for owners and operators dealing with scattered details, unclear ownership, too many manual steps,
            and tools that never quite got set up right.
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
