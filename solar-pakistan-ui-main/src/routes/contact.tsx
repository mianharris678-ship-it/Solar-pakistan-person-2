import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageSquare, Send, Sun } from "lucide-react";
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
import { useSolarChat } from "@/components/site/ChatProvider";
import { CITY_SUN_HOURS } from "@/data/solar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact â€” Get Solar Guidance | Solar AI Pakistan" },
      {
        name: "description",
        content:
          "Send your solar requirements â€” consumption, city and backup needs â€” and get guidance on the right system size and equipment.",
      },
      { property: "og:title", content: "Get Solar Guidance" },
      {
        property: "og:description",
        content: "Share your requirements and get guidance on system type, size and equipment.",
      },
    ],
  }),
  component: ContactPage,
});

const REQUIREMENTS = [
  "New solar installation",
  "System sizing advice",
  "Battery / backup upgrade",
  "Net metering guidance",
  "Maintenance & service",
  "General question",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { setOpen } = useSolarChat();

  return (
    <>
      <section className="gradient-hero py-14">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold text-navy-foreground sm:text-5xl">
            Get Solar Guidance
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/70">
            Tell us your monthly consumption, city and backup requirement, and we will point you to a
            suitable system type, size and equipment set.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {submitted ? (
              <div className="card-elevated flex flex-col items-center p-10 text-center">
                <span className="gradient-solar flex size-14 items-center justify-center rounded-2xl">
                  <CheckCircle2 className="size-7 text-navy" strokeWidth={2.2} />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold">Message received</h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thank you â€” your message has been received. Our team will review your solar
                  requirements and prepare the next guidance step.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                className="card-elevated space-y-5 p-6 sm:p-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  toast.success("Message submitted");
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Name</Label>
                    <Input id="c-name" required placeholder="Your full name" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-phone">Phone</Label>
                    <Input
                      id="c-phone"
                      required
                      type="tel"
                      placeholder="03xx xxxxxxx"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">Email</Label>
                    <Input
                      id="c-email"
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
                  <Label>Installation requirement</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="What do you need?" />
                    </SelectTrigger>
                    <SelectContent>
                      {REQUIREMENTS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-msg">Message</Label>
                  <Textarea
                    id="c-msg"
                    required
                    rows={5}
                    placeholder="Monthly units, bill amount, backup hours, roof detailsâ€¦"
                  />
                </div>
                <Button type="submit" variant="solar" size="lg" className="w-full">
                  <Send className="size-4" /> Get Solar Guidance
                </Button>
                <Note>Share accurate bill and backup details so the guidance can be more useful.</Note>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="card-elevated p-6">
              <span className="gradient-solar flex size-12 items-center justify-center rounded-2xl">
                <Sun className="size-6 text-navy" strokeWidth={2.4} />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold">Ask Solar AI instead</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Get instant answers on sizing, equipment, pricing and net metering from the built-in
                assistant.
              </p>
              <Button variant="solar" className="mt-5 w-full" onClick={() => setOpen(true)}>
                Open Solar AI
              </Button>
            </div>
            <div className="card-elevated p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <MessageSquare className="size-6 text-primary" strokeWidth={2.2} />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold">Before you write</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Running the calculator first makes your enquiry much easier to answer.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button asChild variant="outline">
                  <Link to="/calculator">Open Solar Calculator</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/knowledge">Browse Knowledge</Link>
                </Button>
              </div>
            </div>
            <div className="card-elevated p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Mail className="size-6 text-accent-foreground" strokeWidth={2.2} />
              </span>
              <h2 className="mt-5 font-display text-lg font-bold">Response details</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact channels will be published once this platform goes live. For now, please use
                the form or the Solar AI assistant.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Request an installation"
          subtitle="If you already know what you need, submit an installation request with your site details."
        />
        <div className="mt-8 text-center">
          <Button asChild variant="solar" size="lg">
            <Link to="/installation">Request Installation</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
