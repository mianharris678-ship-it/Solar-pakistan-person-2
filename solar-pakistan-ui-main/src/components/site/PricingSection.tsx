import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SYSTEM_PRICING } from "@/data/solar";
import { Note, SectionHeading, Section } from "./Section";

export function PricingSection({ tone = "light" }: { tone?: "light" | "muted" }) {
  return (
    <Section tone={tone} id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Solar System Pricing"
        subtitle="Approximate installed system prices documented for the Pakistani market."
      />
      <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-navy-foreground">
            <tr>
              <th className="px-5 py-4 font-display font-semibold">System</th>
              <th className="px-5 py-4 text-right font-display font-semibold">
                Approximate Price
              </th>
            </tr>
          </thead>
          <tbody>
            {SYSTEM_PRICING.map((p) => (
              <tr key={p.system} className="border-t border-border transition-colors hover:bg-muted/60">
                <td className="px-5 py-4 font-medium">{p.system}</td>
                <td className="px-5 py-4 text-right text-muted-foreground">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note className="mt-8">
        Indicative prices only. Actual prices vary by equipment, brand, installation and market
        conditions.
      </Note>
      <div className="mt-8 text-center">
        <Button asChild variant="solar" size="lg">
          <Link to="/calculator">Estimate my system</Link>
        </Button>
      </div>
    </Section>
  );
}
