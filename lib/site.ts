const defaultSiteUrl =
  process.env.NODE_ENV === "production" ? "https://www.cohevo.co" : "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/$/, "");

  try {
    const url = new URL(trimmedValue);

    // Production traffic is forced onto the HTTPS www host, so SEO-facing outputs
    // should always advertise the same canonical origin even if env vars use
    // the apex domain or the wrong scheme.
    if (url.hostname === "cohevo.co") {
      url.hostname = "www.cohevo.co";
    }

    if (url.hostname === "www.cohevo.co") {
      url.protocol = "https:";
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return trimmedValue;
  }
}

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl,
);

export const siteConfig = {
  name: "Cohevo",
  tagLine: "When your business feels too tangled, you need someone to look at the system.",
  description:
    "A business systems audit for owners whose tools, workflows, and follow-up have gotten too messy. Clear recommendations before anyone starts building.",
  url: siteUrl,
  ogImage: "/og-image.svg",
  ogImages: {
    homepageDefault: "/og-image.svg",
    homepageAlt: "/og-image.svg",
    splitLime: "/og-image.svg",
    blogAndServicePages: "/og-image.svg",
  },
  contactEmail: "hi@cohevo.co",
  whatsAppUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "",
} as const;

export const navLinks = [] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com/company/hicohevo", label: "LinkedIn" },
  { href: "mailto:hi@cohevo.co", label: "Email" },
] as const;

export const packages = [
  {
    name: "1-Hour Consulting Call",
    price: "$500",
    description:
      "A focused 60-minute strategy session to look at your current setup, find the obvious inefficiencies, and define the next steps that would actually help.",
  },
  {
    name: "Deep Dive + Short Report",
    price: "$1,500",
    description:
      "A 90-minute deep dive followed by a short written report with key findings, recommended tools, and workflow improvements.",
  },
  {
    name: "3-Week System Audit & Strategy Report",
    price: "$3,500",
    description:
      "A complete 3-week consulting engagement with interviews, process mapping, and a full 10 to 15 page strategy report.",
  },
] as const;

export const processPhases = [
  {
    title: "Review the current setup",
    description: "Look at the tools, workflows, handoffs, follow-up, files, and recurring operational friction.",
  },
  {
    title: "Find the bottlenecks",
    description: "Separate tool problems from process problems, unclear ownership, missing information, and unnecessary complexity.",
  },
  {
    title: "Recommend the next clean version",
    description: "Give the owner a practical written plan for what to keep, simplify, replace, automate, delegate, or ignore for now.",
  },
] as const;

export const faqItems = [
  {
    question: "Do you build the system too?",
    answer:
      "Not in this offer. This is an audit and recommendations offer. If implementation is needed, I can tell you what kind of help to look for.",
  },
  {
    question: "What tools can you review?",
    answer:
      "Common examples include Notion, Airtable, ClickUp, Monday, HubSpot, Google Workspace, spreadsheets, forms, Zapier, Make, CRMs, inbox workflows, and project management tools.",
  },
  {
    question: "Who is this for?",
    answer:
      "Business owners with real operational mess: leads, clients, projects, admin, follow-up, files, tasks, or team handoffs taking too much mental space.",
  },
] as const;

export const teamSizeOptions = ["Just me", "2 to 5", "6 to 15", "16 plus"] as const;

export const bottleneckOptions = [
  "Lead handoff and follow-up",
  "Customer onboarding",
  "Project or task management",
  "Reporting and visibility",
  "Internal ops and team coordination",
  "Other",
] as const;
