import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Message received.",
  path: "/thank-you",
  noIndex: true,
  ogImage: siteConfig.ogImages.splitLime,
  ogImageAlt: "Cohevo technology help thank-you preview",
});

export default function ThankYouPage() {
  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/thank-you",
          title: "Thank You",
          description: "Message received.",
        })}
      />
      <div className="thankyou-center">
        <div>
          <div className="thankyou-icon">✓</div>
          <h1>Message received.</h1>
          <p>
            Thank you for reaching out. I will review what you sent and reply with the best next step, whether that is a quick session, a focused project, ongoing support, or a local repair appointment.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-primary btn-lg" href="/">
              Back to Home
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/#offer">
              See Service Options
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
