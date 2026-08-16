import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Section, SectionHeading } from "@/components/site/Section";
import { FaqSection } from "@/components/site/FaqSection";
import { PricingSection } from "@/components/site/PricingSection";
import { NetBillingSection } from "@/components/site/NetBillingSection";
import { KNOWLEDGE } from "@/data/solar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Pakistan Solar Knowledge Base — Panels, Sizing, Net Billing" },
      {
        name: "description",
        content:
          "A Pakistan-specific solar knowledge base: panels, inverters, batteries, system types, sizing, installation, warranty, pricing, net billing and NEPRA.",
      },
      { property: "og:title", content: "Pakistan Solar Knowledge Base" },
      {
        property: "og:description",
        content:
          "Everything from panel technology to net billing and NEPRA rules, organised by topic.",
      },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const [active, setActive] = useState<string>(KNOWLEDGE[0]?.category ?? "");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return KNOWLEDGE.map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
        ),
      })).filter((c) => c.items.length > 0);
    }
    return KNOWLEDGE.filter((c) => c.category === active);
  }, [query, active]);

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-foreground/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <BookOpen className="size-4" /> Solar Knowledge
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Pakistan Solar Knowledge
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            Everything from panel technology and sizing to net billing and NEPRA rules — organised by
            topic so you can read only what you need.
          </p>
          <div className="relative mt-8 max-w-xl">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the knowledge base"
              className="h-13 rounded-2xl border-navy-foreground/15 bg-card pl-11"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Categories
            </p>
            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              {KNOWLEDGE.map((c) => (
                <button
                  key={c.category}
                  onClick={() => {
                    setActive(c.category);
                    setQuery("");
                  }}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors",
                    !query && active === c.category
                      ? "gradient-solar text-navy shadow-[var(--shadow-glow)]"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {c.category}
                </button>
              ))}
            </div>
          </aside>

          <div>
            {visible.length === 0 ? (
              <p className="rounded-2xl bg-muted/60 p-8 text-center text-sm text-muted-foreground">
                Nothing matched “{query}”. Try “battery”, “sizing” or “net billing”.
              </p>
            ) : (
              visible.map((c) => (
                <div key={c.category} className="mb-10">
                  <h2 className="font-display text-2xl font-bold">{c.category}</h2>
                  <Accordion type="single" collapsible className="mt-5 space-y-3">
                    {c.items.map((item, i) => (
                      <AccordionItem
                        key={item.q}
                        value={`${c.category}-${i}`}
                        className="card-elevated border-b px-5 data-[state=open]:border-primary/40"
                      >
                        <AccordionTrigger className="py-4 text-left font-display text-base font-semibold hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>
        </div>
      </Section>

      <PricingSection tone="muted" />
      <NetBillingSection />
      <FaqSection tone="muted" />

      <Section>
        <SectionHeading
          title="Still have a question?"
          subtitle="Open the Solar AI assistant in the corner of the screen and ask in your own words."
        />
      </Section>
    </>
  );
}
