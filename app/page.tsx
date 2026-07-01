import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { submitContactForm } from "./contact/actions";

const homepageDescription =
  "A focused business systems audit for owners whose tools, workflows, and follow-up feel messy. Get a clear read on what to fix first.";

export const metadata = buildMetadata({
  title: "Cohevo Business Systems Audit",
  description: homepageDescription,
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo Business Systems Audit",
});

const feelItems = [
  "Leads, client notes, files, tasks, and follow-up are spread across too many places.",
  "You keep holding the system together because no one else can see the whole flow.",
  "You know something is inefficient, but it is hard to tell what should change first.",
] as const;

const auditItems = [
  "We look at the real flow of work, not the polished version.",
  "We find where information gets lost, duplicated, delayed, or pushed back to you.",
  "We separate tool problems from workflow problems.",
  "We choose the few fixes that would create the most relief first.",
] as const;

const recapItems = [
  "What is actually broken",
  "What to clean up first",
  "Which tools or workflows make sense",
  "What not to build yet",
] as const;

const packageItems = [
  {
    name: "1-Hour Consulting Call",
    price: "$500",
    description: "A focused 60-minute strategy session to look at your current setup, find the obvious inefficiencies, and define the next steps that would actually help. Good for solopreneurs or small teams who need someone to make sense of the mess quickly.",
    includes: ["Pre-call intake", "60-minute strategy call", "Current setup review", "Main inefficiencies and bottlenecks", "Actionable next steps"],
  },
  {
    name: "Deep Dive + Short Report",
    price: "$1,500",
    description: "A 90-minute deep dive followed by a short written report with key findings, recommended tools, and workflow improvements. Good for growing teams that need documentation they can act on, not just another conversation.",
    includes: ["Detailed intake", "90-minute deep dive", "Key findings report", "Recommended tools", "Workflow improvements"],
  },
  {
    name: "3-Week System Audit & Strategy Report",
    price: "$3,500",
    description: "A complete 3-week consulting engagement with interviews, process mapping, and a full 10 to 15 page strategy report. Good for businesses that are ready to understand the whole system and hand the team a real roadmap for what should happen next.",
    includes: ["3-week audit", "Owner and team interviews", "Process mapping", "10 to 15 page strategy report", "Detailed recommendations and roadmap"],
  },
] as const;

const contactOptions = [
  siteConfig.whatsAppUrl
    ? {
        href: siteConfig.whatsAppUrl,
        icon: "💬",
        title: "Message me on WhatsApp",
        text: "Send: I am interested in a systems audit.",
      }
    : null,
  {
    href: `mailto:${siteConfig.contactEmail}?subject=Business%20Systems%20Audit&body=Hi%20David%2C%0A%0AI%27m%20interested%20in%20a%20business%20systems%20audit.%20The%20messiest%20part%20right%20now%20is%3A%0A`,
    icon: "✉️",
    title: "Send an email",
    text: siteConfig.contactEmail,
  },
  {
    href: "#form-section",
    icon: "📋",
    title: "Fill out the form",
    text: "A few honest details is enough to start.",
  },
].filter(Boolean) as Array<{ href: string; icon: string; title: string; text: string }>;

export default function HomePage() {
  return (
    <>
      <section className="clarity-ref-hero" id="top">
        <div className="clarity-ref-hero-inner">
          <span className="section-label">Cohevo Business Systems Audit</span>
          <h1>
            When your business feels <em>too tangled</em>, you need someone to look at the system.
          </h1>
          <p className="hero-sub">
            A focused audit with David Ehrentreu for business owners whose tools, workflows, follow-up, and handoffs have gotten messy.
          </p>
          <div className="hero-proof-strip" aria-label="Audit summary">
            <span>Tool + workflow review</span>
            <span>Written recommendations</span>
            <span>Clear next steps</span>
          </div>
          <div className="hero-actions">
            <a href="#start" className="clarity-btn-primary">Start with a Message</a>
            <a href="#audit" className="clarity-btn-secondary">See the Audit</a>
          </div>
          <p className="hero-note">For owners who are tired of being the backup system.</p>
        </div>
      </section>

      <section className="clarity-ref-section">
        <div className="clarity-ref-container">
          <span className="section-label">The problem</span>
          <h2>The tools may not be the real issue. The flow underneath them is usually where the mess lives.</h2>
          <div className="divider" />

          <div className="overwhelm-grid">
            {feelItems.map((item) => (
              <div className="overwhelm-card" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="clarity-ref-section" id="audit">
        <div className="clarity-ref-container">
          <span className="section-label">The audit</span>
          <h2>A focused review of one messy part of the business.</h2>
          <div className="divider" />
          <p>
            We look at how work moves from first inquiry to delivery, where status disappears, which tools are helping, and which ones are making things heavier.
          </p>

          <ul className="features-list">
            {auditItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="pivot-block">
            <p>The goal is simple: fewer vague problems, clearer language for what is broken, and a short list of fixes that actually make sense.</p>
          </div>
        </div>
      </section>

      <section className="clarity-ref-section">
        <div className="clarity-ref-container">
          <span className="section-label">What you leave with</span>
          <h2>A written readout you can act on.</h2>
          <div className="divider" />
          <p>Not a giant deck. A clear recap of what matters now.</p>

          <div className="deliverables recap-deliverables">
            {recapItems.map((item) => (
              <div className="deliverable" key={item}>
                <h4>{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clarity-ref-section">
        <div className="clarity-ref-container">
          <span className="section-label">Who this is with</span>
          <h2>You will be speaking with David Ehrentreu.</h2>
          <div className="divider" />
          <p>
            I am not here to sell every business a complicated tech stack. My strength is seeing the system underneath the mess: where information gets lost, where tools fight the workflow, and where a simpler setup would help.
          </p>
          <div className="quote-block">
            <p>A lot of business clarity comes from seeing the actual flow of work. A lot of relief comes from fixing the right few things first.</p>
          </div>
        </div>
      </section>

      <section className="clarity-ref-section" id="offer">
        <div className="clarity-ref-container">
          <div className="centered-heading">
            <span className="section-label">The options</span>
            <h2>Choose the level that matches the mess.</h2>
            <div className="divider" />
          </div>

          {packageItems.map((pkg) => (
            <div className="pricing-card" key={pkg.name}>
              <span className="pricing-label">Cohevo</span>
              <div className="pricing-title">{pkg.name}</div>
              <p>{pkg.description}</p>
              <ul className="pricing-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="pricing-price">
                <div>
                  <div className="price-intro">Starting at</div>
                  <div className="price-line">
                    <span className="price-amount">{pkg.price.replace("$", "")}</span>
                    <span className="price-currency">USD</span>
                  </div>
                </div>
              </div>
              <a href="#start" className="clarity-btn-primary block">Ask About This Option</a>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="start">
        <div className="clarity-ref-container">
          <span className="section-label">How to start</span>
          <h2>Send me a few words about the messiest part of your business right now.</h2>
          <div className="divider" />
          <p>You do not need to explain it perfectly. That is what the audit is for.</p>

          <div className="contact-options">
            {contactOptions.map((option) => (
              <a href={option.href} className="contact-option" key={option.title}>
                <span className="contact-option-icon">{option.icon}</span>
                <h4>{option.title}</h4>
                <p>{option.text}</p>
              </a>
            ))}
          </div>

          <div className="contact-form" id="form-section">
            <h3>Fill out the form</h3>
            <form action={submitContactForm}>
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
              >
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="What should I call you?" autoComplete="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="How to reach you" autoComplete="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Business / Company</label>
                  <input id="company" name="company" type="text" placeholder="Optional" autoComplete="organization" />
                </div>
                <div className="form-group">
                  <label htmlFor="teamSize">Team size</label>
                  <input id="teamSize" name="teamSize" type="text" placeholder="Just you, small team, growing team..." />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">What feels messy right now?</label>
                <textarea id="message" name="message" placeholder="A few honest details is enough. Tools, workflows, follow-up, leads, clients, team handoffs, admin, whatever is taking too much space." required />
              </div>
              <input type="hidden" name="bottleneck" value="Business systems audit" />
              <button type="submit" className="form-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
