const defaultSiteUrl =
  process.env.NODE_ENV === "production" ? "https://www.cohevo.co" : "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/$/, "");

  try {
    const url = new URL(trimmedValue);
    if (url.hostname === "cohevo.co") url.hostname = "www.cohevo.co";
    if (url.hostname === "www.cohevo.co") url.protocol = "https:";
    return url.toString().replace(/\/$/, "");
  } catch {
    return trimmedValue;
  }
}

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl,
);

const defaultWhatsAppUrl =
  "https://wa.me/972547870089?text=Hi%20David%2C%20I%20need%20help%20with%20a%20technology%20problem.";

export const siteConfig = {
  name: "Cohevo",
  tagLine: "Technology problem? Let's get it working.",
  description:
    "Friendly, practical technology help for websites, business tools, workflows, software, and computers. Remote help worldwide, with physical service in Carmei Gat and Kiryat Gat.",
  url: siteUrl,
  ogImage: "/og-image.png",
  ogImages: {
    homepageDefault: "/og-image.png",
    homepageAlt: "/og-image.png",
    splitLime: "/og-image.png",
    blogAndServicePages: "/og-image.png",
  },
  contactEmail: "hi@cohevo.co",
  whatsAppUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || defaultWhatsAppUrl,
} as const;

export const navLinks = [] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com/company/hicohevo", label: "LinkedIn" },
  { href: "mailto:hi@cohevo.co", label: "Email" },
] as const;

export const packages = [
  {
    name: "Quick Tech Rescue",
    price: "₪450",
    description: "Up to 90 minutes of focused remote troubleshooting and hands-on help.",
  },
  {
    name: "Small Business Tech Cleanup",
    price: "₪2,500",
    description: "A focused review and fixes for the three most important technology problems in the agreed scope.",
  },
  {
    name: "Monthly Tech Care",
    price: "₪900/mo",
    description: "Reliable ongoing remote support, routine checks, and small practical fixes.",
  },
] as const;

export const processPhases = [
  {
    title: "Send the problem",
    description: "A sentence, screenshot, photo, or voice note is enough to begin.",
  },
  {
    title: "Get a clear next step",
    description: "Find out whether the problem fits a remote session, onsite visit, cleanup project, or another route.",
  },
  {
    title: "Fix it without surprises",
    description: "Agree on scope and price first, then complete the work with clear explanations and next steps.",
  },
] as const;

export const faqItems = [
  {
    question: "Where do you provide service?",
    answer:
      "Website, business-tool, workflow, software, and other remote technology help is available worldwide. Onsite visits and physical computer repairs are available by appointment in Carmei Gat and Kiryat Gat.",
  },
  {
    question: "What if I cannot explain the problem properly?",
    answer:
      "That is completely fine. Send a short description, screenshot, photo, or voice note. You do not need to diagnose the problem or know the technical terminology before getting in touch.",
  },
  {
    question: "What tools and problems can you help with?",
    answer:
      "Common examples include Windows computers, SSD and RAM upgrades, Wi-Fi, printers, backups, file transfers, websites, domains, business email, Google Workspace, forms, CRMs, Notion, Airtable, Monday, spreadsheets, Zapier, Make, and cloud storage.",
  },
  {
    question: "Will I know the price before you continue?",
    answer:
      "Yes. Quick Tech Rescue has a clear session price. Parts, paid software, extensive travel, or work beyond the agreed session are discussed and approved before I continue.",
  },
] as const;

export const teamSizeOptions = ["Personal", "Just me", "2 to 5", "6 to 15", "16 plus"] as const;

export const bottleneckOptions = [
  "Slow computer, repair, or upgrade",
  "Wi-Fi, printer, backup, or device setup",
  "Website, domain, form, or business email",
  "Business tools, files, or workflow",
  "Ongoing technology support",
  "Something else",
] as const;
