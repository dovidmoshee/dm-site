import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for Cohevo.",
  path: "/legal/terms",
  ogImage: siteConfig.ogImages.homepageAlt,
  ogImageAlt: "Cohevo Business OS Setup overview",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/legal/terms",
          title: "Terms of Service",
          description: "Terms of service for Cohevo.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/legal/terms" },
          ],
        })}
      />
      <div className="container">
        <div className="legal-content">
          <h1>Terms of Service</h1>
          <span className="mono">Last updated: January 2025</span>

        <p>
          These terms apply to all visitors and clients of Cohevo. By using this website or engaging our
          services, you agree to the following.
        </p>

        <h2>Services</h2>
        <p>
          Cohevo provides business systems consulting, workflow design, automation implementation, and related
          services. The specific scope of each engagement is defined in a separate Statement of Work agreed upon before
          work begins.
        </p>

        <h2>Payment</h2>
        <p>
          All engagements follow a 50% deposit, 50% on completion structure unless otherwise agreed in writing. The
          deposit is non-refundable once work has commenced.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All deliverables created as part of an engagement become the property of the client upon receipt of final
          payment. Cohevo retains the right to reference the type of work performed in general portfolio
          descriptions without disclosing confidential client information.
        </p>

        <h2>Confidentiality</h2>
        <p>
          We treat all client information as confidential. We will not disclose your business processes, tool stack, or
          proprietary information to any third party without your written consent.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Our total liability under any engagement is limited to the fees paid for that engagement. We are not liable
          for indirect, incidental, or consequential damages.
        </p>

        <h2>Changes to terms</h2>
        <p>
          We may update these terms periodically. Continued use of the site after changes constitutes acceptance of the
          revised terms.
        </p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact us at hi@cohevo.co.</p>
        </div>
      </div>
    </>
  );
}
