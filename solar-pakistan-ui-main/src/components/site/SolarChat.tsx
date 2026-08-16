import { useEffect, useRef, useState } from "react";
import { Send, Sun, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSolarChat } from "./ChatProvider";
import { CHAT_FALLBACK, CHAT_RESPONSES, CHAT_SUGGESTIONS } from "@/data/solar";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "bot"; text: string };

function getSolarReply(input: string) {
  const q = input.toLowerCase();
  const hit = CHAT_RESPONSES.find((r) => r.match.some((m) => q.includes(m)));
  return hit ? hit.reply : CHAT_FALLBACK;
}

async function askBackend(message: string) {
  const api = import.meta.env["VITE_API_URL"] ?? "http://localhost:8000";
  const res = await fetch(`${api}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Chat API failed");
  const data = (await res.json()) as { answer: string };
  return data.answer;
}
const GREETING: Message = {
  role: "bot",
  text: "Assalam-o-Alaikum! I can explain solar panels, inverters, batteries, system sizing, pricing and net metering in Pakistan. Ask me anything, or pick a question below.",
};

export function SolarChat() {
  const { open, setOpen } = useSolarChat();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setValue("");
    setTyping(true);
    try {
      const reply = await askBackend(clean);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: getSolarReply(clean) }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open Solar AI assistant"
        className={cn(
          "gradient-solar fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-display text-sm font-bold text-navy shadow-[var(--shadow-glow)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6",
          open && "hidden",
        )}
      >
        <Sun className="size-5" strokeWidth={2.5} />
        Solar AI
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:p-6">
          <button
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
          />
          <div className="animate-rise relative flex h-full w-full flex-col overflow-hidden rounded-none border border-border bg-card shadow-[var(--shadow-card)] sm:h-[min(640px,90vh)] sm:w-[420px] sm:rounded-3xl">
            <div className="gradient-hero flex items-center gap-3 px-5 py-4">
              <span className="gradient-solar flex size-10 items-center justify-center rounded-xl">
                <Sun className="size-5 text-navy" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold text-navy-foreground">
                  Solar AI Assistant
                </p>
                <p className="truncate text-xs text-navy-foreground/70">
                  Your Pakistan Solar Energy Companion
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-2 text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing ? (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
                    <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                    <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                    <span className="size-2 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border px-4 pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                <Sparkles className="size-3 text-primary" /> Suggested questions
              </p>
              <div className="flex flex-wrap gap-2 pb-3">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:bg-secondary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(value);
              }}
              className="flex items-center gap-2 border-t border-border px-4 py-3"
            >
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask about solar in Pakistan..."
                className="h-11 rounded-xl"
              />
              <Button type="submit" variant="solar" size="icon" className="size-11 rounded-xl">
                <Send className="size-4" />
              </Button>
            </form>
            <p className="bg-muted/60 px-4 py-2 text-center text-[11px] text-muted-foreground">
              Answers are based on the Solar AI Pakistan knowledge base.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
