import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { processPhases } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "See the four-phase Business OS Setup process from discovery to training, including key artifacts and success criteria.",
  path: "/process",
});

const successLooksLike = [
  "Every core workflow has a clear owner and a visible status",
  "Handoffs are automated for repeatable work",
  "Leadership reporting requires less manual data collection",
  "New team members can onboard using system documentation",
] as const;

const artifactImages = [
  {
    src: "/workflow-nodes-2.svg",
    title: "Systems map",
    description: "Visual process map with owners and handoff points.",
  },
  {
    src: "/artifact-dashboard.svg",
    title: "Automation dashboard",
    description: "Live view of critical automations and exception handling.",
  },
  {
    src: "/artifact-playbook.svg",
    title: "Team playbook",
    description: "Documentation template used for handoff and team training.",
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <section className="section-space pt-14">
        <Container className="space-y-4">
          <h1 className="max-w-4xl text-4xl font-semibold sm:text-5xl">A focused four-phase process that keeps work moving</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Each phase is structured around clear outputs, fast review loops, and documented decisions.
          </p>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Phase breakdown" />
          <div className="grid gap-4 lg:grid-cols-2">
            {processPhases.map((phase, index) => (
              <Card key={phase.name} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardDescription className="font-mono text-xs uppercase tracking-[0.15em]">Phase 0{index + 1}</CardDescription>
                  <CardTitle className="text-2xl">{phase.name}</CardTitle>
                  <CardDescription className="text-base">{phase.summary}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">What I do</p>
                    <p>{phase.iDo}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">What I need from you</p>
                    <p>{phase.iNeed}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="Example artifacts" description="Sample placeholders showing the style of assets you will receive." />
          <div className="grid gap-4 md:grid-cols-3">
            {artifactImages.map((item) => (
              <Card key={item.title} className="overflow-hidden rounded-3xl border-border/70 bg-white/85">
                <Image
                  src={item.src}
                  alt={`${item.title} placeholder`}
                  width={640}
                  height={420}
                  className="h-auto w-full border-b border-border/60"
                />
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="What success looks like" />
          <div className="grid gap-4 sm:grid-cols-2">
            {successLooksLike.map((item) => (
              <Card key={item} className="rounded-3xl border-emerald-100 bg-emerald-50/70">
                <CardContent className="p-6">
                  <p className="font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Want this process applied to your team?"
        description="Book a call and we can map your current stage and the fastest implementation path."
      />
    </>
  );
}
