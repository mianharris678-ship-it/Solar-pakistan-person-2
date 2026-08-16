import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { FAQS } from "@/data/solar";
import { SectionHeading, Section } from "./Section";

export function FaqSection({ tone = "light" }: { tone?: "light" | "muted" }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <Section tone={tone} id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Search the questions Pakistani solar buyers ask most often."
      />
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, e.g. hybrid, battery, net billing"
            className="h-13 rounded-2xl pl-11"
          />
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        {results.length === 0 ? (
          <p className="rounded-2xl bg-muted/60 p-6 text-center text-sm text-muted-foreground">
            No questions matched “{query}”. Try a different term such as “inverter” or “price”.
          </p>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {results.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="card-elevated border-b px-5 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="py-4 text-left font-display text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
