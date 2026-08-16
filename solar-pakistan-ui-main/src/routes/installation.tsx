import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Note, Section, SectionHeading } from "@/components/site/Section";
import { MaintenanceSection } from "@/components/site/MaintenanceSection";
import { WarrantySection } from "@/components/site/WarrantySection";
import { INSTALL_PROCESS, INSTALL_STEPS, CITY_SUN_HOURS } from "@/data/solar";
import installImage from "@/assets/installation.jpg";

export const Route = createFileRoute("/installation")({
  head: () => ({
    meta: [
      { title: "Solar Installation Process in Pakistan â€” Solar AI Pakistan" },
      {
        name: "description",
        content:
          "From site survey and load assessment to wiring, net metering and commissioning â€” how a solar system is installed in Pakistan.",
      },
      { property: "og:title", content: "Solar Installation Process in Pakistan" },
      {
        property: "og:description",
        content: "Site survey, design, mounting, wiring, net metering and commissioning explained.",
      },
    ],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
              Solar Installation
            </h1>
            <p className="mt-4 max-w-xl text-navy-foreground/70">
              A properly surveyed, designed and commissioned system performs better and lasts
              longer. Here is what a professional installation involves.
            </p>
          </div>
          <img
            src={installImage}
            alt="Technicians installing solar panels on a mounting structure"
            loading="lazy"
            width={1400}
            height={900}
            className="w-full rounded-3xl border border-navy-foreground/10 object-cover shadow-[var(--shadow-card)]"
          />
        </div>
      </section>

      {/* PROCESS FLOW */}
      <Section>
        <SectionHeading
          eyebrow="Process"
          title="From Survey to Commissioning"
          subtitle="Eight stages, in order, from the first site visit to handover."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {INSTALL_PROCESS.map((p, i) => (
            <div key={p} className="flex items-center gap-3">
              <div className="card-elevated hover-lift flex items-center gap-2.5 px-4 py-3">
                <span className="gradient-solar flex size-7 items-center justify-center rounded-full font-display text-xs font-bold text-navy">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold">{p}</span>
              </div>
              {i < INSTALL_PROCESS.length - 1 ? (
                <span className="hidden text-primary sm:inline">â†’</span>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* DETAILED STEPS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What happens on site"
          title="Installation Stages in Detail"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSTALL_STEPS.map((s, i) => (
            <div key={s.title} className="card-elevated hover-lift p-6">
              <span className="font-display text-sm font-bold text-primary">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <MaintenanceSection tone="light" />
      <WarrantySection tone="muted" />

      {/* REQUEST FORM */}
      <Section id="request">
        <SectionHeading
          eyebrow="Get started"
          title="Request Installation"
          subtitle="Share your requirements and we will get back to you with next steps."
        />
        <div className="mx-auto mt-10 max-w-2xl">
          {submitted ? (
            <div className="card-elevated flex flex-col items-center p-10 text-center">
              <span className="gradient-solar flex size-14 items-center justify-center rounded-2xl">
                <CheckCircle2 className="size-7 text-navy" strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">Request received</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Thank you - your installation request has been received. Our team will review the details and prepare the next steps.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                Submit another request
              </Button>
            </div>
          ) : (
            <form
              className="card-elevated space-y-5 p-6 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                toast.success("Installation request submitted");
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="i-name">Name</Label>
                  <Input id="i-name" required placeholder="Your full name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i-phone">Phone</Label>
                  <Input
                    id="i-phone"
                    required
                    type="tel"
                    placeholder="03xx xxxxxxx"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i-email">Email</Label>
                  <Input
                    id="i-email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITY_SUN_HOURS.map((c) => (
                        <SelectItem key={c.city} value={c.city}>
                          {c.city}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-req">Requirements</Label>
                <Textarea
                  id="i-req"
                  required
                  rows={5}
                  placeholder="Monthly units, backup needs, roof type, preferred systemâ€¦"
                />
              </div>
              <Button type="submit" variant="solar" size="lg" className="w-full">
                <Send className="size-4" /> Request Installation
              </Button>
              <Note>
                Share accurate site details so the installation plan can be reviewed properly.
              </Note>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
