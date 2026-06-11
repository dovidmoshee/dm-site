import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "I help small and medium businesses clean up messy operations so the owner can stop chasing every detail.",
  path: "/about",
  ogImage: siteConfig.ogImages.homepageAlt,
  ogImageAlt: "Cohevo business cleanup overview",
});

const principles = [
  {
    title: "Clarity",
    description:
      "Every recommendation comes with a plain reason. No buzzwords, no vague advice, and no changes just because a tool looks impressive.",
  },
  {
    title: "Simplicity",
    description:
      "The best setup is the one your team will actually use. If it is too complicated to maintain, it will not last.",
  },
  {
    title: "Reliability",
    description:
      "A broken automation is worse than no automation. Anything I build needs to be tested, understandable, and easy to fix.",
  },
  {
    title: "Documentation",
    description:
      "If the team cannot understand it, it is not done. Every cleaned-up process needs simple instructions people can actually follow.",
  },
] as const;

const credentials = [
  "Operations cleanup and process mapping",
  "monday.com, Airtable, Notion, and CRM setup",
  "Automation: Zapier, Make, n8n",
  "Customer, vendor, booking, and billing operations",
  "Clear team instructions and handoff",
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/about",
          title: "About Cohevo",
          description:
            "I help small and medium businesses clean up messy operations so the owner can stop chasing every detail.",
          type: "AboutPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
        })}
      />
      <div className="inner-hero">
        <div className="container">
          <div className="tag">About</div>
          <h1>I help small businesses bring order to messy operations.</h1>
          <p>
            Not a consultant who hands you a slide deck. I get into the tools, details, and handoffs that are making
            the business harder to run than it should be.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Most messy businesses do not look messy from the outside.</h2>
              <p>
                The customers are being served. The team is busy. Revenue is coming in. But behind the scenes, too much
                depends on memory, side conversations, spreadsheets, and one person knowing what is really going on.
              </p>
              <p>
                I started Cohevo because I kept seeing good teams lose hours to the same avoidable problems: billing
                status nobody trusts, bookings that need manual checking, customer updates buried in inboxes, and tools
                that were bought with good intentions but never set up properly.
              </p>
              <p>
                Cohevo is a blend of cohesive and evolve. That is the job: make the way the business runs more cohesive,
                then leave it flexible enough to evolve as the business changes.
              </p>

              <h3 style={{ fontSize: 26, marginTop: 48, marginBottom: 8 }}>My principles</h3>
              <p style={{ fontSize: 15, color: "var(--ink3)", marginBottom: 24 }}>
                These are the values I bring to every engagement.
              </p>
              <ul className="principles-list">
                {principles.map((item) => (
                  <li key={item.title}>
                    <span className="principle-icon">◎</span>
                    <div className="principle-content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="about-sidebar-card">
                <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                  Background
                </div>
                <h3>Operations Cleanup</h3>
                <p>
                  I help turn scattered tools, handoffs, and status details into a cleaner way for the team to run the work.
                </p>
                <ul className="credential-list">
                  {credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: 24, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                  href="/contact"
                >
                  Book a Free Operations Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
