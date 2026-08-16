import { ArrowLeftRight, FileCheck2, Gauge, Landmark, Building, Zap } from "lucide-react";
import { Note, SectionHeading, Section } from "./Section";

const CONCEPTS = [
  {
    icon: Gauge,
    title: "Net Metering",
    text: "A bi-directional meter records electricity exported to the grid and imported from it, so surplus solar generation is credited against your consumption.",
  },
  {
    icon: ArrowLeftRight,
    title: "Net Billing",
    text: "Exported and imported electricity are valued separately, and you are billed on the resulting difference in value rather than a unit-for-unit offset.",
  },
  {
    icon: Zap,
    title: "Electricity Export",
    text: "Generation that exceeds what your loads consume flows out to the grid and is recorded by the bi-directional meter.",
  },
  {
    icon: Zap,
    title: "Electricity Import",
    text: "At night or when solar output is lower than demand, electricity is drawn from the grid and recorded as import.",
  },
  {
    icon: Landmark,
    title: "NEPRA",
    text: "The National Electric Power Regulatory Authority sets the rules and tariffs governing electricity in Pakistan, including distributed rooftop generation.",
  },
  {
    icon: Building,
    title: "DISCO",
    text: "Your local electricity distribution company processes the application, approves the connection and installs the bi-directional meter.",
  },
];

const STEPS = [
  "Install and commission the solar system",
  "Prepare the application with system details and documents",
  "Submit the application to your local DISCO",
  "Site inspection and technical review",
  "Approval and agreement under NEPRA rules",
  "Bi-directional meter installation and activation",
];

export function NetBillingSection({ tone = "light" }: { tone?: "light" | "muted" }) {
  return (
    <Section tone={tone} id="net-billing">
      <SectionHeading
        eyebrow="Net billing & NEPRA"
        title="How Grid Interaction Works"
        subtitle="The regulatory side of rooftop solar in Pakistan, explained in plain terms."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTS.map((c) => (
          <div key={c.title} className="card-elevated hover-lift p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent">
              <c.icon className="size-5 text-accent-foreground" strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 font-display text-base font-bold">{c.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
          <FileCheck2 className="size-5 text-primary" />
          Application Process
        </h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 rounded-2xl bg-muted/60 p-4">
              <span className="gradient-solar flex size-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-navy">
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <Note className="mt-8">
        Solar regulations and tariffs can change. Verify current requirements with the relevant
        authority before applying.
      </Note>
    </Section>
  );
}
