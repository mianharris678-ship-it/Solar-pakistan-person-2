import { ShieldCheck, Check } from "lucide-react";
import { WARRANTIES } from "@/data/solar";
import { SectionHeading, Section } from "./Section";

export function WarrantySection({ tone = "light" }: { tone?: "light" | "muted" }) {
  return (
    <Section tone={tone} id="warranty">
      <SectionHeading
        eyebrow="Warranty"
        title="What Is Typically Covered"
        subtitle="Documented warranty and lifespan expectations for the main system components."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {WARRANTIES.map((w) => (
          <div key={w.title} className="card-elevated hover-lift p-6">
            <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
              <ShieldCheck className="size-6 text-navy" strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold">{w.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {w.items.map((i) => (
                <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
