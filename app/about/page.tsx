import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "I build operating infrastructure for growing businesses with systems mapping, automation, and AI workflows.",
  path: "/about",
  ogImage: siteConfig.ogImages.homepageAlt,
  ogImageAlt: "Cohevo Business OS Setup overview",
});

const principles = [
  {
    title: "Clarity",
    description:
      "Every recommendation comes with a clear reason. No buzzwords, no vague advice. You should always know exactly why a decision is being made.",
  },
  {
    title: "Simplicity",
    description:
      "The best system is the one your team will actually use. I build for maintainability, not impressiveness. Complexity is a failure state.",
  },
  {
    title: "Reliability",
    description:
      "Automations that break are worse than no automations at all. Everything I build is tested, monitored, and designed to fail gracefully.",
  },
  {
    title: "Documentation",
    description:
      "If it is not documented, it does not exist. Every workflow I build has a written SOP so your team can operate and modify it without me.",
  },
] as const;

const credentials = [
  "Workflow design and process mapping",
  "Automation: Zapier, Make, n8n",
  "CRM architecture and implementation",
  "AI workflow integration",
  "SaaS and agency operations",
  "Systems documentation and training",
] as const;

export default function AboutPage() {
  return (
    <>
      <div className="inner-hero">
        <div className="container">
          <div className="tag">About</div>
          <h1>I build operating infrastructure for growing businesses.</h1>
          <p>
            Not a consultant who hands you a slide deck. A systems architect who builds, documents, and hands off
            something real.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>The gap between business goals and technical execution is where most teams get stuck.</h2>
              <p>
                I started Cohevo because I kept seeing the same problem: capable teams running on broken
                infrastructure. Good people spending hours on manual tasks that should take seconds. Smart founders who
                couldn&apos;t see the bottlenecks because they were too close to the day-to-day.
              </p>
              <p>
                My background spans business operations, workflow design, and technical implementation. I have worked
                with SaaS startups, agencies, and professional services firms to map their systems and build the
                automation layer that removes the manual overhead.
              </p>
              <p>
                I am not here to recommend tools or write strategy documents. I am here to build the thing, document it
                thoroughly, and make sure your team can run it without me. That is what I mean by an operating system
                for your business.
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
                <h3>Business Systems Architect</h3>
                <p>
                  Bridging the gap between how your business needs to run and the tools and automations that make it
                  happen.
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
                  Book a Free Audit Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
