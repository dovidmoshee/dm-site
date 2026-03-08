import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

type CtaBannerProps = {
  title: string;
  description?: string;
};

export function CtaBanner({ title, description }: CtaBannerProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-white via-slate-50 to-teal-50 p-8 shadow-sm sm:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
              {description ? <p className="max-w-2xl text-muted-foreground">{description}</p> : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/contact#book-call">Book a call</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link href="/contact#checklist">Get checklist</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
