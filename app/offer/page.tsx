import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Business OS Setup",
  description:
    "The system your business needs to grow without adding headcount. See deliverables, scope, timeline, and optional add-ons.",
  path: "/offer",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo Business OS service preview",
});

const fitItems = [
  "You have 3 to 20 people and feel like coordination is eating your week",
  "You are using 5 or more tools that don't connect to each other",
  "New hires take too long to get up to speed because nothing is documented",
  "You want to scale without hiring a full-time ops person right now",
  "You are a SaaS startup, agency, or services business with existing revenue",
] as const;

const includedItems = [
  {
    title: "Business Systems Map",
    description:
      "A complete visual audit of your workflows, tools, and handoffs. You will see where work is getting stuck.",
  },
  {
    title: "Tool Stack Architecture",
    description:
      "A documented recommendation for your tooling. Every choice is justified and tied to your actual needs.",
  },
  {
    title: "Automation Layer",
    description:
      "Live, tested automations built with Zapier, Make, or n8n. Lead forms to CRM. CRM to onboarding. Notifications and handoffs.",
  },
  {
    title: "AI Workflow Layer",
    description:
      "AI integrated into your day-to-day work: meeting summaries, support reply drafting, reporting, and research tasks.",
  },
  {
    title: "Documentation and Training",
    description:
      "Written SOPs for every new workflow and a live training session with your team.",
  },
] as const;

const notIncluded = [
  "Custom software development or code-heavy integrations",
  "Ongoing management or monitoring after handoff (available as an add-on)",
  "Tool licensing costs (you own and pay for your own subscriptions)",
  "Marketing campaigns or demand generation strategy",
] as const;

const weekByWeek = [
  {
    week: "Phase 1",
    title: "Discovery and Mapping",
    description:
      "Full audit call, tool access, workflow interviews. Deliver the Business Systems Map at the close of this phase.",
  },
  {
    week: "Phase 2",
    title: "Architecture and Sign-off",
    description:
      "Present the Tool Stack Architecture and automation logic. Align on priorities. Get your approval before building.",
  },
  {
    week: "Phase 3",
    title: "Build and Automate",
    description:
      "Build, configure, and test all automations and AI workflows. Mid-phase check-in to flag anything unexpected.",
  },
  {
    week: "Phase 4",
    title: "Documentation and Handoff",
    description:
      "Write the SOPs, run the training session, and hand over the full system. You own it completely from here.",
  },
] as const;

const addOns = [
  {
    title: "Ongoing Stewardship",
    description: "Monthly check-ins, automation maintenance, and system updates as your business evolves.",
    price: "From $1,200 / month",
  },
  {
    title: "Advanced Automations",
    description: "Complex multi-step workflows, custom API integrations, and advanced AI pipeline setup.",
    price: "From $2,500",
  },
] as const;

export default function OfferPage() {
  return (
    <>
      <div className="inner-hero">
        <div className="container">
          <div className="tag">Business OS Setup</div>
          <h1>The system your business needs to grow without adding headcount.</h1>
          <p>
            A 60-day structured engagement to map, design, build, and hand off a complete operating infrastructure for
            your team.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="two-col">
            <div>
              <div className="tag">Best For</div>
              <h2 style={{ fontSize: 32, marginBottom: 16 }}>This engagement is a fit if:</h2>
              <ul className="check-list" style={{ marginBottom: 48 }}>
                {fitItems.map((item) => (
                  <li key={item}>
                    <span className="ck">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="tag">Deliverables</div>
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
                  Business OS Setup
                </div>
                <h3>Ready to get started?</h3>
                <p>Book a free 30-minute audit call. No pitch, no pressure. Just a clear look at your systems.</p>
                <Link
                  className="btn btn-primary"
                  style={{ width: "100%", marginBottom: 12, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                  href="/contact"
                >
                  Book a Free Audit Call
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
          <h2>Let&apos;s build your business OS.</h2>
          <p>Book a free audit call and leave with a clear picture of where your systems need work.</p>
          <Link className="btn btn-xl" style={{ background: "var(--accent-fill)", color: "var(--on-accent)", fontWeight: 600 }} href="/contact">
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  );
}
