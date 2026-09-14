"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

type Msg = { from: "user" | "bot"; text: string; chips?: string[] };

const MENU: Record<string, { reply: string; chips?: string[] }> = {
  start: {
    reply: "Hey! I'm the Pixel Forge assistant. I can help you choose the right service, get a quote, or answer any questions. Tap an option below or type anything.",
    chips: ["Our services", "Get a quote", "Pricing", "How long?", "Talk to a human"],
  },
  services: {
    reply: "We build: Business Websites, E-Commerce Stores, PWA Web Apps, Landing Pages, AI Chatbots, SEO & Performance, Website Redesigns, and Maintenance Plans. Which one interests you?",
    chips: ["Business website", "E-commerce store", "AI chatbot", "Get a quote", "Talk to a human"],
  },
  quote: {
    reply: "Let's get you a free quote! Tap below to open our multi-step quote wizard, or message us directly on WhatsApp.",
    chips: ["Open quote form", "WhatsApp directly"],
  },
  pricing: {
    reply: "Our plans:\n• Starter: ₹4,999 (landing page, 3 days)\n• Business: ₹9,999 (8 pages + chatbot, 7 days)\n• Premium: ₹19,999 (unlimited + e-commerce, 14 days)\n\nAll plans include free hosting on Vercel. Market rate is 3-4x higher!",
    chips: ["Get a quote", "Compare plans", "Talk to a human"],
  },
  business: {
    reply: "Business websites are our bread and butter — custom design, responsive layout, SEO, analytics, WhatsApp integration. Starts at ₹4,999 with delivery in 3-7 days.",
    chips: ["Get a quote", "See pricing", "Talk to a human"],
  },
  ecommerce: {
    reply: "E-Commerce stores with product catalog, cart, payments (Razorpay/Stripe), order management, and admin dashboard. Starting at ₹9,999.",
    chips: ["Get a quote", "Pricing details", "Talk to a human"],
  },
  chatbot: {
    reply: "We build AI-powered chatbots that handle support, qualify leads, and work 24/7. Custom-trained on your business data. Starting at ₹3,999.",
    chips: ["Get a quote", "See demo", "Talk to a human"],
  },
  "how long": {
    reply: "Timelines: Landing pages 2-3 days, Business sites 5-7 days, E-Commerce 7-14 days. Rush delivery is available for all plans!",
    chips: ["Get a quote", "Our services", "Talk to a human"],
  },
  seo: {
    reply: "We optimize Core Web Vitals, site speed, technical SEO, meta tags, structured data, and Google Business profile. Packages from ₹2,499/mo.",
    chips: ["Get a quote", "Pricing", "Talk to a human"],
  },
  location: {
    reply: `${SITE.address}. Open ${SITE.hours}. We work with clients across India remotely, and in-person for Bangalore businesses.`,
    chips: ["Call us", "WhatsApp", "Open in Maps"],
  },
  human: {
    reply: "Our team is one tap away on WhatsApp. Tell us about your project and we'll respond within minutes.",
    chips: [],
  },
  portfolio: {
    reply: "Check out our live projects above! Highlights include the Red Apple Mobile Repair Store website (AI chatbot + quote wizard + PWA) and this very site.",
    chips: ["Our services", "Get a quote", "Talk to a human"],
  },
  hours: {
    reply: `We're available ${SITE.hours}. For urgent requests, WhatsApp us anytime — we usually respond within 1 hour.`,
    chips: ["Talk to a human", "Get a quote"],
  },
  payment: {
    reply: "50% advance to start, 50% on delivery. We accept UPI, bank transfer, and Razorpay. Invoices provided for all payments.",
    chips: ["Get a quote", "Pricing", "Talk to a human"],
  },
};

const INTENTS: { key: string; match: string[] }[] = [
  { key: "ecommerce", match: ["ecommerce", "e-commerce", "online store", "shop", "payment", "cart"] },
  { key: "business", match: ["business website", "business site", "corporate", "company website"] },
  { key: "chatbot", match: ["chatbot", "chat bot", "ai bot", "assistant", "automated reply"] },
  { key: "seo", match: ["seo", "search engine", "google ranking", "speed", "performance"] },
  { key: "pricing", match: ["price", "pricing", "cost", "how much", "budget", "rates", "expensive"] },
  { key: "how long", match: ["how long", "timeline", "delivery", "turnaround", "time", "quick", "fast", "days"] },
  { key: "payment", match: ["payment", "pay", "upi", "razorpay", "invoice", "advance"] },
  { key: "portfolio", match: ["portfolio", "work", "projects", "previous", "case study", "example"] },
  { key: "location", match: ["location", "address", "where", "bangalore", "visit", "meet"] },
  { key: "hours", match: ["hours", "timing", "open", "close", "available", "when"] },
  { key: "services", match: ["service", "offer", "provide", "what do you", "help", "build"] },
  { key: "quote", match: ["quote", "estimate", "proposal", "start project"] },
  { key: "human", match: ["human", "person", "call", "real", "agent", "someone"] },
];

const GREETINGS = new Set(["hi", "hey", "hello", "hii", "help", "start", "menu", "yo"]);
const FALLBACK_CHIPS = ["Our services", "Get a quote", "Pricing", "Talk to a human", "Send my question on WhatsApp"];
const FALLBACK = "I'm not sure about that — but I can help you pick a service, get a quote, or connect you with our team. Try one of these options below.";

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
    const wait = 500 + Math.min(clean.length * 12, 400);
    setTimeout(() => {
      if (key) {
        const item = MENU[key];
        setMsgs((m) => [...m, { from: "bot", text: item.reply, chips: item.chips }]);
      } else {
        setMsgs((m) => [...m, { from: "bot", text: FALLBACK, chips: FALLBACK_CHIPS }]);
      }
      setTyping(false);
    }, wait);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    send(draft.trim());
    setDraft("");
  };

  const chipAction = (chip: string) => {
    if (chip === "Send my question on WhatsApp") {
      const lastQ = [...msgs].reverse().find((m) => m.from === "user")?.text || "Hi Pixel Forge! I have a question about website development.";
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lastQ)}`, "_blank", "noopener,noreferrer");
      setMsgs((m) => [...m, { from: "user", text: chip }, { from: "bot", text: "Opening WhatsApp with your question — we'll reply within minutes.", chips: [] }]);
      return;
    }
    if (chip.includes("WhatsApp") || chip.includes("quote form") || chip.includes("quote")) {
      const msg = chip.includes("quote") ? "Hi Pixel Forge! I'd like to discuss a project and get a quote." : "Hi Pixel Forge! I need help with a website project.";
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      setMsgs((m) => [...m, { from: "user", text: chip }, { from: "bot", text: "Opening WhatsApp — our team usually replies within minutes.", chips: [] }]);
      return;
    }
    if (chip.includes("Call")) { window.open(SITE.phoneHref, "_self"); return; }
    if (chip.includes("Maps")) { window.open(SITE.mapsUrl, "_blank", "noopener,noreferrer"); return; }
    if (chip.includes("quote form")) { document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    if (chip.includes("Compare")) { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    if (chip.includes("demo") || chip.includes("See our")) { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); setMsgs((m) => [...m, { from: "user", text: chip }]); return; }
    send(chip.replace(/^[^\w]+/, "").trim());
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Open AI assistant" className="fixed bottom-24 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white shadow-2xl transition-transform hover:scale-110 animate-pulse-ring md:bottom-8 md:right-8">
        {open ? <LineIcon name="close" size={20} /> : <LineIcon name="bot" size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 z-[70] flex h-[540px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[28px] bg-[var(--bg-card)] shadow-2xl ring-1 ring-white/[0.08] md:bottom-24 md:right-8">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-5 py-4 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
              <LineIcon name="bot" size={20} />
            </span>
            <div>
              <div className="text-[14px] font-bold">Pixel Forge AI</div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-breathe" /> Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <LineIcon name="close" size={14} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--bg)] px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-[13px] leading-relaxed ${m.from === "user" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-card)] text-white/80 ring-1 ring-white/10"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-3xl bg-[var(--bg-card)] px-4 py-3 ring-1 ring-white/10">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length > 0 && msgs[msgs.length - 1].chips && msgs[msgs.length - 1].chips!.length > 0 && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-white/5 bg-[var(--bg-card)] px-4 py-3">
              {msgs[msgs.length - 1].chips!.map((c) => (
                <button key={c} onClick={() => chipAction(c)} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold text-white/70 transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/10">
                  {c}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/5 bg-[var(--bg-card)] px-4 py-3">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a question..." aria-label="Type a question" className="h-10 min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[var(--accent)]/50" />
            <button type="submit" disabled={!draft.trim()} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white shadow-md disabled:opacity-40 transition-all hover:scale-105">
              <LineIcon name="send" size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
