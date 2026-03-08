import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Clock3,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/sections/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { deliverables, faqItems, measurableOutcomes, packages, processPhases, testimonials } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Calibrate Media",
  description:
    "In 30 days, simplify your tools, workflows, automations, and AI.",
  path: "/",
});

const problemCards = [
  {
    title: "Chaos",
    description: "Work is scattered and ownership is unclear.",
  },
  {
    title: "Manual work",
    description: "Your team repeats steps that should be automatic.",
  },
  {
    title: "Tool sprawl",
    description: "Too many tools, not enough process.",
  },
] as const;

const outcomeCards = [
  {
    title: "Clear workflows",
    description: "Each core process has clear steps and owners.",
  },
  {
    title: "Automated handoffs",
    description: "Key actions trigger the next step automatically.",
  },
  {
    title: "Single source of truth",
    description: "Everyone knows where work and decisions live.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="section-space pt-14 sm:pt-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <FadeIn className="space-y-6">
              <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                Business OS
              </Badge>
              <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
                Simplify how your business runs.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                In 30 days, I simplify your tools and workflows so your team moves faster with less manual work.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/contact#book-call">Book a call</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                  <Link href="/contact#checklist">Get checklist</Link>
                </Button>
              </div>
              <div className="rounded-3xl border border-border/70 bg-white/80 p-5 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Trusted by teams</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["North Harbor", "Arcwell", "Lanebridge", "Pilot Ridge"].map((logo) => (
                    <div
                      key={logo}
                      className="flex h-14 items-center justify-center rounded-2xl border border-border/70 bg-muted/30 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="relative">
              <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-teal-100/80 blur-2xl" />
              <div className="glass-card relative overflow-hidden rounded-[2rem] p-5">
                <Image
                  src="/workflow-nodes-1.svg"
                  alt="Abstract illustration of connected workflow nodes"
                  width={620}
                  height={500}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Before / After"
            title="From drag to flow"
            description="You do not need more tools. You need a clear system."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {problemCards.map((card) => (
              <Card key={card.title} className="rounded-3xl border-rose-100 bg-rose-50/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CircleDot className="h-5 w-5 text-rose-500" />
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {outcomeCards.map((card) => (
              <Card key={card.title} className="rounded-3xl border-emerald-100 bg-emerald-50/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container>
          <Card className="rounded-3xl border-border/70 bg-white/85 shadow-sm">
            <CardHeader className="space-y-4">
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]">
                Business OS
              </Badge>
              <CardTitle className="text-3xl">A focused 30-day build for simpler operations</CardTitle>
              <CardDescription className="max-w-3xl text-base">
                For founder-led teams that want a practical system they can run right away.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href="/offer">
                  See the Offer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/contact#book-call">Book a call</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="What you get" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <Card key={item} className="rounded-3xl border-border/70 bg-white/85">
                <CardContent className="flex items-center gap-3 p-5">
                  <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  <p className="font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading
            title="How implementation works"
            description="Four phases. Clear progress. No surprises."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processPhases.map((phase, index) => (
              <Card key={phase.name} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <div className="font-mono text-sm text-muted-foreground">0{index + 1}</div>
                  <CardTitle className="text-xl">{phase.name}</CardTitle>
                  <CardDescription className="text-base">{phase.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/process">
              See the Full Process <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Results" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="rounded-3xl border-border/70 bg-white/85">
                <CardContent className="space-y-4 p-6">
                  <p className="text-base">“{item.quote}”</p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {measurableOutcomes.map((item) => (
              <Card key={item} className="rounded-3xl border-teal-100 bg-teal-50/70">
                <CardContent className="flex items-center gap-3 p-5">
                  <Clock3 className="h-5 w-5 text-teal-700" />
                  <p className="font-semibold">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Packages" description="Pick the package that fits your team." />
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((item) => (
              <Card key={item.name} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{item.name}</CardTitle>
                    {item.popular ? (
                      <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">Most popular</Badge>
                    ) : null}
                  </div>
                  <p className="text-2xl font-semibold">{item.price}</p>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/pricing">
              Compare Packages <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Frequently asked questions" />
          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.slice(0, 3).map((item) => (
              <Card key={item.question} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <CardDescription className="text-base">{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/faq">
              Read All FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container>
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-slate-50 via-white to-teal-50 p-10 shadow-sm sm:p-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold sm:text-4xl">Ready for simpler operations?</h2>
                <p className="max-w-xl text-muted-foreground">
                  Let us build a system your team can trust every day.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/contact#book-call">
                  Book a call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
