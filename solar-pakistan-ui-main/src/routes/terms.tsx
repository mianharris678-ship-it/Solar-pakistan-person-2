import { createFileRoute } from "@tanstack/react-router";
import { Note, Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use â€” Solar AI Pakistan" },
      {
        name: "description",
        content:
          "Terms covering the use of Solar AI Pakistan's estimates, indicative prices, equipment information and assistant responses.",
      },
      { property: "og:title", content: "Terms of Use â€” Solar AI Pakistan" },
      {
        property: "og:description",
        content: "How to use the estimates, prices and information published on this site.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            Please read how the information, estimates and prices on this site should be used.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <Block title="Informational purpose">
            All content on this site is provided for general information about solar energy in
            Pakistan. It does not replace a professional site survey, electrical design or
            engineering assessment.
          </Block>
          <Block title="Estimates and calculations">
            The Solar Calculator produces planning estimates using simplified assumptions such as approximately 130 kWh per month per installed kW. Results are an initial estimate only, and a professional should confirm precise system design.
          </Block>
          <Block title="Prices">
            All equipment and system prices are indicative and may change with market conditions,
            brand, specification and installation scope.
          </Block>
          <Block title="Regulations">
            Net metering, net billing, tariffs and incentive schemes are set by the relevant
            authorities and can change. Verify current requirements before applying.
          </Block>
          <Block title="Assistant responses">
            The Solar AI assistant answers from the platform knowledge base and may not reflect the latest market or regulatory position.
          </Block>
          <Note className="mx-0">
            Figures are indicative and may vary according to system design and site conditions.
          </Note>
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
