import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn how a Business Systems Architect bridges business strategy and technical execution to build reliable operations.",
  path: "/about",
});

const principles = ["Clarity", "Simplicity", "Reliability", "Documentation"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="section-space pt-14">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold sm:text-5xl">I help founder-led teams run with less friction and more confidence</h1>
            <p className="text-lg text-muted-foreground">
              I work at the intersection of systems thinking, automation, and AI workflows. My role is to turn operational
              complexity into clear execution models your team can trust.
            </p>
            <p className="text-muted-foreground">
              Over the last decade I have supported teams across SaaS, services, and productized agencies. My focus is always
              the same: bridge business priorities with technical implementation so strategy becomes daily execution.
            </p>
          </div>
          <Card className="overflow-hidden rounded-3xl border-border/70 bg-white/85">
            <Image
              src="/workflow-nodes-3.svg"
              alt="Abstract illustration representing business and technical execution"
              width={600}
              height={480}
              className="h-auto w-full"
            />
          </Card>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-8">
          <SectionHeading title="My principles" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <Card key={item} className="rounded-3xl border-border/70 bg-white/85">
                <CardHeader>
                  <CardTitle className="text-xl">{item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {item === "Clarity" && "Clear decisions, clear owners, and clear process logic."}
                    {item === "Simplicity" && "Only keep what creates leverage for your team."}
                    {item === "Reliability" && "Systems should work consistently when real work pressure hits."}
                    {item === "Documentation" && "If it is not documented, it is not truly operational."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Want to discuss your current systems bottlenecks?"
        description="Book a call and we will map your fastest path to a stable business operating system."
      />
    </>
  );
}
