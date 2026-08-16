import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy â€” Solar AI Pakistan" },
      {
        name: "description",
        content:
          "How Solar AI Pakistan handles information submitted through the calculator, contact and installation request forms.",
      },
      { property: "og:title", content: "Privacy Policy â€” Solar AI Pakistan" },
      {
        property: "og:description",
        content: "How information submitted on this site is handled.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            How information entered on this site is handled at the current stage of the project.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <Block title="Current status">
            This website is an informational solar guidance platform. The calculator, contact form and
            installation request form do not transmit or store data â€” entries stay in your browser
            for the duration of your visit.
          </Block>
          <Block title="Information we would collect">
            When submissions are enabled, the forms would collect the details you enter: name, phone
            number, email address, city, and the requirement or message you write. Calculator inputs
            such as monthly consumption, bill amount, roof area and backup hours are used only to
            produce an estimate.
          </Block>
          <Block title="How information would be used">
            Submitted information would be used solely to respond to your enquiry and to prepare an
            indicative system recommendation. It would not be sold.
          </Block>
          <Block title="Solar AI assistant">
            The assistant currently replies from a fixed, built-in knowledge base. No conversation is
            sent anywhere or stored beyond your browser session.
          </Block>
          <Block title="Changes">
            This policy will be updated when backend services and submission handling are connected.
          </Block>
        </div>
      </Section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
