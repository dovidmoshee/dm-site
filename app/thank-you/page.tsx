import Link from "next/link";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Message Received",
  description: "Your technology-help message has been received.",
  path: "/thank-you",
  noIndex: true,
  ogImage: siteConfig.ogImages.splitLime,
  ogImageAlt: "Cohevo technology help",
});

export default function ThankYouPage() {
  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/thank-you",
          title: "Message Received",
          description: "Your technology-help message has been received.",
        })}
      />
      <section className="rescue-thankyou">
        <div className="rescue-thankyou-card">
          <div className="rescue-thankyou-icon"><Check aria-hidden="true" /></div>
          <span className="rescue-kicker">Message received</span>
          <h1>Thanks. I&apos;ll take a look.</h1>
          <p>I will review what you sent and reply with the most sensible next step, whether that is a remote session, onsite visit, focused cleanup, or something outside my scope.</p>
          <div className="rescue-thankyou-actions">
            <Link className="rescue-button rescue-button-primary" href="/">
              <ArrowLeft aria-hidden="true" /> Back to home
            </Link>
            <a className="rescue-button rescue-button-secondary" href={siteConfig.whatsAppUrl}>
              <MessageCircle aria-hidden="true" /> Add something on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
