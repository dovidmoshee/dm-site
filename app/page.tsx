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

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ContactSubmitButton } from "@/components/contact-submit-button";
import { submitContactForm } from "./contact/actions";

const homepageDescription =
  "Straightforward help with computers, websites, email, business tools, and other tech that isn't working. Remote help worldwide, with repairs in Carmei Gat and Kiryat Gat.";

export const metadata = buildMetadata({
  title: "Practical Technology Help",
  description: homepageDescription,
  path: "/",
  ogImage: siteConfig.ogImages.homepageDefault,
  ogImageAlt: "Cohevo practical technology help",
});

const whatsAppUrl = siteConfig.whatsAppUrl;

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const formErrorMessages: Record<string, string> = {
  "missing-fields": "Please fill in your name, email, help category, and a short description.",
  "invalid-email": "That email address doesn't look right. Please check it and try again.",
  "invalid-details": "One of the entries is too long. Please shorten it and try again.",
  "delivery-failed": "I couldn't send the form. Please try again, use WhatsApp, or email hi@cohevo.co.",
};

const homeProblems = [
  { icon: MonitorCog, text: "Slow computers and new computer setup" },
  { icon: Wifi, text: "Wi-Fi, printers, and home office problems" },
  { icon: HardDrive, text: "Backups, file transfers, and storage" },
  { icon: ShieldCheck, text: "Software problems and updates" },
] as const;

const businessProblems = [
  { icon: Laptop, text: "Websites that are broken, outdated, or hard to manage" },
  { icon: Mail, text: "Email, domains, forms, and booking systems" },
  { icon: Building2, text: "Files, business tools, and messy workflows" },
  { icon: Wrench, text: "CRM, spreadsheet, and automation setup" },
] as const;

const offers = [
  {
    name: "Quick Tech Rescue",
    description: "One problem, up to 90 minutes. We'll work on it together and get as far as we can.",
    prices: [
      { amount: "₪450", note: "remote" },
      { amount: "₪600", note: "onsite" },
    ],
    includes: [
      "Hands-on help",
      "A clear explanation",
      "A short recap with next steps",
    ],
    featured: true,
  },
  {
    name: "Small Business Tech Cleanup",
    description: "We'll go through the tech that's slowing your business down and fix the three biggest issues we agree on.",
    prices: [{ amount: "₪2,500", note: "starting at" }],
    includes: [
      "A review of your current setup",
      "Three priorities we'll choose together",
      "Fixes and simple handover notes",
    ],
    featured: false,
  },
  {
    name: "Monthly Tech Care",
    description: "For small questions, routine checks, and tech jobs that keep sitting on your list.",
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
    title: "Send me what's happening",
    text: "A message, photo, screenshot, or voice note is fine.",
  },
  {
    number: "2",
    title: "I'll tell you what I'd do",
    text: "You'll get a clear price before I start.",
  },
  {
    number: "3",
    title: "We'll get to work",
    text: "If anything changes, I'll check with you first.",
  },
] as const;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const rawError = params.error;
  const errorCode = Array.isArray(rawError) ? rawError[0] : rawError;
  const formError = errorCode ? formErrorMessages[errorCode] : undefined;

  return (
    <>
      <section className="rescue-hero" id="top">
        <div className="rescue-shell rescue-hero-grid">
          <div className="rescue-hero-copy">
            <h1>
              Something&apos;s not working?
              <span>I&apos;ll help you fix it.</span>
            </h1>
            <p className="rescue-hero-lede">
              Computers, Wi-Fi, websites, email, business tools, and other tech that&apos;s wasting your time.
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
            </ul>
          </div>

        </div>
      </section>

      <section className="rescue-section" id="services">
        <div className="rescue-shell">
          <div className="rescue-section-intro">
            <h2>What I can help with</h2>
          </div>

          <div className="rescue-audience-grid">
            <article className="rescue-audience-card">
              <div className="rescue-audience-heading">
                <UserRound aria-hidden="true" />
                <div><h3>At home</h3></div>
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
                <div><h3>For your business</h3></div>
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
              <h2>Ways to get help</h2>
            </div>
            <p>Parts, paid software, and long-distance travel cost extra.</p>
          </div>

          <div className="rescue-offers-grid">
            {offers.map((offer) => (
              <article className={`rescue-offer-card${offer.featured ? " rescue-offer-card-featured" : ""}`} key={offer.name}>
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
                  Message me about this <ArrowRight aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-process-section" id="process">
        <div className="rescue-shell rescue-process-grid">
          <div className="rescue-process-copy">
            <h2>Here&apos;s how it works</h2>
            <p>You&apos;ll deal with me, David, from start to finish.</p>
            <div className="rescue-person-card">
              <div className="rescue-monogram" aria-hidden="true">DE</div>
              <div>
                <strong>David Ehrentreu</strong>
                <span>Cohevo</span>
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
            <h2>Computer repairs in Carmei Gat and Kiryat Gat</h2>
          </div>
          <div className="rescue-local-details">
            <div><MapPin aria-hidden="true" /><p><strong>By appointment</strong><span>Laptops, desktops, home offices, and small-business setups.</span></p></div>
            <div><Clock3 aria-hidden="true" /><p><strong>Diagnosis: ₪100</strong><span>I&apos;ll deduct it from repairs over ₪250.</span></p></div>
          </div>
        </div>
      </section>

      <section className="rescue-contact-section" id="start">
        <div className="rescue-shell rescue-contact-grid">
          <div className="rescue-contact-copy">
            <h2>What&apos;s going wrong?</h2>
            <p>WhatsApp me or use the form. A few lines or a voice note is plenty.</p>
            <a className="rescue-button rescue-button-lime" href={whatsAppUrl}>
              <MessageCircle aria-hidden="true" /> WhatsApp 054-787-0089 <ArrowRight aria-hidden="true" />
            </a>
            <a className="rescue-email-link" href={`mailto:${siteConfig.contactEmail}`}>
              Or email {siteConfig.contactEmail}
            </a>
          </div>

          <div className="rescue-form-card" id="form-section">
            {formError ? (
              <div className="rescue-form-error" id="form-error" role="alert">
                {formError}
              </div>
            ) : null}
            <form action={submitContactForm}>
              <div className="rescue-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="rescue-form-row">
                <label>Your name<input name="name" type="text" autoComplete="name" maxLength={120} required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
              </div>
              <label>Business name <span>(optional)</span><input name="company" type="text" autoComplete="organization" maxLength={160} /></label>
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
              <label>What&apos;s happening?<textarea name="message" rows={5} maxLength={3000} placeholder="For example: our printer keeps disconnecting, or our website form stopped sending emails…" required /></label>
              <ContactSubmitButton />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
