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
  tagLine: "Something's not working? I'll help you fix it.",
  description:
    "Straightforward help with computers, websites, email, business tools, and other tech that isn't working. Remote help worldwide, with repairs in Carmei Gat and Kiryat Gat.",
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
    description: "Up to 90 minutes of hands-on remote help with one problem.",
  },
  {
    name: "Small Business Tech Cleanup",
    price: "₪2,500",
    description: "A review of your setup and fixes for the three biggest problems we agree on.",
  },
  {
    name: "Monthly Tech Care",
    price: "₪900/mo",
    description: "Remote help for small questions, routine checks, and jobs that keep getting put off.",
  },
] as const;

export const processPhases = [
  {
    title: "Send me what's happening",
    description: "A message, screenshot, photo, or voice note is fine.",
  },
  {
    title: "I'll tell you what I'd do",
    description: "You'll get a clear price before I start.",
  },
  {
    title: "We'll get to work",
    description: "If anything changes, I'll check with you first.",
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
