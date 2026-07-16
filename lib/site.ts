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
  tagLine: "When technology gets messy, I help make it work.",
  description:
    "Practical technology help for websites, business tools, workflows, software, and computers. Remote support worldwide, with local computer repair in Carmei Gat and Kiryat Gat.",
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
    name: "Remote Tech Rescue",
    price: "$150",
    description:
      "A focused 90-minute working session for one frustrating website, software, email, domain, or business-tool problem.",
  },
  {
    name: "Website or Systems Cleanup",
    price: "$750",
    description:
      "A focused project to review and improve one messy website, lead flow, client process, file system, tool setup, or recurring workflow.",
  },
  {
    name: "Ongoing Tech Support",
    price: "$300/mo",
    description:
      "Reliable remote support for questions, small fixes, monitoring, and ongoing practical improvements.",
  },
] as const;

export const processPhases = [
  {
    title: "Understand the problem",
    description: "Look at what is happening, what has already been tried, and what needs to work better.",
  },
  {
    title: "Choose the right scope",
    description: "Use a working session, focused project, ongoing support plan, or local repair depending on the problem.",
  },
  {
    title: "Fix and hand over",
    description: "Complete the agreed work, explain the important decisions, and provide clear next steps.",
  },
] as const;

export const faqItems = [
  {
    question: "Can you work with clients outside Israel?",
    answer:
      "Yes. Website, software, business-tool, workflow, and remote technology support are available worldwide.",
  },
  {
    question: "Where is physical computer repair available?",
    answer:
      "Physical computer repairs and upgrades are available by appointment in Carmei Gat and Kiryat Gat.",
  },
  {
    question: "What tools can you help with?",
    answer:
      "Common examples include websites, domains, business email, Google Workspace, forms, CRMs, Notion, Airtable, ClickUp, Monday, spreadsheets, Zapier, Make, cloud storage, and everyday computer software.",
  },
] as const;

export const teamSizeOptions = ["Personal", "Just me", "2 to 5", "6 to 15", "16 plus"] as const;

export const bottleneckOptions = [
  "Website or online technology",
  "Business tools or workflow",
  "Remote personal tech help",
  "Local computer repair or upgrade",
  "Ongoing technology support",
  "Other",
] as const;
