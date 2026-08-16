import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useSolarChat } from "./ChatProvider";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/calculator", label: "Solar Calculator" },
  { to: "/installation", label: "Installation" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { setOpen } = useSolarChat();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="solar"
            className="hidden sm:inline-flex"
            onClick={() => setOpen(true)}
          >
            <Sun className="size-4" strokeWidth={2.5} />
            Ask Solar AI
          </Button>
          <button
            className="rounded-lg border border-border p-2.5 text-foreground lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpenMenu((v) => !v)}
          >
            {openMenu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {openMenu ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpenMenu(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  pathname === l.to
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button
              variant="solar"
              className="mt-3 sm:hidden"
              onClick={() => {
                setOpenMenu(false);
                setOpen(true);
              }}
            >
              <Sun className="size-4" strokeWidth={2.5} />
              Ask Solar AI
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
