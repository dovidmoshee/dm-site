import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/sections/faq-list";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas, serviceSchema } from "@/lib/schema";
import { benefitItems, packages, processTimeline, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cohevo",
  description:
    "Cohevo helps small and medium businesses bring order to messy day-to-day operations so the owner can stop chasing every detail.",
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo operations cleanup preview",
});

const problemCards = [
  {
    title: "Too much depends on one person",
    description: "Orders, bookings, billing, vendor updates, and customer questions all seem to need the owner or one key employee to keep moving.",
  },
  {
    title: "Important details fall through the cracks",
    description: "A customer calls for status, an invoice is missed, a provider was never updated, or someone has to dig through texts to see what happened.",
  },
  {
    title: "You are busy, but not in control",
    description: "The team is working hard, but the business still feels reactive. Everyone is putting out fires instead of getting ahead of the week.",
  },
] as const;

const outcomeCards = [
  {
    title: "Your team knows what to do next",
    description: "The normal work has a clear home, a clear owner, and a clear next step. Fewer small questions come back to you.",
  },
  {
    title: "Nothing has to live in someone’s head",
    description: "Customer status, provider notes, billing, booking details, and internal tasks are visible without hunting across chats and spreadsheets.",
  },
  {
    title: "The business feels calmer to run",
    description: "People stop scrambling, handoffs stop getting missed, and the owner gets back time for customers, growth, and higher-value work.",
  },
] as const;

const previewFaq = [
  {
    question: "Who is this engagement for?",
    answer:
      "Small to medium businesses with a real team, real customers, and too many details living in people’s heads. If bookings, billing, customer updates, vendor follow-up, or internal tasks keep getting messy, this is for you.",
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
              "Cohevo helps small and medium businesses bring order to messy day-to-day operations so the owner can stop chasing every detail.",
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
                For businesses that have outgrown winging it
              </div>
              <h1>
                Bring order to the messy work that keeps <em>pulling you back in.</em>
              </h1>
              <p className="hero-sub">
                Cohevo helps small and medium businesses clean up the daily chaos: missed handoffs, unclear ownership, scattered customer details, billing gaps, and the constant need for the owner to check everything.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact">
                  Get a Free Operations Audit
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/contact#checklist">
                  Download the Checklist
                </Link>
              </div>

              {/* <div className="hero-proof">
                <div className="hero-proof-label">Trusted by owners and teams</div>
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
          <div className="section-head" style={{ marginBottom: 40 }}>
            <div className="tag">The Shift</div>
            <h2>From constant fires to a business that feels under control.</h2>
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
              <div className="tag">Cohevo 60-Day Engagement</div>
              <h2 className="offer-summary-title">
                Get the business organized enough that you can finally step back.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24 }}>
                Most small businesses do not need another consultant handing over a deck. They need someone to get into the actual mess: the bookings, invoices, customer updates, vendor follow-ups, spreadsheets, and tools people are already using.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 32 }}>
                Cohevo helps turn that mess into a cleaner way to run the business, so your team knows what is happening, what is stuck, and who owns the next step.
              </p>
              <Link className="btn btn-ghost" href="/offer">
                See Full Offer Details →
              </Link>
            </div>

            <div>
              <div className="offer-summary-badge">
                <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                  Cohevo Engagement
                </div>
                <h3>60-Day Business Cleanup</h3>
                <p>For owners and operators who are tired of being the person every answer, update, and loose end depends on.</p>

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
                  <div className="badge-stat-label">What changes</div>
                  <div className="badge-stat-value" style={{ fontSize: 16, fontWeight: 500 }}>
                    Clarity, control, follow-through
                  </div>
                </div>
                <Link
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: 24, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                  href="/contact"
                >
                  Get a Free Operations Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="section-head">
            <div className="tag" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
              What gets better
            </div>
            <h2>Less scrambling. Better follow-through. More room to lead.</h2>
            <p>The business still has moving parts. The difference is that people can see them, own them, and move them forward without everything going through you.</p>
          </div>

          <div className="deliv-grid">
            {benefitItems.map((item) => (
              <div key={item.title} className="deliv-card">
                <div className="deliv-num">{item.number}</div>
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
                Before anything gets changed, we find where jobs are getting delayed, details are being re-entered, customers are waiting, or the team is relying on memory to know what happens next.
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

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">How It Works</div>
            <h2>A practical path from “how do we do this again?” to “it’s handled.”</h2>
            <p>The engagement is structured, but the goal is simple: make the daily work clearer, calmer, and easier for the team to run.</p>
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

      <section style={{ background: "var(--bg2)", padding: "80px 0" }}>
        <div className="container">
          <div className="offer-summary-grid">
            <div>
              <div className="tag">Free Operations Audit</div>
              <h2 className="offer-summary-title">Find the places where the business is harder to run than it should be.</h2>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 20 }}>
                I will review one messy part of your operation, like bookings, billing, customer follow-up, vendor coordination, order tracking, or internal task management, and identify the 3–5 places where things are getting dropped, duplicated, delayed, or stuck in someone’s head.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 32 }}>
                If there is a clear fit, I will show you what I would fix first so the team gets more consistency without hiring another coordinator or forcing everyone into a complicated new tool.
              </p>
              <Link className="btn btn-primary" href="/contact">
                Get a Free Operations Audit →
              </Link>
            </div>
            <div className="offer-summary-badge">
              <div className="mono" style={{ color: "var(--on-strong-muted)", marginBottom: 8 }}>
                Founding Client Sprint
              </div>
              <h3>First 3 implementation clients</h3>
              <p>Preferred pricing in exchange for fast feedback, before/after metrics, and permission to create an anonymized case study.</p>
              <div className="badge-stat">
                <div className="badge-stat-label">Best fit</div>
                <div className="badge-stat-value" style={{ fontSize: 16, fontWeight: 500 }}>
                  Small to medium business with messy operations
                </div>
              </div>
              <div className="badge-stat">
                <div className="badge-stat-label">Focus</div>
                <div className="badge-stat-value" style={{ fontSize: 16, fontWeight: 500 }}>
                  Bookings, billing, follow-up, ops
                </div>
              </div>
              <Link
                className="btn btn-primary"
                style={{ width: "100%", marginTop: 24, background: "var(--accent-fill)", color: "var(--on-accent)" }}
                href="/contact"
              >
                Apply for Founding Client Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">Example Operations Cleanup</div>
            <h2>What changes when the business stops running on memory.</h2>
            <p>A concrete example from a business with packages, customers, providers, billing, and booking details moving at the same time.</p>
          </div>

          <div className="po-grid">
            <div className="po-card bad">
              <h3>Before</h3>
              <p>A package sells → someone checks the spreadsheet → someone else emails the hotel → billing status is unclear → the customer asks for an update → the team searches old messages to figure out what happened.</p>
            </div>
            <div className="po-card good">
              <h3>After</h3>
              <p>A package sells → the right board updates → owner, customer, provider, booking, billing, and next step are visible → the team can answer status questions without starting from scratch.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="tag">Pricing</div>
            <h2>Pick the level of relief your business needs.</h2>
            <p>Start with one painful area or clean up the bigger mess across bookings, billing, customer follow-up, provider coordination, and internal operations.</p>
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
                  {item.popular ? "Get a Free Operations Audit" : "See Details"}
                </Link>
              </div>
            ))}
          </div>

          <p className="pricing-recommendation">
            Not sure which fits?{" "}
            <Link href="/contact">
              Get a free operations audit and I&apos;ll recommend the right package.
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
          <h2>Ready for the business to feel less chaotic?</h2>
          <p>
            Book a free 30-minute operations audit. You will leave with the 3–5 places your team is losing time, dropping details, or routing decisions back to you.
          </p>
          <Link className="btn btn-primary btn-xl" href="/contact" style={{ background: "var(--accent-fill)", color: "var(--on-accent)" }}>
            Get a Free Operations Audit →
          </Link>
        </div>
      </div>
    </>
  );
}
