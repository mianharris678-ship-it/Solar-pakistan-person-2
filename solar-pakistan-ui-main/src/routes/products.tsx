import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BatteryFull, Cpu, PanelsTopLeft, Search, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Note, Section, SectionHeading } from "@/components/site/Section";
import {
  BATTERIES,
  BATTERY_TYPES,
  INVERTERS,
  INVERTER_EXAMPLES,
  INVERTER_PRICES,
  PANELS,
  PANEL_COMPARISON,
  PANEL_PRICES,
} from "@/data/solar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Solar Products in Pakistan — Panels, Inverters & Batteries" },
      {
        name: "description",
        content:
          "Browse solar panels, hybrid inverters and lithium batteries available in Pakistan with documented specifications, warranties and indicative prices.",
      },
      { property: "og:title", content: "Solar Products in Pakistan" },
      {
        property: "og:description",
        content:
          "Panels, inverters and batteries available in Pakistan with specifications and indicative pricing.",
      },
    ],
  }),
  component: ProductsPage,
});

type Category = "panels" | "inverters" | "batteries";

type Item = {
  id: string;
  category: Category;
  brand: string;
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  detail: string;
};

const ITEMS: Item[] = [
  ...PANELS.map<Item>((p) => ({
    id: `panel-${p.brand}`,
    category: "panels",
    brand: p.brand,
    title: `${p.brand} ${p.series}`,
    subtitle: p.technology,
    specs: [
      { label: "Technology", value: p.technology },
      { label: "Efficiency", value: p.efficiency },
      { label: "Wattage", value: p.wattage },
      { label: "Product warranty", value: p.productWarranty },
      { label: "Performance warranty", value: p.performanceWarranty },
      { label: "Indicative price", value: "~Rs 45 per watt" },
    ],
    detail: p.note,
  })),
  ...INVERTERS.map<Item>((inv) => ({
    id: `inverter-${inv.brand}`,
    category: "inverters",
    brand: inv.brand,
    title: `${inv.brand} Inverters`,
    subtitle: inv.types,
    specs: [
      { label: "Origin", value: inv.origin },
      { label: "Types", value: inv.types },
      { label: "Models", value: inv.models.join(", ") },
      { label: "5kW hybrid price", value: "Rs 95,000 – 375,000" },
      { label: "Typical warranty", value: "2–5 years" },
      { label: "Lifespan", value: "10–15 years" },
    ],
    detail: inv.highlights.join(" • "),
  })),
  ...BATTERIES.map<Item>((b) => ({
    id: `battery-${b.brand}`,
    category: "batteries",
    brand: b.brand,
    title: `${b.brand} Batteries`,
    subtitle: "LiFePO4 storage",
    specs: [
      { label: "Origin", value: b.origin },
      { label: "Price per kWh", value: b.pricePerKwh },
      { label: "Warranty", value: b.warranty },
      { label: "Cycle life", value: b.cycleLife },
      { label: "Chemistry", value: "LiFePO4" },
    ],
    detail:
      "LiFePO4 batteries are safe, long-lasting and suitable for modern solar systems, with deep usable capacity compared to lead acid.",
  })),
];

const CATEGORIES: { key: Category; label: string; icon: typeof Cpu }[] = [
  { key: "panels", label: "Solar Panels", icon: PanelsTopLeft },
  { key: "inverters", label: "Solar Inverters", icon: Cpu },
  { key: "batteries", label: "Solar Batteries", icon: BatteryFull },
];

function ProductsPage() {
  const [category, setCategory] = useState<Category>("panels");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>("all");
  const [compare, setCompare] = useState<string[]>([]);
  const [detail, setDetail] = useState<Item | null>(null);

  const brands = useMemo(
    () => ["all", ...new Set(ITEMS.filter((i) => i.category === category).map((i) => i.brand))],
    [category],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter(
      (i) =>
        i.category === category &&
        (brand === "all" || i.brand === brand) &&
        (!q ||
          i.title.toLowerCase().includes(q) ||
          i.subtitle.toLowerCase().includes(q) ||
          i.specs.some((s) => s.value.toLowerCase().includes(q))),
    );
  }, [category, brand, query]);

  const compareItems = ITEMS.filter((i) => compare.includes(i.id));

  function toggleCompare(id: string) {
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id].slice(-3)));
  }

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Solar Product Catalog
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            Panels, inverters and batteries available in the Pakistani market, with documented
            specifications, warranties and indicative prices.
          </p>
        </div>
      </section>

      <Section>
        {/* Controls */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setCategory(c.key);
                  setBrand("all");
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                  category === c.key
                    ? "gradient-solar border-transparent text-navy shadow-[var(--shadow-glow)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                <c.icon className="size-4" />
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xl">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, technology or specification"
              className="h-12 rounded-2xl pl-11"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Brand
            </span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  brand === b
                    ? "border-primary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40",
                )}
              >
                {b === "all" ? "All brands" : b}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="card-elevated hover-lift flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-bold">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {item.brand}
                </Badge>
              </div>
              <dl className="mt-5 flex-1 space-y-2 text-sm">
                {item.specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-2">
                <Button variant="solar" className="flex-1" onClick={() => setDetail(item)}>
                  View Details
                </Button>
                <Button
                  variant={compare.includes(item.id) ? "default" : "outline"}
                  onClick={() => toggleCompare(item.id)}
                >
                  {compare.includes(item.id) ? (
                    <Check className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                  Compare
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl bg-muted/60 p-8 text-center text-sm text-muted-foreground">
            No products matched your filters. Clear the search or choose “All brands”.
          </p>
        ) : null}

        {/* Compare tray */}
        {compareItems.length > 0 ? (
          <div className="mt-12 rounded-3xl border border-primary/30 bg-secondary/40 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold">
                Comparing {compareItems.length} product{compareItems.length > 1 ? "s" : ""}
              </h3>
              <Button variant="outline" size="sm" onClick={() => setCompare([])}>
                <X className="size-4" /> Clear
              </Button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 font-display">Specification</th>
                    {compareItems.map((i) => (
                      <th key={i.id} className="py-3 pr-4 font-display">
                        {i.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(compareItems[0]?.specs ?? []).map((spec, row) => (
                    <tr key={spec.label} className="border-b border-border/60">
                      <td className="py-3 pr-4 text-muted-foreground">{spec.label}</td>
                      {compareItems.map((i) => (
                        <td key={i.id} className="py-3 pr-4 font-medium">
                          {i.specs[row]?.value ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </Section>

      {/* PANEL PRICES */}
      <Section tone="muted" id="panel-prices">
        <SectionHeading
          eyebrow="Solar panels"
          title="Indicative Panel Prices"
          subtitle="Documented market prices for commonly available module sizes."
        />
        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy text-navy-foreground">
              <tr>
                <th className="px-5 py-4 font-display">Panel</th>
                <th className="px-5 py-4 text-right font-display">Price</th>
              </tr>
            </thead>
            <tbody>
              {PANEL_PRICES.map((p) => (
                <tr key={p.panel} className="border-t border-border hover:bg-muted/60">
                  <td className="px-5 py-4 font-medium">{p.panel}</td>
                  <td className="px-5 py-4 text-right text-muted-foreground">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note className="mt-8">
          Prices are indicative and may change with market conditions.
        </Note>
      </Section>

      {/* PANEL COMPARISON */}
      <Section id="panel-comparison">
        <SectionHeading
          eyebrow="Panel comparison"
          title="Jinko vs LONGi vs Trina"
          subtitle="A side-by-side view of three of the most requested module families in Pakistan."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PANEL_COMPARISON.map((p) => (
            <div key={p.model} className="card-elevated hover-lift p-6">
              <h3 className="font-display text-lg font-bold">{p.model}</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ["Cell technology", p.cellTechnology],
                  ["Efficiency", p.efficiency],
                  ["Product warranty", p.productWarranty],
                  ["Performance warranty", p.performanceWarranty],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-xl bg-secondary/60 p-3 text-xs leading-relaxed text-secondary-foreground">
                <strong className="font-semibold">Best use: </strong>
                {p.bestUse}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* INVERTERS */}
      <Section tone="muted" id="inverters">
        <SectionHeading
          eyebrow="Inverters"
          title="Hybrid & On-Grid Inverters"
          subtitle="Brands available in Pakistan, with indicative hybrid inverter price ranges."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INVERTERS.map((inv) => (
            <div key={inv.brand} className="card-elevated hover-lift p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold">{inv.brand}</h3>
                <Badge variant="secondary">{inv.origin}</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{inv.types}</p>
              <ul className="mt-4 space-y-2">
                {inv.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Models: <span className="font-medium text-foreground">{inv.models.join(", ")}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-navy-foreground">
                <tr>
                  <th className="px-5 py-4 font-display">Inverter size</th>
                  <th className="px-5 py-4 text-right font-display">Indicative price</th>
                </tr>
              </thead>
              <tbody>
                {INVERTER_PRICES.map((p) => (
                  <tr key={p.size} className="border-t border-border hover:bg-muted/60">
                    <td className="px-5 py-4 font-medium">{p.size}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-elevated p-6">
            <h3 className="font-display text-base font-bold">Common examples</h3>
            <ul className="mt-4 space-y-3">
              {INVERTER_EXAMPLES.map((e) => (
                <li key={e} className="flex items-center gap-2.5 rounded-xl bg-muted/60 px-4 py-3 text-sm">
                  <Cpu className="size-4 text-primary" />
                  {e}
                </li>
              ))}
            </ul>
            <Note className="mt-5">
              Prices are indicative and may change with market conditions.
            </Note>
          </div>
        </div>
      </Section>

      {/* BATTERIES */}
      <Section id="batteries">
        <SectionHeading
          eyebrow="Batteries"
          title="Solar Battery Storage"
          subtitle="Battery chemistry and brand comparison for backup and off-grid systems."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {BATTERY_TYPES.map((b) => (
            <div key={b.name} className="card-elevated hover-lift p-6">
              <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
                <BatteryFull className="size-6 text-navy" strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{b.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-navy text-navy-foreground">
              <tr>
                <th className="px-5 py-4 font-display">Brand</th>
                <th className="px-5 py-4 font-display">Origin</th>
                <th className="px-5 py-4 font-display">Price / kWh</th>
                <th className="px-5 py-4 font-display">Warranty</th>
                <th className="px-5 py-4 font-display">Cycle life</th>
              </tr>
            </thead>
            <tbody>
              {BATTERIES.map((b) => (
                <tr key={b.brand} className="border-t border-border hover:bg-muted/60">
                  <td className="px-5 py-4 font-medium">{b.brand}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.origin}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.pricePerKwh}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.warranty}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.cycleLife}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note className="mt-8">
          Prices are indicative and may change with market conditions.
        </Note>
      </Section>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">{detail?.title}</DialogTitle>
            <DialogDescription>{detail?.subtitle}</DialogDescription>
          </DialogHeader>
          <dl className="space-y-2.5 text-sm">
            {detail?.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="text-right font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-secondary-foreground">
            {detail?.detail}
          </p>
          <Note>Specifications and prices are indicative and vary by supplier and model.</Note>
        </DialogContent>
      </Dialog>
    </>
  );
}
