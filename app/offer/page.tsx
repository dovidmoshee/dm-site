import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas, serviceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Business Cleanup",
  description:
    "A practical 60-day cleanup for small and medium businesses where bookings, billing, customer updates, and handoffs have gotten messy.",
  path: "/offer",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo business cleanup preview",
});

const fitItems = [
  "You have a small team and too much work still depends on memory",
  "Customers ask for status and your team has to hunt through messages",
  "Bookings, billing, provider updates, or order details keep getting messy",
  "You are using tools like monday.com, spreadsheets, email, or forms, but the setup is not clean",
  "You want the business organized enough to step back without hiring another coordinator",
] as const;

const includedItems = [
  {
    title: "Operations Map",
    description:
      "A clear view of where work gets delayed, duplicated, dropped, or routed back to the owner.",
  },
  {
    title: "Clean Tool Setup",
    description:
      "Your existing tools get cleaned up around the work your team actually does. If a tool should change, you get a plain reason why.",
  },
  {
    title: "Follow-up and Status Automation",
    description:
      "Tested automations for reminders, status updates, task creation, billing steps, customer updates, and provider follow-up.",
  },
  {
    title: "Useful Automation Where It Fits",
    description:
      "Automation only where it removes real work. No shiny-tool project for the sake of looking modern.",
  },
  {
    title: "Team Instructions and Handoff",
    description:
      "Simple instructions and a live walkthrough so the team knows how to run the cleaned-up process without me.",
  },
] as const;

const notIncluded = [
  "Custom software development or code-heavy integrations",
  "Ongoing management after handoff unless we add it separately",
  "Tool licensing costs. You own and pay for your own subscriptions",
  "Marketing campaigns, ad management, or sales strategy",
] as const;

const weekByWeek = [
  {
    week: "Phase 1",
    title: "Find the Mess",
    description:
      "We walk through the real day-to-day work, review the tools, and find where details are getting lost or stuck.",
  },
  {
    week: "Phase 2",
    title: "Pick the Fixes",
    description:
      "I show you what should change first, what can stay, and what is not worth touching. You approve the plan before anything gets built.",
  },
  {
    week: "Phase 3",
    title: "Clean It Up",
    description:
      "I set up the boards, forms, views, automations, and instructions inside your real tools, then test the important handoffs.",
  },
  {
    week: "Phase 4",
    title: "Hand It to the Team",
    description:
      "I write the instructions, walk the team through the new setup, and make sure people know where things live.",
  },
] as const;

const addOns = [
  {
    title: "Ongoing Cleanup",
    description: "Monthly check-ins, automation maintenance, and updates as the business changes.",
    price: "From $1,200 / month",
  },
  {
    title: "Advanced Automation",
    description: "More complex handoffs, reminders, tool connections, and reporting when the business case is clear.",
    price: "From $2,500",
  },
] as const;

export default function OfferPage() {
  return (
    <>
      <JsonLd
        data={[
          ...pageSchemas({
            path: "/offer",
            title: "Business Cleanup",
            description:
              "A practical 60-day cleanup for small and medium businesses where bookings, billing, customer updates, and handoffs have gotten messy.",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Offer", path: "/offer" },
            ],
          }),
          serviceSchema(),
        ]}
      />
      <div className="inner-hero">
        <div className="container">
          <div className="tag">Business Cleanup</div>
          <h1>Get the messy parts of the business under control.</h1>
          <p>
            A 60-day engagement for small and medium businesses where too many details live in people’s heads,
            inboxes, spreadsheets, and half-used tools.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="two-col">
            <div>
              <div className="tag">Best For</div>
              <h2 style={{ fontSize: 32, marginBottom: 16 }}>This is a fit if:</h2>
              <ul className="check-list" style={{ marginBottom: 48 }}>
                {fitItems.map((item) => (
                  <li key={item}>
                    <span className="ck">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="tag">What Gets Cleaned Up</div>
              <h2 style={{ fontSize: 32, marginBottom: 16 }}>What is included</h2>
              <ul className="check-list" style={{ marginBottom: 16 }}>
                {includedItems.map((item) => (
                  <li key={item.title}>
                    <span className="ck">✓</span>
                    <span>
                      <strong>{item.title}</strong> — {item.description}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>What is not included</h3>
              <ul className="check-list" style={{ marginBottom: 48 }}>
                {notIncluded.map((item) => (
                  <li key={item}>
                    <span className="cx">✗</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="tag">Timeline</div>
              <h2 style={{ fontSize: 32, marginBottom: 24 }}>Phase by phase</h2>
              <div className="offer-timeline">
                {weekByWeek.map((item) => (
                  <div key={item.week} className="week-item">
                    <div className="week-num">{item.week}</div>
                    <div className="week-content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 22, marginTop: 40, marginBottom: 16 }}>Optional add-ons</h3>
              <div className="addons-grid">
                {addOns.map((item) => (
                  <div key={item.title} className="addon-card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="addon-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="offer-summary-badge">
                <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                  Business Cleanup
                </div>
                <h3>Ready to get started?</h3>
                <p>Book a free 30-minute audit call. No pitch, no pressure. Just a clear look at where the business is messy.</p>
                <Link
                  className="btn btn-primary"
                  style={{ width: "100%", marginBottom: 12, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                  href="/contact"
                >
                  Book a Free Operations Audit
                </Link>
                <Link
                  className="btn btn-ghost"
                  style={{ width: "100%", color: "var(--on-strong)", borderColor: "var(--strong-border)" }}
                  href="/contact#checklist"
                >
                  Get the Free Checklist
                </Link>
                <div className="badge-stat">
                  <div className="badge-stat-label">Packages from</div>
                  <div className="badge-stat-value">$6,000</div>
                </div>
                <div className="badge-stat">
                  <div className="badge-stat-label">Payment terms</div>
                  <div className="badge-stat-value" style={{ fontSize: 14, fontWeight: 400, color: "var(--on-strong-muted)" }}>
                    50% upfront, 50% on delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container">
          <h2>Ready to make the business easier to run?</h2>
          <p>Book a free audit call and leave with a clear picture of what needs to be cleaned up first.</p>
          <Link className="btn btn-xl" style={{ background: "var(--accent-fill)", color: "var(--on-accent)", fontWeight: 600 }} href="/contact">
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  );
}
