import { Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";

const QUICK = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/knowledge", label: "Solar Knowledge" },
  { to: "/products", label: "Products" },
] as const;

const EXPLORE = [
  { to: "/products", label: "Products" },
  { to: "/calculator", label: "Calculator" },
  { to: "/installation", label: "Installation" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/contact", label: "Contact" },
] as const;

const LEGAL = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="gradient-solar flex size-10 items-center justify-center rounded-xl">
              <Sun className="size-5 text-navy" strokeWidth={2.5} />
            </span>
            <span className="font-display text-base font-bold text-navy-foreground">
              Solar AI Pakistan
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/65">
            Smart solar solutions for Pakistan. Explore solar products, understand your options and
            estimate your system requirements before you invest.
          </p>
        </div>

        <FooterColumn title="Quick Links" links={QUICK} />
        <FooterColumn title="Explore" links={EXPLORE} />
        <div>
          <h3 className="font-display text-sm font-bold tracking-wide text-navy-foreground uppercase">
            Legal
          </h3>
          <ul className="mt-4 space-y-2.5">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-navy-foreground/65 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-navy-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Solar AI Pakistan. All figures on this site are indicative.</p>
          <p>Smart Solar Solutions for Pakistan</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold tracking-wide text-navy-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-navy-foreground/65 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
