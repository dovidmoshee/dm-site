import { Container } from "@/components/layout/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildMetadata } from "@/lib/seo";
import { faqItems } from "@/lib/site";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Business OS Setup, tooling, timelines, security, and expected outcomes.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <section className="section-space pt-14">
        <Container className="space-y-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">Frequently asked questions</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Everything teams usually ask before starting a Business OS Setup engagement.
          </p>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container>
          <div className="rounded-3xl border border-border/70 bg-white/85 p-4 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`faq-${index + 1}`} key={item.question}>
                  <AccordionTrigger className="text-left text-lg font-semibold">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <CtaBanner title="Still have questions?" description="Book a call and I will walk you through fit, scope, and expected outcomes." />
    </>
  );
}
