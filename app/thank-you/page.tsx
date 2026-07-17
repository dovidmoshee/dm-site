import Link from "next/link";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Thanks, I've got your message",
  description: "Thanks for getting in touch with Cohevo.",
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
          title: "Thanks, I've got your message",
          description: "Thanks for getting in touch with Cohevo.",
        })}
      />
      <section className="rescue-thankyou">
        <div className="rescue-thankyou-card">
          <div className="rescue-thankyou-icon"><Check aria-hidden="true" /></div>
          <h1>Thanks, I&apos;ve got it.</h1>
          <p>I&apos;ll read through your message and get back to you. If I need anything else, I&apos;ll ask.</p>
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
