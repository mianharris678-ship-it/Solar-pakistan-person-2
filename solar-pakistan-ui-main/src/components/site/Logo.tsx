import { Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="gradient-solar flex size-10 items-center justify-center rounded-xl shadow-[var(--shadow-glow)] transition-transform group-hover:rotate-12">
        <Sun className="size-5 text-navy" strokeWidth={2.5} />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-base font-bold tracking-tight",
            variant === "dark" ? "text-navy-foreground" : "text-foreground",
          )}
        >
          Solar AI Pakistan
        </span>
        <span
          className={cn(
            "block text-[11px]",
            variant === "dark" ? "text-navy-foreground/60" : "text-muted-foreground",
          )}
        >
          Smart Solar Solutions for Pakistan
        </span>
      </span>
    </Link>
  );
}
