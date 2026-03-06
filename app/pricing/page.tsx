import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { packages } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Choose between Foundation, Build, and Scale packages for your Business OS Setup. Clear scope, fixed pricing, and fast delivery.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <section className="section-space pt-14">
        <Container className="space-y-4">
          <h1 className="max-w-4xl text-4xl font-semibold sm:text-5xl">Packages built for your stage of growth</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Fixed pricing keeps scope clear and momentum high. Each package is designed around a complete business systems outcome.
          </p>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {packages.map((item) => (
              <Card
                key={item.name}
                className={`rounded-3xl border-border/70 bg-white/85 ${item.popular ? "ring-2 ring-teal-500/40" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-2xl">{item.name}</CardTitle>
                    {item.popular ? <Badge className="rounded-full">Most popular</Badge> : null}
                  </div>
                  <p className="text-3xl font-semibold">{item.price}</p>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">What&apos;s included</p>
                  {item.includes.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/contact#book-call">Book a Call</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-6 rounded-3xl border-border/70 bg-slate-50/80">
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">Payment terms</p>
                <p className="mt-2">50% upfront, 50% on delivery.</p>
              </div>
              <p className="text-muted-foreground">
                If you&apos;re not sure, book a call and I&apos;ll recommend the right package.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      <CtaBanner
        title="Need help choosing the right package?"
        description="I will recommend the best fit based on your complexity, timeline, and internal team bandwidth."
      />
    </>
  );
}
