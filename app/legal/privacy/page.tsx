import { Container } from "@/components/layout/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Business Systems Architect.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-space pt-14">
      <Container className="max-w-4xl space-y-8">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: March 5, 2026</p>

        <div className="space-y-6 text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Information we collect</h2>
            <p>
              When you submit the contact form, we collect the information you provide, such as your name, email, company,
              and message.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">How we use information</h2>
            <p>
              We use submitted information to respond to inquiries, provide requested resources, and discuss potential service
              engagements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Data retention</h2>
            <p>
              We retain inquiry data only as long as needed to manage business communications and comply with legal
              obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Security</h2>
            <p>
              We apply practical safeguards to protect submitted information. No method of transmission or storage is
              completely secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Your rights</h2>
            <p>
              You may request access, correction, or deletion of your personal information by contacting us at
              hello@businesssystemsarchitect.com.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
