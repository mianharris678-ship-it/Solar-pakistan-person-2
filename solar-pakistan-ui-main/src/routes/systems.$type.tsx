import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/site/Section";
import { SYSTEM_TYPES, type SystemType } from "@/data/solar";

export const Route = createFileRoute("/systems/$type")({
  loader: ({ params }) => {
    const system = SYSTEM_TYPES.find((s) => s.slug === params.type);
    if (!system) throw notFound();
    return { system };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "System not found — Solar AI Pakistan" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.system.name} Solar Systems in Pakistan — Solar AI Pakistan`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.system.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.system.summary },
      ],
    };
  },
  component: SystemDetail,
});

function SystemDetail() {
  const { system } = Route.useLoaderData() as { system: SystemType };

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-navy-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-wide text-navy-foreground uppercase sm:text-5xl">
            {system.name}
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">{system.summary}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-elevated p-7">
            <h2 className="font-display text-xl font-bold">Key characteristics</h2>
            <ul className="mt-6 space-y-3">
              {system.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-elevated p-7">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-bold">
              <Target className="size-5 text-primary" /> Best suited for
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{system.bestFor}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="solar">
                <Link to="/calculator">Size this system</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Browse equipment</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {SYSTEM_TYPES.map((s) => (
            <Link
              key={s.slug}
              to="/systems/$type"
              params={{ type: s.slug }}
              className={`card-elevated hover-lift p-5 ${
                s.slug === system.slug ? "border-primary/50 bg-secondary/50" : ""
              }`}
            >
              <p className="font-display text-sm font-bold uppercase">{s.name}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{s.summary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
