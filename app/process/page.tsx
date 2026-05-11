import Image from "next/image";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { processPhases, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "Transparent, structured delivery in four phases: discover, design, implement, and train.",
  path: "/process",
  ogImage: siteConfig.ogImages.blogAndServicePages,
  ogImageAlt: "Cohevo Business OS service preview",
});

export default function ProcessPage() {
  return (
    <>
      <div className="inner-hero">
        <div className="container">
          <div className="tag">The Process</div>
          <h1>Transparent, structured, and built for busy founders.</h1>
          <p>
            No black box. You know what is happening in each phase, what you need to provide, and what I will deliver.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          {processPhases.map((phase) => (
            <div key={phase.number} className="phase-block">
              <div className="phase-header">
                <div className="phase-num-big">{phase.number}</div>
                <div className="phase-header-content">
                  <div className="mono">{phase.phase}</div>
                  <h2>{phase.title}</h2>
                  <p>{phase.description}</p>
                </div>
              </div>

              <div className="phase-cols">
                <div>
                  <div className="phase-col-title">What I do</div>
                  <ul className="check-list">
                    {phase.whatIDo.map((item) => (
                      <li key={item}>
                        <span className="ck">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="phase-col-title">What I need from you</div>
                  <ul className="check-list">
                    {phase.whatINeed.map((item) => (
                      <li key={item}>
                        <span className="ck">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {phase.artifact ? (
                <div style={{ marginTop: 28 }}>
                  <div className="artifact-graphic-wrap" style={{ minHeight: phase.artifactHeight }}>
                    <Image
                      className="artifact-graphic"
                      src={phase.artifact.src}
                      alt={phase.artifact.alt}
                      width={phase.artifact.width}
                      height={phase.artifact.height}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <div className="section-head">
              <div className="tag">What Success Looks Like</div>
              <h2>The outcomes you can expect.</h2>
            </div>
            <div className="success-grid">
              <div className="success-item">
                <div className="metric">10+ hrs</div>
                <p>Saved per week through automation of repetitive tasks</p>
              </div>
              <div className="success-item" style={{ background: "var(--surface-strong)", color: "var(--on-strong)" }}>
                <div className="metric" style={{ color: "var(--lime)" }}>
                  50%
                </div>
                <p>Reduction in onboarding time for new customers and team members</p>
              </div>
              <div className="success-item" style={{ background: "var(--bg2)", color: "var(--ink)" }}>
                <div className="metric">100%</div>
                <p style={{ color: "var(--ink2)" }}>Of workflows documented and owned by your team, not me</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="final-cta">
        <div className="container">
          <h2>See how this applies to your business.</h2>
          <p>Book a free audit call and we will walk through your specific situation together.</p>
          <Link className="btn btn-xl" style={{ background: "var(--accent-fill)", color: "var(--on-accent)", fontWeight: 600 }} href="/contact">
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  );
}
