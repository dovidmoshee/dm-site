import Link from "next/link";
import { CheckCircle2, MinusCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "30-Day Systems Setup",
  description:
    "A 30-day systems setup to streamline workflows, automate handoffs, and create one reliable operating model for your team.",
  path: "/offer",
});

const bestFor = [
  "Founder-led teams that grew faster than their operations",
  "Teams juggling too many tools with no clear source of truth",
  "Businesses preparing to scale without adding operational chaos",
  "Leaders who want execution speed without process debt",
] as const;

const detailedDeliverables = [
  {
    title: "Business Systems Map",
    description: "A clear model of your core workflows, dependencies, and ownership.",
  },
  {
    title: "Tool Stack Architecture",
    description: "A practical design showing where each tool belongs and how data flows.",
  },
  {
    title: "Automation Layer",
    description: "High-leverage automations that remove repetitive work and reduce dropped tasks.",
  },
  {
    title: "AI Workflow Layer",
    description: "AI-assisted routines for faster drafting, triage, and internal decision support.",
  },
  {
    title: "Documentation and Team Training",
    description: "SOPs, ownership handoff docs, and live training to make adoption stick.",
  },
] as const;

const included = [
  "Discovery workshops and workflow audit",
  "System architecture and implementation plan",
  "Automation setup and QA",
  "AI workflow prompts and guardrails",
  "Documentation and team training session",
] as const;

const notIncluded = [
  "Custom software development",
  "24/7 managed operations support",
  "Paid tool subscriptions",
  "Data migration for legacy systems beyond scope",
] as const;

const timeline = [
  {
    week: "Week 1",
    summary: "Discover",
    detail: "Audit your tools and map process bottlenecks with key stakeholders.",
  },
  {
    week: "Week 2",
    summary: "Design",
    detail: "Finalize system architecture, ownership model, and implementation priorities.",
  },
  {
    week: "Week 3",
    summary: "Implement",
    detail: "Build workflows, configure tools, and deploy core automations.",
  },
  {
    week: "Week 4",
    summary: "Train and Handoff",
    detail: "Deliver documentation, run team training, and close with a future roadmap.",
  },
] as const;

const addOns = [
  {
    title: "Ongoing Systems Stewardship",
    description: "Monthly optimization, governance reviews, and incremental upgrades.",
  },
  {
    title: "Advanced Automations",
    description: "Multi-step automation logic, approval flows, and dashboard alerting.",
  },
] as const;

export default function OfferPage() {
  return (
    <>
      <section className="section-space pt-14">
        <Container className="space-y-6">
          <Badge variant="secondary" className="rounded-full px-4 py-1 uppercase tracking-[0.18em]">
            Offer
          </Badge>
          <h1 className="max-w-4xl text-4xl font-semibold sm:text-5xl">
            In 30 days, install a business operating system your team can run with confidence.
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            This fixed-scope engagement replaces fragmented workflows with clear process design,
            automation, and durable documentation.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/contact#book-call">Book a call</Link>
          </Button>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Best for" />
          <div className="grid gap-4 md:grid-cols-2">
            {bestFor.map((item) => (
              <Card key={item} className="rounded-3xl border-border/70 bg-white/85">
                <CardContent className="flex items-start gap-3 p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Detailed deliverables" />
          <div className="grid gap-4 md:grid-cols-2">
            {detailedDeliverables.map((item) => (
              <Card key={item.title} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-emerald-100 bg-emerald-50/70">
            <CardHeader>
              <CardTitle>Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 bg-slate-50/70">
            <CardHeader>
              <CardTitle>Not included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <MinusCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="30-day timeline" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item) => (
              <Card key={item.week} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardDescription className="font-mono text-xs uppercase tracking-[0.12em]">{item.week}</CardDescription>
                  <CardTitle>{item.summary}</CardTitle>
                  <CardDescription className="text-base">{item.detail}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Optional add-ons" />
          <div className="grid gap-4 md:grid-cols-2">
            {addOns.map((item) => (
              <Card key={item.title} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Want to know if this is the right fit?"
        description="Book a short call and I will recommend the right path based on your current systems and growth stage."
      />
    </>
  );
}
