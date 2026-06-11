import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Cohevo.",
  path: "/legal/privacy",
  ogImage: siteConfig.ogImages.homepageAlt,
  ogImageAlt: "Cohevo privacy policy preview",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/legal/privacy",
          title: "Privacy Policy",
          description: "Privacy policy for Cohevo.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/legal/privacy" },
          ],
        })}
      />
      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <span className="mono">Last updated: January 2025</span>

        <p>
          Cohevo (&quot;we&quot;, &quot;us&quot;) is committed to protecting your personal information. This
          policy explains what data we collect, how we use it, and your rights.
        </p>

        <h2>What we collect</h2>
        <p>
          We collect information you provide directly, including name, email address, company name, and message content
          when you fill out a contact form. We may also collect basic usage data through analytics tools to understand
          how visitors use this site.
        </p>

        <h2>How we use it</h2>
        <p>
          We use your information to respond to inquiries, send requested resources like the operations cleanup
          checklist, and occasionally share relevant updates about our services. We do not sell your data. We do not
          share it with third parties except where needed to operate our services.
        </p>

        <h2>Email communications</h2>
        <p>
          If you opt in to receive the checklist or updates, you can unsubscribe at any time by clicking the
          unsubscribe link in any email or by writing to us directly.
        </p>

        <h2>Cookies</h2>
        <p>This site may use basic cookies for analytics purposes. No advertising or tracking cookies are used.</p>

        <h2>Your rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of any personal data we hold about you.
          To make such a request, contact us at hi@cohevo.co.
        </p>

        <h2>Contact</h2>
        <p>For any privacy-related questions, reach us at hi@cohevo.co.</p>
        </div>
      </div>
    </>
  );
}
