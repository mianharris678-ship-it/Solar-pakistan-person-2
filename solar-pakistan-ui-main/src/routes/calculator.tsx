import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calculator, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Note, Section, SectionHeading } from "@/components/site/Section";
import { ExampleSystems } from "@/components/site/ExampleSystems";
import { CITY_SUN_HOURS } from "@/data/solar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Solar Calculator â€” Estimate Your Solar System in Pakistan" },
      {
        name: "description",
        content:
          "Estimate the solar system size, panel count, inverter rating and battery capacity you need, based on your monthly units, city and backup needs.",
      },
      { property: "og:title", content: "Solar Calculator for Pakistan" },
      {
        property: "og:description",
        content: "Estimate system size, panels, inverter and battery for your home or business.",
      },
    ],
  }),
  component: CalculatorPage,
});

const LOADS = [
  "Air conditioners",
  "Refrigerator / freezer",
  "Fans & lights",
  "Water pump / motor",
  "Washing machine",
  "Commercial equipment",
];

const SYSTEM_OPTIONS = ["On-grid", "Hybrid", "Off-grid", "Not sure"] as const;

type FormState = {
  consumption: string;
  bill: string;
  city: string;
  roofArea: string;
  backupHours: string;
  preference: string;
  battery: string;
  loads: string[];
};

const INITIAL: FormState = {
  consumption: "",
  bill: "",
  city: "",
  roofArea: "",
  backupHours: "",
  preference: "",
  battery: "",
  loads: [],
};

const STEPS = ["Consumption", "Site", "System", "Result"];

function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  // Initial planning estimate based on project reference assumptions.
  const units = Number(form.consumption) || 0;
  const sizeKw = units > 0 ? Math.round((units / 130) * 100) / 100 : 0;
  const panels = sizeKw > 0 ? Math.ceil((sizeKw * 1000) / 585) : 0;
  const inverter = sizeKw > 0 ? Math.ceil(sizeKw * 1.2) : 0;
  const backup = Number(form.backupHours) || 0;
  const batteryKwh =
    form.battery === "Yes" && backup > 0 ? Math.round(((units / 30 / 24) * backup * 1.3) * 10) / 10 : 0;
  const monthlyGen = Math.round(sizeKw * 130);
  const roofNeeded = panels > 0 ? Math.round(panels * 2.6) : 0;

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Solar Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            Answer a few questions about your electricity use and site, and see an indicative system
            recommendation.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Stepper */}
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full font-display text-sm font-bold transition-colors",
                    i <= step
                      ? "gradient-solar text-navy"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "text-center text-[11px] sm:text-xs",
                    i <= step ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} className="mt-5 h-1.5" />

          <div className="card-elevated mt-8 p-6 sm:p-8">
            {step === 0 ? (
              <div className="space-y-6">
                <StepTitle
                  title="Your electricity usage"
                  text="These two numbers drive the whole estimate â€” take them from a recent bill."
                />
                <Field label="Monthly electricity consumption (kWh / units)">
                  <Input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="e.g. 600"
                    value={form.consumption}
                    onChange={(e) => set({ consumption: e.target.value })}
                    className="h-12"
                  />
                </Field>
                <Field label="Monthly electricity bill (Rs)">
                  <Input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="e.g. 35000"
                    value={form.bill}
                    onChange={(e) => set({ bill: e.target.value })}
                    className="h-12"
                  />
                </Field>
                <Field label="Major electrical loads">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {LOADS.map((l) => (
                      <label
                        key={l}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 text-sm transition-colors hover:border-primary/40"
                      >
                        <Checkbox
                          checked={form.loads.includes(l)}
                          onCheckedChange={(c) =>
                            set({
                              loads: c
                                ? [...form.loads, l]
                                : form.loads.filter((x) => x !== l),
                            })
                          }
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-6">
                <StepTitle
                  title="Your site"
                  text="City sets the peak sun hours; roof area limits how many panels fit."
                />
                <Field label="City">
                  <Select value={form.city} onValueChange={(v) => set({ city: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITY_SUN_HOURS.map((c) => (
                        <SelectItem key={c.city} value={c.city}>
                          {c.city} â€” {c.hours} peak sun hours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Available roof area (sq ft)">
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 500"
                    value={form.roofArea}
                    onChange={(e) => set({ roofArea: e.target.value })}
                    className="h-12"
                  />
                </Field>
                <Field label="Backup hours required">
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 6"
                    value={form.backupHours}
                    onChange={(e) => set({ backupHours: e.target.value })}
                    className="h-12"
                  />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <StepTitle
                  title="System preference"
                  text="Not sure? Pick â€œNot sureâ€ and we will suggest a type from your answers."
                />
                <Field label="System preference">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SYSTEM_OPTIONS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => set({ preference: o })}
                        className={cn(
                          "rounded-xl border p-4 text-left text-sm font-medium transition-all",
                          form.preference === o
                            ? "border-primary bg-secondary shadow-[var(--shadow-soft)]"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Battery required?">
                  <div className="flex gap-3">
                    {["Yes", "No", "Not sure"].map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => set({ battery: o })}
                        className={cn(
                          "flex-1 rounded-xl border p-3 text-sm font-medium transition-all",
                          form.battery === o
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <div className="rounded-2xl bg-accent px-4 py-3 text-xs font-semibold text-accent-foreground">
                  Initial planning estimate â€” final design should be confirmed by a professional.
                </div>
                <StepTitle
                  className="mt-6"
                  title="Your indicative system"
                  text={
                    units > 0
                      ? `Based on ${units} kWh per month${form.city ? ` in ${form.city}` : ""}.`
                      : "Enter your monthly consumption in step 1 to see an estimate."
                  }
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Result label="System size" value={sizeKw ? `~${sizeKw} kW` : "â€”"} highlight />
                  <Result label="Panels (585W)" value={panels ? `~${panels} panels` : "â€”"} />
                  <Result label="Inverter" value={inverter ? `~${inverter} kW` : "â€”"} />
                  <Result
                    label="Battery"
                    value={batteryKwh ? `~${batteryKwh} kWh` : form.battery === "No" ? "Not required" : "â€”"}
                  />
                  <Result
                    label="Estimated generation"
                    value={monthlyGen ? `~${monthlyGen} kWh/month` : "â€”"}
                  />
                  <Result label="Roof area needed" value={roofNeeded ? `~${roofNeeded} sq ft` : "â€”"} />
                </div>

                <div className="mt-6 rounded-2xl border border-border p-5">
                  <h3 className="flex items-center gap-2 font-display text-sm font-bold">
                    <Sparkles className="size-4 text-primary" /> Suggested system type
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {form.preference && form.preference !== "Not sure"
                      ? `${form.preference} â€” as selected. `
                      : backup > 0 || form.battery === "Yes"
                        ? "Hybrid â€” you asked for backup hours, which needs a battery and hybrid inverter. "
                        : "On-grid â€” no backup requirement was indicated, so a grid-tied system keeps the cost lowest. "}
                    Review the full comparison of on-grid, hybrid and off-grid before deciding.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/systems/$type" params={{ type: "hybrid" }}>
                        Hybrid systems
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/products">Browse equipment</Link>
                    </Button>
                    <Button asChild variant="solar" size="sm">
                      <Link to="/contact">Get Solar Guidance</Link>
                    </Button>
                  </div>
                </div>

                <Note className="mt-6">
                  Initial estimate only. Consult a professional for precise system design.
                </Note>
              </div>
            ) : null}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              {step < 3 ? (
                <Button variant="solar" onClick={() => setStep((s) => Math.min(3, s + 1))}>
                  {step === 2 ? (
                    <>
                      <Calculator className="size-4" /> See my estimate
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setForm(INITIAL);
                    setStep(0);
                  }}
                >
                  <RotateCcw className="size-4" /> Start over
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <ExampleSystems />

      <Section>
        <SectionHeading
          eyebrow="How sizing works"
          title="The Rule of Thumb"
          subtitle="1kW of solar generates roughly 130 kWh per month in Pakistan. Divide your monthly units by 130 to get the system size, then divide by panel wattage for the panel count."
        />
      </Section>
    </>
  );
}

function StepTitle({
  title,
  text,
  className,
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
    </div>
  );
}

function Result({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        highlight ? "border-primary/40 bg-secondary/50" : "border-border bg-card",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1.5 font-display text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}
