import Link from "next/link";

import { SubmitButton } from "@/components/forms/submit-button";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildMetadata } from "@/lib/seo";
import { bottleneckOptions, siteConfig, teamSizeOptions } from "@/lib/site";

import { submitContactForm } from "./actions";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a call or send your project details. Share your biggest bottleneck and get a recommendation for the right package.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getErrorMessage(errorValue?: string | string[]) {
  const error = Array.isArray(errorValue) ? errorValue[0] : errorValue;

  if (error === "invalid-email") {
    return "Please enter a valid email address.";
  }

  if (error === "missing-fields") {
    return "Please fill in all required fields before submitting.";
  }

  return null;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const errorMessage = getErrorMessage(resolvedSearchParams.error);

  return (
    <>
      <section className="section-space pt-14">
        <Container className="space-y-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">Book a call or send your details</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Share where operations are slowing your team down. I will recommend a practical next step.
          </p>
        </Container>
      </section>

      <section id="book-call" className="section-space pt-0">
        <Container>
          <Card className="rounded-3xl border-border/70 bg-white/85">
            <CardHeader>
              <CardTitle className="text-2xl">Book a Call</CardTitle>
              <CardDescription className="text-base">
                Replace this placeholder with your real Calendly link or embed code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center sm:p-10">
                <p className="font-medium">Calendly placeholder</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add your scheduling URL in <code>lib/site.ts</code> as <code>calendlyPlaceholderUrl</code>.
                </p>
                <Link
                  href={siteConfig.calendlyPlaceholderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Open scheduling link
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section id="checklist" className="section-space pt-0">
        <Container>
          <Card className="rounded-3xl border-border/70 bg-white/85">
            <CardHeader>
              <CardTitle className="text-2xl">Contact form</CardTitle>
              <CardDescription className="text-base">
                Submit this form to discuss your bottlenecks or request the checklist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage ? (
                <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}

              <form action={submitContactForm} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" autoComplete="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" autoComplete="organization" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team size</Label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select team size
                      </option>
                      {teamSizeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottleneck">Biggest bottleneck</Label>
                  <select
                    id="bottleneck"
                    name="bottleneck"
                    className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your bottleneck
                    </option>
                    {bottleneckOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={6} placeholder="Tell me what is slowing your team down." required />
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/25 p-4 text-sm">
                  <input id="checklistInput" name="checklist" type="checkbox" className="mt-1 h-4 w-4" />
                  <span>Send me the checklist</span>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">You will be redirected to a confirmation page after submitting.</p>
                  <SubmitButton label="Send Message" pendingLabel="Sending..." />
                </div>
              </form>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
