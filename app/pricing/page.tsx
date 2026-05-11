import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas, pricingSchema } from "@/lib/schema";
import { packages, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Pricing",
  description: "Clear packages. No surprises. Choose Foundation, Build, or Scale.",
  path: "/pricing",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo Business OS service preview",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          ...pageSchemas({
            path: "/pricing",
            title: "Pricing",
            description: "Clear packages. No surprises. Choose Foundation, Build, or Scale.",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
            ],
          }),
          pricingSchema(),
        ]}
      />
      <div className="inner-hero">
        <div className="container">
          <div className="tag">Pricing</div>
          <h1>Clear packages. No surprises.</h1>
          <p>Every package delivers a complete, working system. Choose the scope that fits where you are right now.</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="pricing-grid" style={{ marginBottom: 32 }}>
            {packages.map((item) => (
              <div key={item.name} className={`pricing-card ${item.popular ? "popular" : ""}`.trim()}>
                {item.popular ? <div className="pricing-badge">Most Popular</div> : null}
                <div className="pricing-name">{item.name}</div>
                <div className="pricing-price">{item.price}</div>
                <div className="pricing-desc">{item.description}</div>
                <ul className="pricing-features">
                  {item.includes.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" style={{ width: "100%" }} href="/contact">
                  Book a Call
                </Link>
              </div>
            ))}
          </div>

          <div className="card" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: 36 }}>
            <div className="tag">Payment Terms</div>
            <h2 style={{ fontSize: 22, marginBottom: 10 }}>50% upfront, 50% on delivery</h2>
            <p style={{ color: "var(--ink3)", fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>
              All packages follow the same payment structure. The first payment kicks off the engagement. The second is
              due on the day of your final training session and system handoff.
            </p>
            <p style={{ fontSize: 14, color: "var(--ink3)" }}>
              Not sure which package is right?{" "}
              <Link style={{ color: "var(--accent)", fontWeight: 600 }} href="/contact">
                Book a call and I&apos;ll tell you exactly what fits.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container">
          <h2>Ready to pick your package?</h2>
          <p>Book a 30-minute call and we will figure out the right fit together.</p>
          <Link className="btn btn-xl" style={{ background: "var(--accent-fill)", color: "var(--on-accent)", fontWeight: 600 }} href="/contact">
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  );
}
