export const siteConfig = {
  name: "Calibrate Media",
  tagLine: "Install the operating system your business runs on.",
  description:
    "In 30 days I streamline your tools, workflows, automations, and AI so your team moves faster with less manual work.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  ogImage: "/og-image.svg",
  contactEmail: "hello@calibratemedia.co",
  calendlyPlaceholderUrl: "https://calendly.com/davidcalibrate/30-minute-info-session?hide_gdpr_banner=1",
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
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "X" },
  { href: "mailto:hello@calibratemedia.co", label: "Email" },
] as const;

export const deliverables = [
  {
    number: "01 /",
    title: "Business Systems Map",
    description: "A visual audit of every workflow, tool, and handoff point in your business.",
  },
  {
    number: "02 /",
    title: "Tool Stack Architecture",
    description: "A clean, justified recommendation for exactly which tools to use and why.",
  },
  {
    number: "03 /",
    title: "Automation Layer",
    description: "Live automations connecting your tools: lead capture, CRM updates, onboarding triggers.",
  },
  {
    number: "04 /",
    title: "AI Workflow Layer",
    description: "AI installed where it saves real time: meeting summaries, support drafts, reporting.",
  },
  {
    number: "05 /",
    title: "Docs and Training",
    description: "Written SOPs and a live walkthrough so your team can operate the system independently.",
  },
] as const;

export const processTimeline = [
  {
    icon: "🔍",
    title: "Discover",
    description: "Audit your tools, workflows, and pain points. Build the systems map.",
    active: true,
  },
  {
    icon: "🏗️",
    title: "Design",
    description: "Architect the stack. Define the automation logic. Get your sign-off.",
    active: false,
  },
  {
    icon: "⚡",
    title: "Implement",
    description: "Build the automations, AI workflows, and documentation. Test everything.",
    active: false,
  },
  {
    icon: "🎓",
    title: "Train",
    description: "Walk your team through the new system. Hand off cleanly. You're operational.",
    active: false,
  },
] as const;

export const processPhases = [
  {
    number: "01",
    phase: "Phase One",
    title: "Discover and Map",
    description:
      "The first week is about understanding how your business actually works, not how you think it works. I audit tools, run a workflow interview, and map every handoff.",
    whatIDo: [
      "90-minute kickoff and workflow interview",
      "Full audit of tools, integrations, and data flows",
      "Identify time-wasting areas and broken handoffs",
      "Deliver the Business Systems Map",
    ],
    whatINeed: [
      "Access to your main tools (view-only is fine)",
      "90 minutes for the kickoff call",
      "Your three biggest pain points in writing",
    ],
    artifact:
      "[ Business Systems Map Artifact — Visual workflow diagram showing your leads, sales, onboarding, and support flows with identified gaps ]",
    artifactHeight: 160,
  },
  {
    number: "02",
    phase: "Phase Two",
    title: "Design the Architecture",
    description:
      "Using the map as the foundation, I design the tool stack and automation logic. You review and approve before anything is built.",
    whatIDo: [
      "Recommend the right tools for your specific situation",
      "Design the automation logic for each workflow",
      "Define the AI use cases with expected time savings",
      "Present the architecture for your sign-off",
    ],
    whatINeed: [
      "45-minute architecture review call",
      "Feedback and approval on the proposed stack",
      "Budget context for any new tool recommendations",
    ],
    artifact: null,
    artifactHeight: 0,
  },
  {
    number: "03",
    phase: "Phase Three",
    title: "Implement and Automate",
    description:
      "I build every automation and AI workflow in your live environment. You see progress in real time. Everything is tested before handoff.",
    whatIDo: [
      "Configure and connect all approved tools",
      "Build automations with Zapier, Make, or n8n",
      "Set up AI workflows and prompts",
      "Test every automation end-to-end",
    ],
    whatINeed: [
      "Admin access to the relevant tools",
      "Quick async replies during build week (under 1 hr/day)",
      "Test data to run automations against",
    ],
    artifact:
      "[ Automation Flow Screenshot — Example Zapier or Make scenario showing lead form to CRM to onboarding sequence ]",
    artifactHeight: 140,
  },
  {
    number: "04",
    phase: "Phase Four",
    title: "Document and Train",
    description:
      "The build is only complete when your team can run it without me. I write the SOPs and run a live training session so the handoff is real.",
    whatIDo: [
      "Write SOPs for every new workflow",
      "Record a walkthrough video of the full system",
      "Run a live training session with your team",
      "Answer questions and refine for 7 days post-launch",
    ],
    whatINeed: [
      "60-minute team training session",
      "Feedback on SOPs within 3 days",
      "Confirmation that the system is working as expected",
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
      "Map your systems, design the right stack, and set up core automations. The right entry point for teams who want to understand before they build.",
    popular: false,
    includes: [
      "Business Systems Map (visual audit of all workflows)",
      "Tool Stack Architecture document",
      "Up to 5 core automations built and tested",
      "Written SOPs for each automated workflow",
      "1 hour of team Q&A on delivery",
    ],
  },
  {
    name: "Build",
    price: "$9,500",
    description:
      "Full implementation with AI workflows and team training. The most complete version of the engagement for growing teams.",
    includes: [
      "Everything in Foundation",
      "Up to 12 automations across leads, onboarding, and ops",
      "AI workflow layer (meeting summaries, support drafts, reporting)",
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
      "Advanced automations, analytics dashboards, and 30 days of post-launch support. Built for teams that want to move fast and stay fast.",
    popular: false,
    includes: [
      "Everything in Build",
      "Advanced multi-step automation sequences",
      "Custom analytics dashboard setup",
      "API integrations and custom webhook logic",
      "30-day post-launch stewardship period",
      "Monthly ops review at end of support period",
    ],
  },
] as const;

export const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "SaaS startups and agencies with 3 to 20 people. You should have existing revenue and a team that is growing but running on manual processes. If you are pre-product or pre-revenue, this engagement is likely premature. If your internal chaos is slowing you down, it is probably the right time.",
  },
  {
    question: "What tools do you work with?",
    answer:
      "Automations are built using Zapier, Make, or n8n depending on your needs. CRM, project management, and communication tools are selected based on your situation and existing stack. I work with tools like HubSpot, Notion, Airtable, Slack, Linear, Intercom, and most major SaaS platforms. If you have an existing stack I work within it where possible.",
  },
  {
    question: "Do you replace our ops manager?",
    answer:
      "No. This is a one-time infrastructure build, not an ongoing management role. If you have an ops manager, this engagement gives them a much better foundation to work from. If you do not have one yet, this buys you the time to grow before you need one. Ongoing stewardship is available as an add-on if you want continued support after handoff.",
  },
  {
    question: "How much time will you need from us?",
    answer:
      "Plan for two to three hours per week. The kickoff call takes 90 minutes. The architecture review takes 45 minutes. The training session takes 90 minutes. Outside of those touchpoints, async communication should be under one hour per day during the build week. I do the heavy lifting so you can stay focused on running your business.",
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
    question: "What deliverables do we keep?",
    answer:
      "Everything. The Business Systems Map, Tool Stack Architecture document, all built automations, the AI workflow setup, and the full SOP documentation package are yours. They live in your tools and your accounts. If the engagement ends, you have a complete, documented system that your team can run independently.",
  },
  {
    question: "What results can we realistically expect?",
    answer:
      "Results vary by business and starting point, but most clients save 8 to 15 hours per week across the team through automation. Onboarding times typically drop by 40 to 60 percent. Tool costs often decrease because you end up with fewer, better-used subscriptions. The harder-to-measure outcome is clarity: your team knows how things work and nothing falls through the cracks.",
  },
  {
    question: "How is payment handled?",
    answer:
      "All packages follow a 50/50 payment structure. The first half is due before the engagement starts. The second half is due on the day of your final training session and system handoff. Payment is via bank transfer or Stripe invoice. No surprises, no scope creep.",
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
