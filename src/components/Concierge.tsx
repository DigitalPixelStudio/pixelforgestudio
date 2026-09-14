"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

type Msg = { from: "user" | "bot"; text: string; chips?: string[] };

const MENU: Record<string, { reply: string; chips?: string[] }> = {
  start: { reply: "Hey! I'm the Pixel Studio AI. I can help you choose a service, get a quote, or answer questions. Tap an option or type anything.", chips: ["Our services", "Get a quote", "Pricing", "How long?", "Talk to a human"] },
  services: { reply: "We build: Business Websites, E-Commerce Stores, PWA Web Apps, Landing Pages, AI Chatbots, SEO, Redesigns, and Maintenance Plans. Which one interests you?", chips: ["Business website", "E-commerce store", "AI chatbot", "Get a quote"] },
  quote: { reply: "Let's get you a free quote! Tap below to open our quote wizard, or message us on WhatsApp.", chips: ["Open quote form", "WhatsApp directly"] },
  pricing: { reply: "Plans:\n• Starter: ₹3,999 (landing page, 3 days)\n• Business: ₹7,999 (8 pages + chatbot, 7 days)\n• Premium: ₹14,999 (unlimited + e-commerce, 14 days)\nAll plans include free hosting. 30-70% below market!", chips: ["Get a quote", "Compare plans", "Talk to a human"] },
  business: { reply: "Business websites — custom design, responsive, SEO, analytics, WhatsApp integration. From ₹3,999, delivered in 3-7 days.", chips: ["Get a quote", "See pricing"] },
  ecommerce: { reply: "E-Commerce stores with catalog, cart, payments (Razorpay/Stripe), order management, admin dashboard. From ₹7,999.", chips: ["Get a quote", "Pricing details"] },
  chatbot: { reply: "AI chatbots that handle support, qualify leads, work 24/7. Custom-trained on your data. From ₹2,999.", chips: ["Get a quote", "See demo"] },
  "how long": { reply: "Timelines: Landing pages 2-3 days, Business sites 5-7 days, E-Commerce 7-14 days. Rush available!", chips: ["Get a quote", "Our services"] },
  seo: { reply: "Core Web Vitals, speed optimization, technical SEO, meta tags, structured data, Google Business. From ₹1,999/mo.", chips: ["Get a quote", "Pricing"] },
  payment: { reply: "50% advance, 50% on delivery. UPI, bank transfer, Razorpay. Invoices provided.", chips: ["Get a quote", "Pricing"] },
  portfolio: { reply: "Check our work section above! Highlights: Red Apple (AI chatbot + PWA), this very site, and e-commerce builds.", chips: ["Our services", "Get a quote"] },
  human: { reply: "Our team is one tap away on WhatsApp. Tell us about your project.", chips: [] },
};

const INTENTS: { key: string; match: string[] }[] = [
  { key: "ecommerce", match: ["ecommerce", "e-commerce", "online store", "shop", "payment", "cart"] },
  { key: "business", match: ["business website", "business site", "corporate", "company"] },
  { key: "chatbot", match: ["chatbot", "chat bot", "ai bot", "assistant"] },
  { key: "seo", match: ["seo", "search engine", "google ranking", "speed", "performance"] },
  { key: "pricing", match: ["price", "pricing", "cost", "how much", "budget", "rates"] },
  { key: "how long", match: ["how long", "timeline", "delivery", "turnaround", "time", "days"] },
  { key: "payment", match: ["payment", "pay", "upi", "razorpay", "invoice", "advance"] },
  { key: "portfolio", match: ["portfolio", "work", "projects", "previous", "example"] },
  { key: "services", match: ["service", "offer", "what do you", "help", "build"] },
  { key: "quote", match: ["quote", "estimate", "start project"] },
  { key: "human", match: ["human", "person", "call", "real", "agent", "someone"] },
];

const GREETINGS = new Set(["hi", "hey", "hello", "hii", "help", "start", "menu", "yo"]);
const FALLBACK_CHIPS = ["Our services", "Get a quote", "Pricing", "Talk to a human", "Send my question on WhatsApp"];
const FALLBACK = "I'm not sure about that — but I can help you pick a service, get a quote, or connect you with our team. Try one of these:";

const normalize = (t: string) => t.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

const resolveIntent = (raw: string): string | null => {
  const text = normalize(raw);
  if (!text) return null;
  for (const { key, match } of INTENTS) {
    if (match.some((m) => text.includes(m))) return key;
  }
  const words = text.split(" ");
  if (text.length <= 20 && words.some((w) => GREETINGS.has(w))) return "start";
  return null;
};

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: MENU.start.reply, chips: MENU.start.chips }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("concierge:open", onOpen);
    return () => window.removeEventListener("concierge:open", onOpen);
  }, []);

  const send = (text: string) => {
    const clean = normalize(text);
    if (!clean) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setTyping(true);
    const key = resolveIntent(clean);
    setTimeout(() => {
      if (key) {
        const item = MENU[key];
        setMsgs((m) => [...m, { from: "bot", text: item.reply, chips: item.chips }]);
      } else {
        setMsgs((m) => [...m, { from: "bot", text: FALLBACK, chips: FALLBACK_CHIPS }]);
      }
      setTyping(false);
    }, 450 + Math.min(clean.length * 12, 400));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    send(draft.trim());
    setDraft("");
  };

  const chipAction = (chip: string) => {
    if (chip === "Send my question on WhatsApp") {
      const lastQ = [...msgs].reverse().find((m) => m.from === "user")?.text || "Hi Pixel Studio! I have a question.";
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lastQ)}`, "_blank", "noopener,noreferrer");
      setMsgs((m) => [...m, { from: "user", text: chip }, { from: "bot", text: "Opening WhatsApp with your question.", chips: [] }]);
      return;
    }
    if (chip.includes("WhatsApp") || chip.includes("quote form") || chip.includes("quote")) {
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Pixel Studio! I'd like a quote.")}`, "_blank", "noopener,noreferrer");
      setMsgs((m) => [...m, { from: "user", text: chip }, { from: "bot", text: "Opening WhatsApp — we reply within minutes.", chips: [] }]);
      return;
    }
    if (chip.includes("Call")) { window.open(SITE.phoneHref, "_self"); return; }
    if (chip.includes("Compare")) { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    if (chip.includes("demo") || chip.includes("work")) { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    if (chip.includes("quote form")) { document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    send(chip.replace(/^[^\w]+/, "").trim());
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Open AI assistant" className="fixed bottom-24 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white shadow-2xl shadow-[var(--accent)]/30 transition-all duration-300 hover:scale-110 animate-pulse-ring lg:bottom-8 lg:right-8">
        {open ? <LineIcon name="close" size={20} /> : <LineIcon name="bot" size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 z-[70] flex h-[540px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[28px] bg-[var(--bg-card)] shadow-2xl ring-1 ring-white/[0.06] lg:bottom-24 lg:right-8">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-5 py-4 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><LineIcon name="bot" size={20} /></span>
            <div>
              <div className="text-[14px] font-bold">{SITE.name} AI</div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-breathe" /> Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"><LineIcon name="close" size={14} /></button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--bg)] px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-[13px] leading-relaxed ${m.from === "user" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-white/75 ring-1 ring-white/[0.06]"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-3xl bg-[var(--bg-card)] px-4 py-3 ring-1 ring-white/[0.06]">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35 [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length > 0 && msgs[msgs.length - 1].chips && msgs[msgs.length - 1].chips!.length > 0 && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
              {msgs[msgs.length - 1].chips!.map((c) => (
                <button key={c} onClick={() => chipAction(c)} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-semibold text-white/60 transition-all duration-300 hover:border-[var(--accent)]/35 hover:bg-[var(--accent)]/10 hover:text-white">
                  {c}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a question..." aria-label="Type a question" className="h-10 min-w-0 flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 text-[13px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
            <button type="submit" disabled={!draft.trim()} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white shadow-md disabled:opacity-35 transition-all duration-300 hover:scale-105">
              <LineIcon name="send" size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
