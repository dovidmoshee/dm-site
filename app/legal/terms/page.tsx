import { Container } from "@/components/layout/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for Business Systems Architect.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <section className="section-space pt-14">
      <Container className="max-w-4xl space-y-8">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: March 5, 2026</p>

        <div className="space-y-6 text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Scope of services</h2>
            <p>
              Business Systems Architect provides consulting and implementation services as described in signed proposals and
              agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Client responsibilities</h2>
            <p>
              Clients agree to provide timely access, accurate information, and decision-making support needed for project
              delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Fees and payment</h2>
            <p>
              Fees, timelines, and payment terms are defined in the project agreement. Unless otherwise stated, invoices are
              due based on the agreed schedule.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Intellectual property</h2>
            <p>
              Upon payment, clients retain ownership of deliverables created specifically for their engagement unless otherwise
              stated in writing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Limitation of liability</h2>
            <p>
              Services are provided in good faith. To the fullest extent permitted by law, liability is limited to the fees
              paid for the applicable engagement.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
