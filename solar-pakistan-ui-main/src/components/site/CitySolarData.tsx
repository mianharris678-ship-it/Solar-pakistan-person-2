import { MapPin, SunMedium } from "lucide-react";
import { CITY_SUN_HOURS } from "@/data/solar";
import { Note, SectionHeading, Section } from "./Section";
import mapImage from "@/assets/pakistan-map.png";

export function CitySolarData() {
  const max = 6.0;
  return (
    <Section tone="navy">
      <SectionHeading
        onNavy
        eyebrow="City solar data"
        title="Peak Sun Hours Across Pakistan"
        subtitle="Approximate daily peak sun hours by city — the key input for estimating how much a system will generate."
      />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative mx-auto max-w-sm">
          <div className="gradient-solar absolute inset-8 rounded-full opacity-20 blur-3xl" />
          <img
            src={mapImage}
            alt="Map outline of Pakistan"
            loading="lazy"
            width={900}
            height={900}
            className="animate-float relative w-full opacity-90"
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-navy-foreground/60">
            <SunMedium className="size-4 text-primary" />
            Higher sun hours mean more generation per installed kW
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {CITY_SUN_HOURS.map((c) => (
            <div
              key={c.city}
              className="rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-navy-foreground">
                  <MapPin className="size-4 text-primary" />
                  {c.city}
                </span>
                <span className="font-display text-sm font-bold text-primary">{c.hours}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-foreground/10">
                <div
                  className="gradient-solar h-full rounded-full"
                  style={{ width: `${(c.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Note className="mt-10 bg-navy-foreground/5">
        Figures are indicative approximate peak sun hours and may vary according to season, weather
        and site conditions.
      </Note>
    </Section>
  );
}
