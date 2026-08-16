import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging, Leaf, PlugZap, Wallet, Target, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Note, Section, SectionHeading } from "@/components/site/Section";
import { CitySolarData } from "@/components/site/CitySolarData";
import { WarrantySection } from "@/components/site/WarrantySection";
import { NetBillingSection } from "@/components/site/NetBillingSection";
import { HOME_STATS, SYSTEM_TYPES, WHY_SOLAR } from "@/data/solar";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Solar AI Pakistan — Smart Solar Solutions" },
      {
        name: "description",
        content:
          "Solar AI Pakistan helps households and businesses understand solar options, equipment and regulations before investing in a rooftop system.",
      },
      { property: "og:title", content: "About Solar AI Pakistan" },
      {
        property: "og:description",
        content:
          "An independent guide to solar equipment, sizing, pricing and net metering in Pakistan.",
      },
    ],
  }),
  component: AboutPage,
});

const WHY_ICONS = { wallet: Wallet, plug: PlugZap, battery: BatteryCharging, leaf: Leaf };

function AboutPage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="container-page">
          <h1 className="max-w-3xl font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Helping Pakistan make informed solar decisions
          </h1>
          <p className="mt-6 max-w-2xl text-navy-foreground/70">
            Solar AI Pakistan brings equipment specifications, indicative pricing, sizing rules and
            regulatory information together in one place, so buyers can evaluate a rooftop system
            with real numbers instead of guesswork.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="solar" size="lg">
              <Link to="/calculator">Calculate My Solar</Link>
            </Button>
            <Button asChild variant="onNavy" size="lg">
              <Link to="/knowledge">Read the knowledge base</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-elevated p-7">
            <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
              <Target className="size-6 text-navy" strokeWidth={2.2} />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold">What we focus on</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Clear explanations of panels, inverters and batteries; realistic system sizing based on
              your monthly units and city; indicative price ranges for equipment and complete
              systems; and a plain-language walkthrough of installation and net metering.
            </p>
          </div>
          <div className="card-elevated p-7">
            <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
              <Compass className="size-6 text-navy" strokeWidth={2.2} />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold">How to use this site</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Start with the Solar Calculator for an indicative system size, compare on-grid, hybrid
              and off-grid options, then review equipment in the product catalog. The Solar AI
              assistant can answer questions along the way.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Reference figures" title="The Numbers We Work With" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="card-elevated hover-lift p-6">
              <p className="font-display text-2xl font-bold text-gradient-solar">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <Note className="mt-10">
          Figures are indicative and may vary according to system design and site conditions.
        </Note>
      </Section>

      <Section>
        <SectionHeading eyebrow="Why solar" title="Why Pakistani Homes Are Going Solar" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_SOLAR.map((w) => {
            const Icon = WHY_ICONS[w.icon as keyof typeof WHY_ICONS];
            return (
              <div key={w.title} className="card-elevated hover-lift p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="size-6 text-primary" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-display text-base font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="System types" title="Three Ways to Go Solar" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {SYSTEM_TYPES.map((s) => (
            <Link
              key={s.slug}
              to="/systems/$type"
              params={{ type: s.slug }}
              className="card-elevated hover-lift p-6"
            >
              <h3 className="font-display text-lg font-bold uppercase">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              <p className="mt-4 text-sm font-semibold text-primary">Learn more →</p>
            </Link>
          ))}
        </div>
      </Section>

      <CitySolarData />
      <WarrantySection />
      <NetBillingSection tone="muted" />
    </>
  );
}
