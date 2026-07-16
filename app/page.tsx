import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  HardDrive,
  Laptop,
  Mail,
  MapPin,
  MessageCircle,
  MonitorCog,
  ShieldCheck,
  UserRound,
  Wifi,
  Wrench,
} from "lucide-react";

import { JsonLd, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { faqItems, siteConfig } from "@/lib/site";
import { submitContactForm } from "./contact/actions";

const homepageDescription =
  "Friendly, practical technology help for websites, business tools, workflows, software, and computers. Remote help worldwide, with physical service in Carmei Gat and Kiryat Gat.";

export const metadata = buildMetadata({
  title: "Practical Technology Help",
  description: homepageDescription,
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo practical technology help",
});

const whatsAppUrl = siteConfig.whatsAppUrl;

const homeProblems = [
  { icon: MonitorCog, text: "A slow, unreliable, or newly purchased computer" },
  { icon: Wifi, text: "Wi-Fi, printer, or home-office problems" },
  { icon: HardDrive, text: "Backups, file transfers, storage, and setup" },
  { icon: ShieldCheck, text: "Software problems, updates, and safer everyday use" },
] as const;

const businessProblems = [
  { icon: Laptop, text: "A broken, outdated, or confusing website" },
  { icon: Mail, text: "Business email, domains, forms, or booking systems" },
  { icon: Building2, text: "Scattered files, duplicated tools, and lost follow-up" },
  { icon: Wrench, text: "Small technical problems nobody has time to own" },
] as const;

const offers = [
  {
    number: "01",
    name: "Quick Tech Rescue",
    label: "Best place to start",
    description:
      "A focused working session for one frustrating technology problem. We troubleshoot it together and make as much progress as the session allows.",
    prices: [
      { amount: "₪450", note: "remote" },
      { amount: "₪600", note: "onsite" },
    ],
    includes: [
      "Up to 90 minutes of hands-on help",
      "Clear explanation of what went wrong",
      "Approval before any extra work or cost",
      "Short written recap and next steps",
    ],
    featured: true,
  },
  {
    number: "02",
    name: "Small Business Tech Cleanup",
    label: "For a bigger mess",
    description:
      "A focused review of your computers, website, email, files, forms, backups, and everyday workflow, followed by fixes to the three most important problems in the agreed scope.",
    prices: [{ amount: "₪2,500", note: "starting at" }],
    includes: [
      "Current setup review",
      "Three priorities chosen with you",
      "Hands-on fixes within scope",
      "Practical handover notes",
    ],
    featured: false,
  },
  {
    number: "03",
    name: "Monthly Tech Care",
    label: "For ongoing support",
    description:
      "A reliable technology person for small questions, routine checks, and the fixes that otherwise sit on your list for months.",
    prices: [{ amount: "₪900", note: "per month" }],
    includes: [
      "Two hours of remote support",
      "Priority response during working hours",
      "Basic website, domain, and backup checks",
      "Additional work quoted separately",
    ],
    featured: false,
  },
] as const;

const steps = [
  {
    number: "1",
    title: "Send the problem",
    text: "A sentence, screenshot, photo, or voice note is enough. You do not need to know the technical name for it.",
  },
  {
    number: "2",
    title: "Get a clear next step",
    text: "I will tell you whether it fits a rescue session, onsite visit, cleanup project, or something outside my scope.",
  },
  {
    number: "3",
    title: "Fix it without surprises",
    text: "We agree on the scope and price first. If the problem is bigger than expected, I stop and explain the options.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />

      <section className="rescue-hero" id="top">
        <div className="rescue-shell rescue-hero-grid">
          <div className="rescue-hero-copy">
{/*            <div className="rescue-eyebrow">
              <span className="rescue-status-dot" aria-hidden="true" />
              Practical technology help
            </div>*/}
            <h1>
              Technology problem?
              <span>Let&apos;s get it working.</span>
            </h1>
            <p className="rescue-hero-lede">
              Friendly, practical help with computers, Wi-Fi, websites, business email, backups, and confusing technology setups.
            </p>
            <div className="rescue-hero-actions">
              <a className="rescue-button rescue-button-primary" href={whatsAppUrl}>
                <MessageCircle aria-hidden="true" />
                WhatsApp David
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="rescue-button rescue-button-secondary" href="#offers">
                See prices
              </a>
            </div>
            <ul className="rescue-proof-list" aria-label="Service availability">
              <li><Check aria-hidden="true" /> Remote help worldwide</li>
              <li><Check aria-hidden="true" /> Onsite in Carmei Gat and Kiryat Gat</li>
              <li><Check aria-hidden="true" /> Price agreed before work begins</li>
            </ul>
          </div>

          <div className="rescue-diagnostic" aria-label="Examples of technology problems Cohevo can help with">
            <div className="rescue-diagnostic-topbar">
              <span>COHEVO / TECH RESCUE</span>
              <span className="rescue-live"><i aria-hidden="true" /> AVAILABLE</span>
            </div>
            <div className="rescue-diagnostic-body">
              <p className="rescue-diagnostic-label">WHAT&apos;S NOT WORKING?</p>
              <div className="rescue-issue-list">
                <div><span>01</span><strong>My computer is painfully slow</strong></div>
                <div><span>02</span><strong>The Wi-Fi or printer keeps dropping</strong></div>
                <div><span>03</span><strong>Our website form is broken</strong></div>
                <div><span>04</span><strong>Our files and tools are a mess</strong></div>
              </div>
              <div className="rescue-diagnostic-footer">
                <Wrench aria-hidden="true" />
                <p><strong>You do not need to diagnose it first.</strong><br />Show me what is happening and we will start there.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rescue-problem-strip" aria-label="How to start">
        <div className="rescue-shell">
          <span>NOT SURE WHAT KIND OF HELP YOU NEED?</span>
          <p>That is normal. Send the half-explained problem.</p>
          <a href={whatsAppUrl}>Tell me what&apos;s happening <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="rescue-section" id="services">
        <div className="rescue-shell">
          <div className="rescue-section-intro">
            <span className="rescue-kicker">Problems I can take off your plate</span>
            <h2>One person for the technology that keeps getting in the way.</h2>
            <p>Start with the problem you can see. If it points to a bigger setup issue, I will explain that without turning a small job into a sales pitch.</p>
          </div>

          <div className="rescue-audience-grid">
            <article className="rescue-audience-card">
              <div className="rescue-audience-heading">
                <UserRound aria-hidden="true" />
                <div><span>FOR HOME</span><h3>Everyday technology help</h3></div>
              </div>
              <ul>
                {homeProblems.map(({ icon: Icon, text }) => (
                  <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>
                ))}
              </ul>
            </article>

            <article className="rescue-audience-card rescue-audience-card-dark">
              <div className="rescue-audience-heading">
                <Building2 aria-hidden="true" />
                <div><span>FOR SMALL BUSINESS</span><h3>Technology and workflow help</h3></div>
              </div>
              <ul>
                {businessProblems.map(({ icon: Icon, text }) => (
                  <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-offers-section" id="offers">
        <div className="rescue-shell">
          <div className="rescue-offers-heading">
            <div>
              <span className="rescue-kicker">Three ways to work together</span>
              <h2>Start small. Go bigger only when the problem calls for it.</h2>
            </div>
            <p>Clear starting prices in shekels. Parts, paid software, and extensive travel are separate.</p>
          </div>

          <div className="rescue-offers-grid">
            {offers.map((offer) => (
              <article className={`rescue-offer-card${offer.featured ? " rescue-offer-card-featured" : ""}`} key={offer.name}>
                <div className="rescue-offer-topline">
                  <span>{offer.number}</span>
                  <span>{offer.label}</span>
                </div>
                <h3>{offer.name}</h3>
                <p className="rescue-offer-description">{offer.description}</p>
                <div className="rescue-price-row">
                  {offer.prices.map((price) => (
                    <div className="rescue-price" key={`${offer.name}-${price.note}`}>
                      <strong>{price.amount}</strong>
                      <span>{price.note}</span>
                    </div>
                  ))}
                </div>
                <ul className="rescue-includes">
                  {offer.includes.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}
                </ul>
                <a href={whatsAppUrl} className="rescue-offer-link">
                  Ask about this option <ArrowRight aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-process-section" id="process">
        <div className="rescue-shell rescue-process-grid">
          <div className="rescue-process-copy">
            <span className="rescue-kicker">How it works</span>
            <h2>You don&apos;t need to know what went wrong.</h2>
            <p>You work directly with me, David. I ask questions, explain what I see in normal language, and focus on the smallest useful solution.</p>
            <div className="rescue-person-card">
              <div className="rescue-monogram" aria-hidden="true">DE</div>
              <div>
                <strong>David Ehrentreu</strong>
                <span>Practical technology help</span>
              </div>
            </div>
          </div>

          <ol className="rescue-steps">
            {steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rescue-local-section" id="local">
        <div className="rescue-shell rescue-local-grid">
          <div>
            <span className="rescue-kicker rescue-kicker-light">Local computer service</span>
            <h2>Onsite repair and upgrades in Carmei Gat and Kiryat Gat.</h2>
          </div>
          <div className="rescue-local-details">
            <div><MapPin aria-hidden="true" /><p><strong>Local by appointment</strong><span>Laptops, desktops, home offices, and small-business setups.</span></p></div>
            <div><Clock3 aria-hidden="true" /><p><strong>Diagnosis: ₪100</strong><span>Credited toward repairs over ₪250. You approve the price before work begins.</span></p></div>
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-faq-section" id="faq">
        <div className="rescue-shell rescue-faq-grid">
          <div>
            <span className="rescue-kicker">Before you message</span>
            <h2>A few useful answers.</h2>
          </div>
          <div className="rescue-faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-contact-section" id="start">
        <div className="rescue-shell rescue-contact-grid">
          <div className="rescue-contact-copy">
            <span className="rescue-kicker rescue-kicker-light">Start here</span>
            <h2>Tell me what is frustrating you.</h2>
            <p>You do not need a polished explanation. Send a few words about what is happening and what you need to work again.</p>
            <a className="rescue-button rescue-button-lime" href={whatsAppUrl}>
              <MessageCircle aria-hidden="true" /> WhatsApp 054-787-0089 <ArrowRight aria-hidden="true" />
            </a>
            <a className="rescue-email-link" href={`mailto:${siteConfig.contactEmail}`}>
              Or email {siteConfig.contactEmail}
            </a>
            <div className="rescue-response-note">
              <span className="rescue-status-dot" aria-hidden="true" />
              I will reply with the most sensible next step, even if that means the job is not a fit.
            </div>
          </div>

          <div className="rescue-form-card" id="form-section">
            <div className="rescue-form-heading">
              <span>SHORT CONTACT FORM</span>
              <p>A short description is enough.</p>
            </div>
            <form action={submitContactForm}>
              <div className="rescue-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="rescue-form-row">
                <label>Your name<input name="name" type="text" autoComplete="name" required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label>Business name <span>(optional)</span><input name="company" type="text" autoComplete="organization" /></label>
              <label>
                What do you need help with?
                <select name="bottleneck" defaultValue="" required>
                  <option value="" disabled>Choose the closest option</option>
                  <option>Slow computer, repair, or upgrade</option>
                  <option>Wi-Fi, printer, backup, or device setup</option>
                  <option>Website, domain, form, or business email</option>
                  <option>Business tools, files, or workflow</option>
                  <option>Ongoing technology support</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>What is happening?<textarea name="message" rows={5} placeholder="For example: Our office printer keeps disconnecting, or our website form stopped sending emails..." required /></label>
              <button type="submit" className="rescue-form-submit">Send the problem <ArrowRight aria-hidden="true" /></button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
