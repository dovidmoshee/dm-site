import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { submitContactForm } from "./contact/actions";

const homepageDescription =
  "Practical technology help for websites, business tools, workflows, and computers. Remote support worldwide, with local computer repair in Carmei Gat and Kiryat Gat.";

export const metadata = buildMetadata({
  title: "Practical Technology Help",
  description: homepageDescription,
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo practical technology help",
});

const serviceItems = [
  {
    title: "Websites and online technology",
    text: "Fix broken pages, forms, domains, email, analytics, integrations, hosting problems, and the small technical issues that keep getting postponed. Available remotely worldwide.",
  },
  {
    title: "Business tools and workflows",
    text: "Clean up scattered tools, confusing handoffs, lost follow-up, messy files, and processes that depend too heavily on one person. Available remotely worldwide.",
  },
  {
    title: "Remote personal tech help",
    text: "Get patient help with software, backups, file transfers, email, cloud storage, device setup, and everyday technology problems from anywhere.",
  },
  {
    title: "Computer repair and upgrades",
    text: "Slow computers, SSD and RAM upgrades, Windows problems, cleaning, backups, and file transfers. Physical service is available locally in Carmei Gat and Kiryat Gat.",
  },
] as const;

const approachItems = [
  "Start with the problem that is costing you time, money, or energy.",
  "Choose the smallest useful format: a working session, a focused project, or ongoing support.",
  "Fix what is in scope and explain every important decision clearly.",
  "Leave you with a working result and practical next steps.",
] as const;

const packageItems = [
  {
    name: "Remote Tech Rescue",
    price: "$150",
    description:
      "A focused 90-minute working session for one frustrating technology problem. We troubleshoot together and make as much progress as the session allows.",
    includes: [
      "Short pre-session intake",
      "Up to 90 minutes of remote help",
      "Hands-on troubleshooting and fixes",
      "Clear written recap",
      "Useful for websites, email, domains, forms, software, and business tools",
    ],
  },
  {
    name: "Website or Systems Cleanup",
    price: "$750",
    description:
      "A focused project to review and improve one messy area, such as a website, lead flow, client process, file system, tool setup, or recurring workflow.",
    includes: [
      "Current setup review",
      "Prioritized fixes",
      "Hands-on implementation within the agreed scope",
      "Tool and workflow recommendations",
      "Handover notes and next steps",
    ],
  },
  {
    name: "Ongoing Tech Support",
    price: "$300/mo",
    description:
      "Reliable support for businesses that need a practical technology person available for questions, small fixes, and ongoing improvements.",
    includes: [
      "Two hours of remote support each month",
      "Priority response during working hours",
      "Small website and tool fixes",
      "Basic website and domain monitoring",
      "Monthly check-in and recommendations",
    ],
  },
] as const;

const whatsAppUrl =
  siteConfig.whatsAppUrl ||
  "https://wa.me/972547870089?text=Hi%20David%2C%20I%20need%20help%20with%20a%20technology%20problem.";

const contactOptions = [
  {
    href: whatsAppUrl,
    icon: "💬",
    title: "Message me on WhatsApp",
    text: "Send a few words about what is going wrong.",
  },
  {
    href: `mailto:${siteConfig.contactEmail}?subject=Technology%20Help&body=Hi%20David%2C%0A%0AI%20need%20help%20with%3A%0A`,
    icon: "✉️",
    title: "Send an email",
    text: siteConfig.contactEmail,
  },
  {
    href: "#form-section",
    icon: "📋",
    title: "Fill out the form",
    text: "A short description is enough to get started.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="clarity-ref-hero" id="top">
        <div className="clarity-ref-hero-inner">
          <span className="section-label">Cohevo Practical Technology Help</span>
          <h1>
            When technology gets <em>messy</em>, I help make it work.
          </h1>
          <p className="hero-sub">
            Practical help with websites, business tools, workflows, software, and computers. Remote support is available worldwide. Physical computer repair is available in Carmei Gat and Kiryat Gat.
          </p>
          <div className="hero-proof-strip" aria-label="Service summary">
            <span>Remote help worldwide</span>
            <span>Clear scope and pricing</span>
            <span>Local computer repair</span>
          </div>
          <div className="hero-actions">
            <a href="#start" className="clarity-btn-primary">Tell Me the Problem</a>
            <a href="#services" className="clarity-btn-secondary">See What I Help With</a>
          </div>
          <p className="hero-note">Start with the thing that is wasting the most time or causing the most frustration.</p>
        </div>
      </section>

      <section className="clarity-ref-section" id="services">
        <div className="clarity-ref-container">
          <span className="section-label">What I help with</span>
          <h2>One place to bring the technology problems that keep getting in the way.</h2>
          <div className="divider" />
          <p>
            Cohevo combines practical technical help with systems thinking. The work can be a small repair, a focused cleanup, or ongoing support.
          </p>

          <div className="deliverables recap-deliverables">
            {serviceItems.map((item) => (
              <div className="deliverable" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clarity-ref-section">
        <div className="clarity-ref-container">
          <span className="section-label">The approach</span>
          <h2>Begin with a real problem and build the right-sized solution.</h2>
          <div className="divider" />

          <ul className="features-list">
            {approachItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="pivot-block">
            <p>The goal is a useful result: a fixed problem, a cleaner setup, and less technology sitting in your head.</p>
          </div>
        </div>
      </section>

      <section className="clarity-ref-section">
        <div className="clarity-ref-container">
          <span className="section-label">Who you work with</span>
          <h2>You will be working directly with David Ehrentreu.</h2>
          <div className="divider" />
          <p>
            I work across technology, websites, marketing systems, business operations, and hands-on computer support. My strength is understanding what is actually happening, explaining it plainly, and finding a practical way forward.
          </p>
          <div className="quote-block">
            <p>You can bring me the half-explained problem. We will work out what it is and what should happen next.</p>
          </div>
        </div>
      </section>

      <section className="clarity-ref-section" id="offer">
        <div className="clarity-ref-container">
          <div className="centered-heading">
            <span className="section-label">Remote services</span>
            <h2>Choose the level of help that fits the problem.</h2>
            <div className="divider" />
            <p>Remote services are available to clients anywhere in the world. Prices are listed in USD.</p>
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

      <section className="clarity-ref-section" id="local-repair">
        <div className="clarity-ref-container">
          <span className="section-label">Local computer service</span>
          <h2>Physical computer repair and upgrades in Carmei Gat and Kiryat Gat.</h2>
          <div className="divider" />
          <p>
            Local service is available by appointment for laptops and desktop computers. Common jobs include slow-computer troubleshooting, SSD and RAM upgrades, Windows and software problems, internal cleaning, backups, and file transfers.
          </p>

          <div className="pivot-block">
            <p>Diagnosis is ₪100 and is credited toward repairs over ₪250. Parts and paid software are separate. You receive the price for approval before work begins.</p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="start">
        <div className="clarity-ref-container">
          <span className="section-label">How to start</span>
          <h2>Tell me what is going wrong and what you need to be working instead.</h2>
          <div className="divider" />
          <p>You can describe it in your own words. Screenshots, links, and photos can come after the first message.</p>

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
            <h3>Tell me about the problem</h3>
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
                  <label htmlFor="teamSize">Team / Situation</label>
                  <input id="teamSize" name="teamSize" type="text" placeholder="Personal, solo business, small team..." />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bottleneck">What kind of help do you need?</label>
                <select id="bottleneck" name="bottleneck" defaultValue="" required>
                  <option value="" disabled>Choose one</option>
                  <option>Website or online technology</option>
                  <option>Business tools or workflow</option>
                  <option>Remote personal tech help</option>
                  <option>Local computer repair or upgrade</option>
                  <option>Ongoing technology support</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">What is happening?</label>
                <textarea id="message" name="message" placeholder="Describe the problem, what you have tried, and what you need to be working." required />
              </div>
              <button type="submit" className="form-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
