export const siteConfig = {
  name: "Business Systems Architect",
  tagLine: "Simplify how your business runs.",
  description:
    "In 30 days I simplify tools, workflows, automations, and AI so your team moves faster.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  ogImage: "/og-image.svg",
  contactEmail: "hello@businesssystemsarchitect.com",
  calendlyPlaceholderUrl: "https://calendly.com/your-handle/business-systems-call",
} as const;

export const navLinks = [
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
  { href: "mailto:hello@businesssystemsarchitect.com", label: "Email" },
] as const;

export const deliverables = [
  "Business Systems Map",
  "Tool Stack Architecture",
  "Automation Layer",
  "AI Workflow Layer",
  "Docs and Team Training",
] as const;

export const processPhases = [
  {
    name: "Discover",
    summary: "Map current workflows, bottlenecks, and constraints.",
    iDo: "Audit your current systems, interview stakeholders, and map workflow friction.",
    iNeed: "Access to key tools, one core stakeholder, and your current process notes.",
  },
  {
    name: "Design",
    summary: "Design the target system and implementation plan.",
    iDo: "Design workflows, define system owners, and choose the right tool architecture.",
    iNeed: "Fast feedback on priorities and approval on the implementation plan.",
  },
  {
    name: "Implement",
    summary: "Build workflows, automations, and clear handoffs.",
    iDo: "Configure tools, ship automations, and set up AI-powered workflow support.",
    iNeed: "Timely access permissions and one point person for internal coordination.",
  },
  {
    name: "Train",
    summary: "Document the system and train your team.",
    iDo: "Deliver SOPs, run training sessions, and hand over a clean operating manual.",
    iNeed: "Your team at one live walkthrough and agreement on ownership moving forward.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Our weekly operations meeting now ends with clear decisions.",
    name: "Maya Levin",
    role: "Founder, Arcwell Studio",
  },
  {
    quote:
      "We finally have one system of record. New hires ramp faster.",
    name: "Daniel Ross",
    role: "COO, North Harbor Labs",
  },
  {
    quote:
      "Automation removed manual handoffs we had tolerated for years.",
    name: "Nina Park",
    role: "Head of Operations, Lanebridge",
  },
] as const;

export const measurableOutcomes = [
  "Saved 10 hrs/week",
  "Cut onboarding time in half",
  "Reduced tool costs 20%",
] as const;

export const packages = [
  {
    name: "Foundation",
    price: "$6,000",
    description: "Systems map, architecture, and core automations.",
    popular: false,
    includes: [
      "Business Systems Map",
      "Tool Stack Architecture",
      "Basic automations",
      "Implementation roadmap",
    ],
  },
  {
    name: "Build",
    price: "$9,500",
    description: "End-to-end setup for teams that need speed.",
    includes: [
      "Everything in Foundation",
      "Full implementation",
      "AI workflows",
      "Documentation and team training",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$14,000",
    description: "Advanced automation plus support and reporting.",
    popular: false,
    includes: [
      "Everything in Build",
      "Advanced automations",
      "Analytics dashboards",
      "30-day post-launch support",
    ],
  },
] as const;

export const faqItems = [
  {
    question: "Who is this for?",
    answer:
      "Founder-led teams of 5 to 150 people that need cleaner operations.",
  },
  {
    question: "What tools do you work with?",
    answer:
      "Notion, Airtable, HubSpot, ClickUp, Asana, Slack, Zapier, Make, and AI copilots.",
  },
  {
    question: "Do you replace my ops manager?",
    answer:
      "No. I build the system, then equip your team to run it confidently.",
  },
  {
    question: "How much time will you need from us?",
    answer:
      "Most clients spend 2 to 4 hours per week on reviews, decisions, and team alignment.",
  },
  {
    question: "What if we already have tools set up?",
    answer:
      "Great. I optimize what is already working, remove duplication, and close workflow gaps.",
  },
  {
    question: "What if we need custom dev work?",
    answer:
      "I can scope custom development separately or collaborate with your engineering team where needed.",
  },
  {
    question: "Do you do ongoing support?",
    answer:
      "Yes. Ongoing stewardship is available as an add-on after the initial 30-day setup.",
  },
  {
    question: "How do you handle security?",
    answer:
      "I follow least-privilege access, document permissions, and avoid unnecessary data exposure across integrations.",
  },
  {
    question: "What deliverables do we keep?",
    answer:
      "You keep the full system map, architecture docs, SOPs, automation logic, and training materials.",
  },
  {
    question: "What results can we expect?",
    answer:
      "Most teams see faster handoffs, fewer dropped tasks, clearer reporting, and measurable time savings.",
  },
  {
    question: "How fast can we start?",
    answer:
      "New projects typically start within 2 to 3 weeks depending on scope and team readiness.",
  },
] as const;

export const teamSizeOptions = [
  "1-5",
  "6-15",
  "16-30",
  "31-75",
  "76-150",
  "150+",
] as const;

export const bottleneckOptions = [
  "lead handoff",
  "onboarding",
  "reporting",
  "support",
  "internal ops",
  "other",
] as const;
