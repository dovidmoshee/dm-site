import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/sections/faq-list";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas, serviceSchema } from "@/lib/schema";
import { processTimeline, siteConfig } from "@/lib/site";

const homepageDescription =
  "Cohevo helps small and medium businesses clean up messy operations so work stops falling through the cracks and the owner gets pulled into fewer daily fires.";

export const metadata = buildMetadata({
  title: "Cohevo",
  description: homepageDescription,
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo operations cleanup preview",
});

const messySigns = [
  "Details are spread across WhatsApp, email, spreadsheets, and memory",
  "Customers call or message because nobody has a clear status update",
  "Invoices, bookings, provider updates, or follow-ups get missed",
  "Team members ask the same small questions again and again",
  "The owner has to chase everything to keep the work moving",
] as const;

const cleanupSteps = [
  {
    title: "Map how the work actually runs",
    description:
      "We look at customers, orders, bookings, billing, provider updates, internal tasks, and follow-ups as they really happen today.",
  },
  {
    title: "Find what gets dropped or stuck",
    description:
      "We identify the places where work is delayed, duplicated, unclear, hidden in someone’s head, or routed back to the owner.",
  },
  {
    title: "Clean up the recurring process",
    description:
      "We decide what to keep, simplify, connect, replace, or automate, then build the approved fixes inside the tools your team will use.",
  },
  {
    title: "Train the team to run it",
    description:
      "We document the process, record a walkthrough, train the team, and refine the setup for 7 days after launch.",
  },
] as const;

const outcomeCards = [
  {
    title: "Clear ownership",
    description: "Everyone knows what needs to happen, who owns it, and what the next step is.",
  },
  {
    title: "One place for status",
    description: "Customer, booking, billing, provider, and internal task details stop living in scattered chats and memory.",
  },
  {
    title: "Less owner chasing",
    description: "The team can answer more questions and move more work forward without pulling the owner into every loose end.",
  },
  {
    title: "Better handoffs",
    description: "Bookings, billing, customer updates, provider coordination, and follow-ups move with fewer dropped details.",
  },
] as const;

const bestFits = [
  "Service businesses",
  "Booking-based businesses",
  "Home service companies",
  "Agencies",
  "Clinics",
  "Coaching or education businesses",
  "Local operations-heavy businesses",
  "Businesses with vendors, providers, or field teams",
] as const;

const previewFaq = [
  {
    question: "Who is this for?",
    answer:
      "Small to medium businesses where the owner or one key employee is still the bottleneck. It is a strong fit when customers, bookings, billing, provider updates, internal tasks, and follow-ups are getting messy.",
  },
  {
    question: "What do you actually change?",
    answer:
      "I map the current workflow, find where work gets dropped or delayed, clean up the process, connect the right tools, automate repeated admin work where it saves time, then document and train the team.",
  },
  {
    question: "Do we need to replace all our tools?",
    answer:
      "No. We start with what you already use. If a tool is working, we keep it. If something is creating confusion, I explain the issue and get owner approval before anything gets replaced or rebuilt.",
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
            description: homepageDescription,
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
                For owners tired of chasing every detail
              </div>
              <h1>
                Clean up messy operations so work stops <em>falling through the cracks.</em>
              </h1>
              <p className="hero-sub">
                Cohevo helps small and medium businesses organize the daily flow of customers, orders, bookings, billing, provider updates, internal tasks, and follow-ups, so the team knows what to do next and the owner gets pulled into fewer daily fires.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact">
                  Get a Free Operations Audit
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/process">
                  See How It Works
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-hidden>
              <Image
                src="/cohevo-business-os-hero.png"
                alt="Operations map showing scattered handoffs organized into one clear team process"
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
          <div className="offer-summary-grid">
            <div>
              <div className="tag">The Main Problem</div>
              <h2 className="offer-summary-title">The business is growing, but too much still depends on the owner.</h2>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24 }}>
                Most growing businesses are busy. The problem is that the day-to-day work still lives across WhatsApp, email, spreadsheets, memory, and a few tools that do not quite match how the business actually runs.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7 }}>
                Everyone is working hard, but the business still feels reactive because the next step is not always clear.
              </p>
            </div>
            <div className="offer-summary-badge">
              <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                Common signs
              </div>
              <h3>Does this sound familiar?</h3>
              <ul className="pricing-features" style={{ color: "var(--on-strong)", marginTop: 20 }}>
                {messySigns.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">What Cohevo Does</div>
            <h2>Get the business out of the owner’s head and into a clear system the team can use.</h2>
            <p>
              We focus on the recurring work that causes daily friction: customer status, booking details, billing steps, provider handoffs, internal tasks, follow-ups, and repeated admin work.
            </p>
          </div>

          <div className="deliv-grid">
            {cleanupSteps.map((step, index) => (
              <div key={step.title} className="deliv-card">
                <div className="deliv-num">{String(index + 1).padStart(2, "0")} /</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg2)", padding: "80px 0" }}>
        <div className="container">
          <div className="section-head">
            <div className="tag">How It Works</div>
            <h2>Discover, choose the right fixes, clean it up, then train the team.</h2>
            <p>
              The process is practical and owner-approved. We do not automate for the sake of automation. We fix the places where clarity, ownership, handoffs, or repeated admin work are causing real pain.
            </p>
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
            <div className="tag">What Success Looks Like</div>
            <h2>Fewer missed details, fewer repeated questions, and less status chasing.</h2>
            <p>
              The goal is not a fancy system. The goal is a calmer business where people can find the information, own the next step, and keep work moving.
            </p>
          </div>

          <div className="deliv-grid">
            {outcomeCards.map((item) => (
              <div key={item.title} className="deliv-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="deliv-artifact">
            <div className="deliv-artifact-copy">
              <div className="deliv-num">Example</div>
              <h3>Make the hidden mess visible.</h3>
              <p>
                Before anything gets changed, we map where jobs are getting delayed, details are being re-entered, customers are waiting, or the team is relying on memory to know what happens next.
              </p>
            </div>
            <div className="deliv-artifact-frame">
              <Image
                className="deliv-artifact-img"
                src="/process-systems-map.svg"
                alt="Sample operations map showing leads moving through sales, onboarding, delivery, and support with gaps highlighted."
                width={1200}
                height={520}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg2)", padding: "80px 0" }}>
        <div className="container">
          <div className="offer-summary-grid">
            <div>
              <div className="tag">Best Fit</div>
              <h2 className="offer-summary-title">Built for operations-heavy businesses with real handoffs.</h2>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 28 }}>
                Cohevo is a good fit when the business has customers to update, providers or vendors to coordinate, bookings or orders to track, billing to follow through on, and a team that needs a clearer way to run the work.
              </p>
              <Link className="btn btn-primary" href="/contact">
                Get a Free Operations Audit →
              </Link>
            </div>
            <div className="offer-summary-badge">
              <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                Strong fits
              </div>
              <h3>Businesses that usually need this</h3>
              <ul className="pricing-features" style={{ color: "var(--on-strong)", marginTop: 20 }}>
                {bestFits.map((fit) => (
                  <li key={fit}>{fit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
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
          <h2>Ready for the business to feel less chaotic?</h2>
          <p>
            Book a free 30-minute operations audit. We will look at where work gets dropped, what still depends on you, and what should be cleaned up first.
          </p>
          <Link className="btn btn-primary btn-xl" href="/contact" style={{ background: "var(--accent-fill)", color: "var(--on-accent)" }}>
            Get a Free Operations Audit →
          </Link>
        </div>
      </div>
    </>
  );
}
