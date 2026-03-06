import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Thanks for your message. We will be in touch shortly.",
  path: "/thank-you",
  noIndex: true,
});

type ThankYouPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedSearchParams = await searchParams;
  const checklist = Array.isArray(resolvedSearchParams.checklist)
    ? resolvedSearchParams.checklist[0]
    : resolvedSearchParams.checklist;

  const requestedChecklist = checklist === "1";

  return (
    <section className="section-space pt-20">
      <Container className="max-w-3xl">
        <Card className="rounded-3xl border-border/70 bg-white/90 text-center">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl sm:text-4xl">Thank you. Your message is in.</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              I will review your submission and reply with next steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {requestedChecklist ? (
              <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Checklist request received. I will include it in my follow-up email.
              </p>
            ) : null}
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/pricing">View Packages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
