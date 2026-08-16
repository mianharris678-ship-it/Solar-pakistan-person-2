import { Droplets, Wrench, BatteryCharging, CalendarCheck } from "lucide-react";
import { MAINTENANCE } from "@/data/solar";
import { SectionHeading, Section } from "./Section";

const ICONS = [Droplets, Wrench, BatteryCharging, CalendarCheck];

export function MaintenanceSection({ tone = "muted" }: { tone?: "light" | "muted" }) {
  return (
    <Section tone={tone} id="maintenance">
      <SectionHeading
        eyebrow="Maintenance"
        title="Keeping a Solar System Healthy"
        subtitle="Routine care that protects output and extends equipment life in dusty Pakistani conditions."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MAINTENANCE.map((m, i) => {
          const Icon = ICONS[i % ICONS.length] ?? Wrench;
          return (
            <div key={m.title} className="card-elevated hover-lift p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <Icon className="size-6 text-primary" strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-display text-base font-bold">{m.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
