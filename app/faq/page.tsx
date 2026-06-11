import Link from "next/link";

import { FaqList } from "@/components/sections/faq-list";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, JsonLd, pageSchemas } from "@/lib/schema";
import { faqItems, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Honest answers to common questions about fit, process, scope, security, and pricing.",
  path: "/faq",
  ogImage: siteConfig.ogImages.homepageAlt,
  ogImageAlt: "Cohevo business cleanup FAQ preview",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          ...pageSchemas({
            path: "/faq",
            title: "FAQ",
            description: "Honest answers to common questions about fit, process, scope, security, and pricing.",
            type: "FAQPage",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" },
            ],
          }),
          faqSchema(),
        ]}
      />
      <div className="inner-hero">
        <div className="container">
          <div className="tag">FAQ</div>
          <h1>Honest answers to common questions.</h1>
          <p>If you have a question that is not here, send it through the contact form and I will get back to you.</p>
        </div>
      </div>

      <section>
        <div className="container">
          <FaqList items={faqItems} />

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ fontSize: 16, color: "var(--ink3)", marginBottom: 20 }}>Still have questions?</p>
            <Link className="btn btn-primary btn-lg" href="/contact">
              Book a Free Operations Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
