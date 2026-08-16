import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  Leaf,
  PlugZap,
  Wallet,
  Sun,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Note, Section, SectionHeading } from "@/components/site/Section";
import { ExampleSystems } from "@/components/site/ExampleSystems";
import { CitySolarData } from "@/components/site/CitySolarData";
import { PricingSection } from "@/components/site/PricingSection";
import { useSolarChat } from "@/components/site/ChatProvider";
import { HOME_STATS, SYSTEM_TYPES, WHY_SOLAR } from "@/data/solar";
import heroImage from "@/assets/hero-solar-home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solar AI Pakistan — Power Your Future with Solar Energy" },
      {
        name: "description",
        content:
          "Smart solar solutions designed for Pakistan. Explore solar products, estimate your system size and understand on-grid, hybrid and off-grid options.",
      },
      { property: "og:title", content: "Power Your Future with Solar Energy" },
      {
        property: "og:description",
        content:
          "Smart solar solutions designed for Pakistan — products, sizing, pricing and installation guidance.",
      },
    ],
  }),
  component: Index,
});

const WHY_ICONS = { wallet: Wallet, plug: PlugZap, battery: BatteryCharging, leaf: Leaf };

function Index() {
  const { setOpen } = useSolarChat();

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="gradient-solar absolute -top-32 -right-24 size-96 rounded-full opacity-20 blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy-foreground/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sun className="size-4" strokeWidth={2.5} />
              Smart Solar Solutions for Pakistan
            </span>
            <h1 className="mt-6 text-4xl leading-[1.1] font-bold text-navy-foreground sm:text-5xl lg:text-6xl">
              Power Your Future with{" "}
              <span className="text-gradient-solar">Solar Energy</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
              Smart solar solutions designed for Pakistan. Explore solar products, understand your
              options, estimate your system requirements, and make informed decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="solar" size="xl">
                <Link to="/calculator">
                  <Calculator className="size-5" />
                  Calculate My Solar
                </Link>
              </Button>
              <Button variant="onNavy" size="xl" onClick={() => setOpen(true)}>
                <Sun className="size-5" strokeWidth={2.5} />
                Ask Solar AI
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-foreground/60">
              {["On-grid", "Hybrid", "Off-grid", "Net metering guidance"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="gradient-solar absolute -inset-3 rounded-[2rem] opacity-25 blur-2xl" />
            <img
              src={heroImage}
              alt="Rooftop solar panel installation on a modern Pakistani home at sunset"
              width={1600}
              height={1200}
              className="relative w-full rounded-[1.75rem] border border-navy-foreground/10 object-cover shadow-[var(--shadow-card)]"
            />
            <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:left-8">
              <p className="font-display text-2xl font-bold text-primary">130 kWh</p>
              <p className="text-xs text-muted-foreground">per month from every 1kW installed</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Section>
        <SectionHeading
          eyebrow="Solar in numbers"
          title="What Solar Delivers in Pakistan"
          subtitle="Key reference figures used when planning a rooftop system."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="card-elevated hover-lift p-6">
              <p className="font-display text-2xl font-bold text-gradient-solar sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <Note className="mt-10">
          Figures are indicative and may vary according to system design and site conditions.
        </Note>
      </Section>

      {/* WHY SOLAR */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why solar"
          title="Why Go Solar"
          subtitle="Four practical reasons Pakistani homes and businesses install solar."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_SOLAR.map((w) => {
            const Icon = WHY_ICONS[w.icon as keyof typeof WHY_ICONS];
            return (
              <div key={w.title} className="card-elevated hover-lift p-6">
                <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
                  <Icon className="size-6 text-navy" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-display text-base font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SYSTEM TYPES */}
      <Section>
        <SectionHeading
          eyebrow="System types"
          title="Choose the Right System"
          subtitle="On-grid, hybrid and off-grid systems solve different problems. Compare them before you buy."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SYSTEM_TYPES.map((s, i) => (
            <div
              key={s.slug}
              className={`card-elevated hover-lift relative flex flex-col p-7 ${
                i === 1 ? "border-primary/40 ring-1 ring-primary/20" : ""
              }`}
            >
              {i === 1 ? (
                <span className="gradient-solar absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold text-navy">
                  Most popular in Pakistan
                </span>
              ) : null}
              <h3 className="font-display text-xl font-bold tracking-wide uppercase">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={i === 1 ? "solar" : "outline"} className="mt-7">
                <Link to="/systems/$type" params={{ type: s.slug }}>
                  Learn More
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <ExampleSystems />
      <CitySolarData />
      <PricingSection />

      {/* CTA */}
      <Section tone="muted">
        <div className="gradient-hero relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
          <div className="gradient-solar absolute -top-20 -left-16 size-72 rounded-full opacity-20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold text-navy-foreground sm:text-4xl">
            Get Solar Guidance
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-navy-foreground/70">
            Tell us your consumption and city, and we will point you to the right system type, size
            and equipment.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="solar" size="lg">
              <Link to="/contact">Get Solar Guidance</Link>
            </Button>
            <Button variant="onNavy" size="lg" onClick={() => setOpen(true)}>
              Ask Solar AI
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
