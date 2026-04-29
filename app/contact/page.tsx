import { buildMetadata } from "@/lib/seo";
import { bottleneckOptions, siteConfig, teamSizeOptions } from "@/lib/site";

import { CalBooking } from "./cal-booking";
import { submitContactForm } from "./actions";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a free 30-minute audit call or send a message to get a clear recommendation for your systems setup.",
  path: "/contact",
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
      <div className="inner-hero">
        <div className="container">
          <div className="tag">Get in Touch</div>
          <h1>Let&apos;s talk about your systems.</h1>
          <p>
            Book a free 30-minute audit call or send a message. Either way, you will get a straight answer about
            whether this is the right fit.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 8 }}>Book a Free Audit Call</h2>
              <p style={{ color: "var(--ink3)", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
                A free 30-minute call to walk through your current setup. No pitch. Just a clear picture of where the
                leverage is.
              </p>
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
                Tell me about your situation and I will follow up with some initial thoughts and a link to book time.
              </p>

              {errorMessage ? (
                <div className="form-error" role="alert" aria-live="polite">
                  {errorMessage}
                </div>
              ) : null}

              <form action={submitContactForm}>
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
                    placeholder="Tell me a bit about your current situation and what you are trying to fix."
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-group" htmlFor="checklistOpt">
                    <input id="checklistOpt" type="checkbox" name="checklist" />
                    <span>Send me the Business Systems Checklist (free)</span>
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
