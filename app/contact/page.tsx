import { buildMetadata } from "@/lib/seo";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { bottleneckOptions, siteConfig, teamSizeOptions } from "@/lib/site";

import { CalBooking } from "./cal-booking";
import { submitContactForm } from "./actions";

export const metadata = buildMetadata({
  title: "Free Operations Audit",
  description:
    "Get a free 30-minute operations audit and find the places where work is getting dropped, delayed, duplicated, or stuck in someone’s head.",
  path: "/contact",
  ogImage: siteConfig.ogImages.splitLime,
  ogImageAlt: "Cohevo free operations audit preview",
});

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getErrorMessage(errorValue?: string | string[]) {
  const error = Array.isArray(errorValue) ? errorValue[0] : errorValue;

  if (error === "invalid-email") {
    return "Please enter a valid email address.";
  }

  if (error === "missing-fields") {
    return "Please enter your name and email before submitting.";
  }

  if (error === "delivery-failed") {
    return "We could not deliver your message right now. Please try again, or email us directly.";
  }

  return null;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const errorMessage = getErrorMessage(resolvedSearchParams.error);

  return (
    <>
      <JsonLd
        data={pageSchemas({
          path: "/contact",
          title: "Free Operations Audit | Cohevo",
          description:
            "Get a free 30-minute operations audit and find the places where work is getting dropped, delayed, duplicated, or stuck in someone’s head.",
          type: "ContactPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ],
        })}
      />
      <div className="inner-hero">
        <div className="container">
          <div className="tag">Free Operations Audit</div>
          <h1>Find where the business is harder to run than it should be.</h1>
          <p>
            Book a free 30-minute audit or send a message. You will get a straight answer on what is messy, what is
            worth fixing first, and whether Cohevo is the right fit to help.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="tag">Recommended</div>
              <h2 style={{ fontSize: 24, marginBottom: 8 }}>Book a Free Operations Audit</h2>
              <p style={{ color: "var(--ink3)", fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
                A free 30-minute call for small and medium businesses with messy operations. We will identify the 3–5 places
                where details are getting dropped, duplicated, delayed, or stuck in someone’s head.
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="https://cal.com/cohevo/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginBottom: 24 }}
              >
                Book the 30-min audit →
              </a>
              <CalBooking />
              <div
                style={{
                  marginTop: 32,
                  padding: 24,
                  background: "var(--bg2)",
                  borderRadius: "var(--r)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="mono" style={{ marginBottom: 8 }}>
                  Direct contact
                </div>
                <p style={{ fontSize: 15, color: "var(--ink2)" }}>{siteConfig.contactEmail}</p>
                <p style={{ fontSize: 13, color: "var(--ink3)", marginTop: 6 }}>Response within one business day.</p>
              </div>
            </div>

            <div id="checklist">
              <h2 style={{ fontSize: 24, marginBottom: 8 }}>Or send a message</h2>
              <p style={{ color: "var(--ink3)", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
                Tell me where the business feels messy and I will follow up with initial thoughts plus a link to book your audit.
              </p>

              {errorMessage ? (
                <div className="form-error" role="alert" aria-live="polite">
                  {errorMessage}
                </div>
              ) : null}

              <form action={submitContactForm}>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="form-input"
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="teamSize">
                      Team size
                    </label>
                    <select id="teamSize" name="teamSize" className="form-select" defaultValue="">
                      <option value="">Select...</option>
                      {teamSizeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="bottleneck">
                    Biggest bottleneck right now
                  </label>
                  <select id="bottleneck" name="bottleneck" className="form-select" defaultValue="">
                    <option value="">Select the biggest one...</option>
                    {bottleneckOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me what still depends on you, where details get lost, and which tools feel messy."
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-group" htmlFor="checklistOpt">
                    <input id="checklistOpt" type="checkbox" name="checklist" />
                    <span>Send me the operations cleanup checklist (free)</span>
                  </label>
                </div>

                <button type="submit" className="form-submit">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
