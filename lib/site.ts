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
  tagLine: "Clean up messy operations so work stops falling through the cracks.",
  description:
    "Cohevo helps small and medium businesses clean up messy operations so work stops falling through the cracks and the owner gets pulled into fewer daily fires.",
  url: siteUrl,
  ogImage: "/og/homepage-default.png",
  ogImages: {
    homepageDefault: "/og/homepage-default.png",
    homepageAlt: "/og/homepage-alt.png",
    splitLime: "/og/split-lime.png",
    blogAndServicePages: "/og/blog-and-service-pages.png",
  },
  contactEmail: "hi@cohevo.co",
} as const;

export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/offer", label: "Offer" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com/company/hicohevo", label: "LinkedIn" },
  { href: "#", label: "X" },
  { href: "mailto:hi@cohevo.co", label: "Email" },
] as const;

export const benefitItems = [
  {
    number: "01 /",
    title: "Your team stops guessing",
    description: "Everyone knows where the work stands, who owns it, and what needs to happen next.",
  },
  {
    number: "02 /",
    title: "Details stop disappearing",
    description: "Customer notes, booking status, billing steps, and vendor updates have a real place to live.",
  },
  {
    number: "03 /",
    title: "Less time spent chasing",
    description: "The team spends less time asking for status, re-entering details, and checking if the next step happened.",
  },
  {
    number: "04 /",
    title: "The tools finally match the business",
    description: "Your monday.com board, CRM, forms, spreadsheets, or inbox setup gets organized around the real work.",
  },
  {
    number: "05 /",
    title: "The business feels lighter to run",
    description: "You get fewer small questions, fewer loose ends, and more space to lead instead of babysit the details.",
  },
] as const;

export const processTimeline = [
  {
    icon: "🔍",
    title: "Find the mess",
    description: "We look at the real day-to-day work and find where details get lost, delayed, duplicated, or routed back to you.",
    active: true,
  },
  {
    icon: "🏗️",
    title: "Decide what needs fixing",
    description: "We choose the few changes that will make the biggest difference, not a giant wish list nobody has time to use.",
    active: false,
  },
  {
    icon: "⚡",
    title: "Clean it up",
    description: "We set up the boards, forms, views, automations, and instructions your team will actually use.",
    active: false,
  },
  {
    icon: "🎓",
    title: "Hand it to the team",
    description: "Your team learns how to run the cleaned-up process so the owner is not the backup plan for every detail.",
    active: false,
  },
] as const;

export const processPhases = [
  {
    number: "01",
    phase: "Phase One",
    title: "Discover and Map",
    description:
      "This phase is about understanding how your business actually works, not how it is supposed to work on paper. I review the tools, talk through the day-to-day, and map the messy handoffs.",
    whatIDo: [
      "90-minute kickoff and operations walkthrough",
      "Full review of tools, boards, forms, spreadsheets, and handoffs",
      "Identify where details get dropped, duplicated, delayed, or stuck",
      "Deliver a clear operations map",
    ],
    whatINeed: [
      "Access to your main tools (view-only is fine)",
      "90 minutes for the kickoff call",
      "Your three biggest pain points in writing",
    ],
    artifact: {
      src: "/process-systems-map.svg",
      alt: "Operations map showing customer, booking, billing, provider, and internal task flows with gap callouts.",
      width: 1200,
      height: 520,
    },
    artifactHeight: 260,
  },
  {
    number: "02",
    phase: "Phase Two",
    title: "Pick the Fixes",
    description:
      "Using the map as the starting point, I show what should change first, what can stay, and what is not worth touching. You approve the plan before anything gets built.",
    whatIDo: [
      "Recommend what to keep, clean up, connect, or replace",
      "Design the cleanup logic for each recurring process",
      "Identify where automation would actually save time",
      "Present the cleanup plan for your sign-off",
    ],
    whatINeed: [
      "45-minute cleanup plan review call",
      "Feedback and approval on the proposed stack",
      "Budget context for any new tool recommendations",
    ],
    artifact: null,
    artifactHeight: 0,
  },
  {
    number: "03",
    phase: "Phase Three",
    title: "Clean Up and Automate",
    description:
      "I clean up the process inside your live environment. You see progress as it happens, and everything is tested before handoff.",
    whatIDo: [
      "Configure and connect the approved tools",
      "Build automations with Zapier, Make, or n8n",
      "Set up automation and helpful prompts where they make sense",
      "Test every important handoff from start to finish",
    ],
    whatINeed: [
      "Admin access to the relevant tools",
      "Quick async replies during build phase (under 1 hr/day)",
      "Test data to run automations against",
    ],
    artifact: {
      src: "/process-automation-flow.svg",
      alt: "Automation flow connecting a sold package to customer status, provider updates, billing, and internal next steps.",
      width: 1200,
      height: 460,
    },
    artifactHeight: 240,
  },
  {
    number: "04",
    phase: "Phase Four",
    title: "Document and Train",
    description:
      "The work is only complete when your team can run it without me. I write simple instructions and run a live training session so the handoff is real.",
    whatIDo: [
      "Write simple instructions for each cleaned-up process",
      "Record a walkthrough video of the cleaned-up setup",
      "Run a live training session with your team",
      "Answer questions and refine for 7 days post-launch",
    ],
    whatINeed: [
      "60-minute team training session",
      "Feedback on SOPs within 3 days",
      "Confirmation that the cleaned-up process is working as expected",
    ],
    artifact: null,
    artifactHeight: 0,
  },
] as const;

export const testimonials = [
  {
    quote:
      "We had seven tools that didn't talk to each other. Within a month, the whole stack was connected and our onboarding time dropped dramatically.",
    initials: "JR",
    name: "Jamie R.",
    role: "Co-founder, Stackwave",
  },
  {
    quote:
      "I stopped being a bottleneck. The automations handle what used to take me two hours every morning. That time goes to actual strategy now.",
    initials: "MK",
    name: "Maya K.",
    role: "Founder, Lumen Agency",
  },
  {
    quote:
      "The systems map alone was worth it. We finally understood where work was getting lost and fixed it. The automations were a bonus on top.",
    initials: "TN",
    name: "Tom N.",
    role: "Head of Ops, Meridian Labs",
  },
] as const;

export const measurableOutcomes = [
  "Saved 10+ hrs per week",
  "Cut onboarding time in half",
  "Reduced tool costs by 20%",
] as const;

export const packages = [
  {
    name: "Foundation",
    price: "$6,000",
    description:
      "Start with the part of the business causing the most dropped balls, repeated questions, or owner cleanup. Good for teams that want focused relief first.",
    popular: false,
    includes: [
      "Clear before and after view of the painful area",
      "Specific fixes for ownership, status, and tool usage",
      "Up to 5 high-value operations improvements built and tested",
      "Simple team instructions for the cleaned-up process",
      "1 hour of team Q&A on delivery",
    ],
  },
  {
    name: "Build",
    price: "$9,500",
    description:
      "Clean up the recurring operational mess that keeps pulling the owner back into bookings, billing, customer updates, vendor follow-up, and team coordination.",
    includes: [
      "Everything in Foundation",
      "Up to 12 improvements across bookings, billing, customer follow-up, provider coordination, and ops",
      "Helpful automation where it saves real time, not where it adds noise",
      "Full SOP documentation package",
      "Live team training session (90 minutes)",
      "7-day post-launch support window",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$14,000",
    description:
      "For businesses that need deeper cleanup across departments, better visibility, and support after launch so the new habits stick.",
    popular: false,
    includes: [
      "Everything in Build",
      "Advanced multi-step handoffs, reminders, and automation sequences",
      "Clear visibility into status, ownership, and stuck work",
      "Deeper tool connections where the business case is clear",
      "60-day post-launch stewardship period",
      "Monthly ops review at end of support period",
    ],
  },
] as const;

export const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "Small to medium businesses with real customers, a small team, and too many details living in people’s heads. You should have existing revenue and recurring operational work. If bookings, billing, customer updates, vendor follow-up, or internal task management keep getting messy, this is probably the right time.",
  },
  {
    question: "What tools do you work with?",
    answer:
      "I usually work inside the tools you already have, then clean up or connect what is missing. That may include monday.com, Airtable, Notion, HubSpot, Google Workspace, forms, spreadsheets, email, Zapier, Make, or n8n. If the current setup is working in some areas, I keep it. If something is causing the mess, I flag it clearly.",
  },
  {
    question: "Do you replace our ops manager?",
    answer:
      "No. This is not an ongoing management role. If you have an ops manager, this gives them a cleaner setup to work from. If you do not have one yet, this can buy you time before you need to hire one. Ongoing cleanup is available as an add-on if you want continued support after handoff.",
  },
  {
    question: "How much time will you need from us?",
    answer:
      "Plan for two to three hours per week. The kickoff call takes 90 minutes. The cleanup plan review takes 45 minutes. The training session takes about an hour. Outside of those touchpoints, I may need quick answers during the build phase. I do the heavy lifting so you can stay focused on running the business.",
  },
  {
    question: "What if we already have tools set up?",
    answer:
      "That is the most common situation. Most clients come in with an existing stack that is partially working. The audit phase starts with what you have. I recommend replacements only when there is a clear and specific reason. Nothing gets ripped out without a better option ready to go.",
  },
  {
    question: "What if we need custom development work?",
    answer:
      "Custom software development is outside the scope of this engagement. This covers no-code and low-code automation using platforms like Zapier, Make, and n8n, plus native integrations between tools. If something requires custom engineering work, I will flag it clearly and can refer you to developers I trust.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. The Ongoing Stewardship add-on includes monthly check-ins, automation monitoring, and system updates as your business changes. This is available after any engagement. The Build and Scale packages also include a structured post-launch window for questions and refinements.",
  },
  {
    question: "How do you handle security and access?",
    answer:
      "I request the minimum level of access needed to do the work. View-only access is sufficient for the audit phase. Build access is needed for the implementation phase and is removed after handoff. I do not store credentials and do not retain access to your tools after the engagement ends. A clear access log is provided with your documentation.",
  },
  {
    question: "What do we keep?",
    answer:
      "Everything. The cleaned-up boards, forms, automations, documentation, and team instructions are yours. They live in your tools and your accounts. If the engagement ends, your team still has a clear process they can run independently.",
  },
  {
    question: "What results can we realistically expect?",
    answer:
      "Results vary by business and starting point, but the usual wins are fewer dropped details, less time spent chasing status, cleaner handoffs, and better visibility into what is stuck. If automation can save hours every week, we build it. If the fix is a cleaner board, better ownership, or simpler instructions, we do that instead.",
  },
  {
    question: "What does Cohevo mean?",
    answer:
      "Cohevo blends cohesive and evolve. That is the idea behind the work: make the messy parts of the business more cohesive, then leave the setup flexible enough to evolve as the business changes.",
  },
  {
    question: "How is payment handled?",
    answer:
      "All packages follow a 50/50 payment structure. The first half is due before the engagement starts. The second half is due on the day of your final training session and handoff. Payment is via bank transfer or Stripe invoice. No surprises, no scope creep.",
  },
] as const;

export const teamSizeOptions = ["1 to 3", "4 to 10", "11 to 20", "20 plus"] as const;

export const bottleneckOptions = [
  "Lead handoff and follow-up",
  "Customer onboarding",
  "Reporting and visibility",
  "Support and ticket management",
  "Internal ops and team coordination",
  "Other",
] as const;
