import { Home, Building2, Store, Mountain, Sun } from "lucide-react";
import { EXAMPLE_SYSTEMS } from "@/data/solar";
import { Note, SectionHeading, Section } from "./Section";

const ICONS = [Home, Sun, Mountain, Building2, Store];

export function ExampleSystems({ tone = "muted" }: { tone?: "light" | "muted" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Reference designs"
        title="Example Solar Systems"
        subtitle="Documented reference configurations for common Pakistani consumption profiles."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLE_SYSTEMS.map((s, i) => {
          const Icon = ICONS[i % ICONS.length] ?? Home;
          return (
            <div key={s.name} className="card-elevated hover-lift p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                  <Icon className="size-5 text-primary" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.consumption}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-2.5 text-sm">
                <Row label="System size" value={s.system} />
                <Row label="Panels" value={s.panels} />
                <Row label="Inverter" value={s.inverter} />
                <Row label="Battery" value={s.battery} />
              </dl>
            </div>
          );
        })}
      </div>
      <Note className="mt-10">
        Initial estimate only. Consult a professional for precise system design.
      </Note>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
