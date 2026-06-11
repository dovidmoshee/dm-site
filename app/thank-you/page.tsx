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
  ogImageAlt: "Cohevo operations audit thank-you preview",
});

type ThankYouPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedSearchParams = await searchParams;
  const checklist = Array.isArray(resolvedSearchParams.checklist)
    ? resolvedSearchParams.checklist[0]
    : resolvedSearchParams.checklist;

  const requestedChecklist = checklist === "1";

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
            Thank you for reaching out. I will review your message and get back to you within one business day with some
            initial thoughts and a link to book time if it makes sense.
          </p>

        {requestedChecklist ? (
          <p style={{ fontSize: 15, marginTop: -4, marginBottom: 28, color: "var(--accent)" }}>
            Checklist request received. I&apos;ll include it in my follow-up.
          </p>
        ) : null}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-primary btn-lg" href="/">
            Back to Home
          </Link>
          <Link className="btn btn-ghost btn-lg" href="/offer">
            Read the Offer Details
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
