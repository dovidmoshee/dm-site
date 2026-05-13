import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/sections/faq-list";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas, serviceSchema } from "@/lib/schema";
import { deliverables, packages, processTimeline, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cohevo",
  description:
    "Install the operating system your business runs on. In 60 days I streamline your tools, workflows, automations, and AI.",
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo Business OS Setup preview",
});

const problemCards = [
  {
    title: "Operational chaos",
    description: "Every process lives in someone's head. Things get dropped. Nothing is documented.",
  },
  {
    title: "Endless manual work",
    description: "Your team copies data between tools, re-enters information, and chases updates manually.",
  },
  {
    title: "Tool sprawl",
    description: "Twelve subscriptions that don't talk to each other. No clear owner. No clear purpose.",
  },
] as const;

const outcomeCards = [
  {
    title: "Clear, documented workflows",
    description: "Every process is mapped, owned, and easy to hand off. New hires get up to speed fast.",
  },
  {
    title: "Automated handoffs",
    description: "Data moves between your tools automatically. No copy-paste. No dropped leads.",
  },
  {
    title: "Single source of truth",
    description: "One place to see pipeline, tasks, and customer status. Your team always knows the answer.",
  },
] as const;

const trustedBy = ["Meridian Labs", "Stackwave", "Lumen Agency", "Forgepoint"] as const;

const previewFaq = [
  {
    question: "Who is this engagement for?",
    answer:
      "SaaS startups and agencies with 3 to 20 people who are growing but running on manual processes, disconnected tools, and tribal knowledge. If your team is capable but your systems are the bottleneck, this is for you.",
  },
  {
    question: "How much time will you need from us?",
    answer:
      "Plan for two to three hours per week from your side. That includes the initial audit call, tool access setup, and review checkpoints. I do the heavy lifting. You stay informed without being pulled in constantly.",
  },
  {
    question: "What if we already have tools set up?",
    answer:
      "That's fine, and it's common. We start with a full audit of your current stack and build from what's already working. Nothing gets ripped out without a clear reason and a better replacement ready to go.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          ...pageSchemas({
            path: "/",
            title: "Cohevo",
            description:
              "Install the operating system your business runs on. In 60 days I streamline your tools, workflows, automations, and AI.",
          }),
          serviceSchema(),
        ]}
      />
      <section className="hero">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                Business OS Setup · 60-Day Engagement
              </div>
              <h1>
                Install the operating system your <em>business runs on.</em>
              </h1>
              <p className="hero-sub">
                In 60 days, I streamline your tools, workflows, automations, and AI so your team moves faster with less
                manual work.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact">
                  Book a Call
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/contact#checklist">
                  Get the Checklist
                </Link>
              </div>

              {/* <div className="hero-proof">
                <div className="hero-proof-label">Trusted by founders and teams</div>
                <div className="logo-strip">
                  {trustedBy.map((name) => (
                    <div key={name} className="logo-pill">
                      {name}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            <div className="hero-visual" aria-hidden>
              <Image
                src="/workflow-nodes-1.svg"
                alt="Workflow system illustration"
                width={460}
                height={440}
                className="hero-visual-asset"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 40 }}>
            <div className="tag">The Shift</div>
            <h2>From chaos to calm, in 60 days.</h2>
          </div>

          <div className="po-grid">
            <div>
              <div className="po-col-label bad">Where you are now →</div>
              <div className="po-cards">
                {problemCards.map((card) => (
                  <div key={card.title} className="po-card bad">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="po-col-label good">Where you will be →</div>
              <div className="po-cards">
                {outcomeCards.map((card) => (
                  <div key={card.title} className="po-card good">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="offer-summary-grid">
            <div>
              <div className="tag">Business OS Setup</div>
              <h2 className="offer-summary-title">
                Architect and install your business infrastructure.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24 }}>
                Most small teams have the right ambition but the wrong scaffolding. The Business OS Setup gives you a complete operating layer: mapped workflows, integrated tools, automations, and AI where it actually saves time.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 32 }}>
                For SaaS startups and agencies of 3–20 people scaling without adding coordinators to manage the mess.
              </p>
              <Link className="btn btn-primary" href="/offer">
                See Full Offer Details →
              </Link>
            </div>

            <div>
              <div className="offer-summary-badge">
                <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                  Business OS Setup
                </div>
                <h3>60-Day Structured Engagement</h3>
                <p>Everything you need to make your business run cleanly, without you in every loop.</p>

                <div className="badge-stat">
                  <div className="badge-stat-label">Starting from</div>
                  <div className="badge-stat-value">$6,000</div>
                </div>
                <div className="badge-stat">
                  <div className="badge-stat-label">Duration</div>
                  <div className="badge-stat-value" style={{ fontSize: 16, fontWeight: 500 }}>
                    60 days
                  </div>
                </div>
                <div className="badge-stat">
                  <div className="badge-stat-label">Phases</div>
                  <div className="badge-stat-value" style={{ fontSize: 16, fontWeight: 500 }}>
                    Map, Design, Build, Train
                  </div>
                </div>
                <Link
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: 24, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                  href="/contact"
                >
                  Book a Free Audit Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="deliverables-section">
        <div className="container">
          <div className="section-head">
            <div className="tag" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
              What You Get
            </div>
            <h2>Five deliverables. Yours to keep.</h2>
            <p>Every engagement ends with documented & implemented systems that your team owns and can build on.</p>
          </div>

          <div className="deliv-grid">
            {deliverables.map((item) => (
              <div key={item.title} className="deliv-card">
                <div className="deliv-num">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">How It Works</div>
            <h2>Four phases, 60 days, clear outcomes.</h2>
            <p>A structured process means no ambiguity about what happens when.</p>
          </div>

          <div className="timeline">
            {processTimeline.map((phase) => (
              <div key={phase.title} className="timeline-step">
                <div className={`timeline-dot ${phase.active ? "active" : ""}`.trim()}>{phase.icon}</div>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-ghost" href="/process">
              See the Full Process →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">Pricing</div>
            <h2>Three clear packages.</h2>
            <p>Choose the scope that fits your business. Every package delivers a complete, working system.</p>
          </div>

          <div className="pricing-grid">
            {packages.map((item) => (
              <div key={item.name} className={`pricing-card card-hover ${item.popular ? "popular" : ""}`.trim()}>
                {item.popular ? <div className="pricing-badge">Most Popular</div> : null}
                <div className="pricing-name">{item.name}</div>
                <div className="pricing-price">{item.price}</div>
                <div className="pricing-desc">{item.description}</div>
                <ul className="pricing-features">
                  {item.includes.slice(0, 4).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link className={`btn ${item.popular ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%" }} href={item.popular ? "/contact" : "/pricing"}>
                  {item.popular ? "Book a Call" : "See Details"}
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--ink3)" }}>
            Not sure which fits?{" "}
            <Link style={{ color: "var(--accent)", fontWeight: 600 }} href="/contact">
              Book a call and I&apos;ll recommend the right package.
            </Link>
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bg2)", padding: "80px 0" }}>
        <div className="container">
          <div className="section-head">
            <div className="tag">Common Questions</div>
            <h2>Quick answers.</h2>
          </div>

          <FaqList items={previewFaq} className="home-faq-list" />

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-ghost" href="/faq">
              See All FAQs →
            </Link>
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container">
          <h2>Ready for a calmer, faster business?</h2>
          <p>
            Book a free 30-minute audit call. We will look at your current systems and I will tell you exactly where
            the leverage is.
          </p>
          <Link className="btn btn-primary btn-xl" href="/contact" style={{ background: "var(--accent-fill)", color: "var(--on-accent)" }}>
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  );
}
