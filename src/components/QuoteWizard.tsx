"use client";
import { useState } from "react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const SERVICE_TYPES = ["Business Website", "E-Commerce Store", "Landing Page", "PWA Web App", "AI Chatbot", "Website Redesign", "SEO Package", "Other"];
const BUDGET_RANGES = ["Under ₹5,000", "₹5,000 – ₹10,000", "₹10,000 – ₹20,000", "₹20,000 – ₹50,000", "₹50,000+"];
const TIMELINES = ["ASAP", "1 week", "2-3 weeks", "1 month", "Flexible"];

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const submit = () => {
    const msg = `Hi Pixel Studio! 👋\n\nI need a quote:\n📌 Service: ${service}\n💰 Budget: ${budget}\n⏱ Timeline: ${timeline}\n👤 Name: ${name}\n📝 Details: ${details || "Not specified"}\n\nPlease send me a custom quote. Thank you!`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setStep(0);
    setService(""); setBudget(""); setTimeline(""); setName(""); setDetails("");
  };

  const chips = (items: string[], val: string, set: (v: string) => void) => (
    <div className="flex flex-wrap gap-2 mt-4">
      {items.map((c) => (
        <button key={c} onClick={() => set(c)} className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${val === c ? "border-[var(--accent)] bg-[var(--accent)]/15 text-white shadow-lg shadow-[var(--accent)]/20" : "border-white/10 bg-white/[0.04] text-white/55 hover:border-white/20 hover:bg-white/[0.06]"}`}>
          {c}
        </button>
      ))}
    </div>
  );

  return (
    <section id="quote" className="section-apple relative bg-[var(--bg-alt)]">
      <div className="orb absolute top-[20%] left-[10%] h-[200px] w-[200px] bg-[var(--accent3)] opacity-8" />
      <div className="mx-auto max-w-[700px] px-6">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Get a quote</p>
          <h2 className="section-title font-apple mt-3 text-white">Tell us about <span className="gradient-text-glow">your project.</span></h2>
          <p className="section-subtitle mx-auto mt-5">3 quick questions → custom quote on WhatsApp in minutes.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 rounded-[28px] bg-[var(--bg-card)] p-6 sm:p-8 neon-border">
            <div className="flex items-center gap-2 mb-8">
              {[0, 1, 2].map((s) => (
                <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" : "bg-white/[0.08]"}`} />
              ))}
            </div>

            {step === 0 && (
              <div>
                <div className="text-[16px] font-bold text-white">What do you need built?</div>
                {chips(SERVICE_TYPES, service, setService)}
                <button disabled={!service} onClick={() => setStep(1)} className="cta-primary mt-8 w-full disabled:opacity-25">Next Step</button>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="text-[16px] font-bold text-white">What&apos;s your budget?</div>
                {chips(BUDGET_RANGES, budget, setBudget)}
                <button disabled={!budget} onClick={() => setStep(2)} className="cta-primary mt-8 w-full disabled:opacity-25">Next Step</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="text-[16px] font-bold text-white">Your details & timeline</div>
                {chips(TIMELINES, timeline, setTimeline)}
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
                <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Brief project description (optional)" rows={3} className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
                <button disabled={!name || !timeline} onClick={submit} className="cta-primary mt-6 w-full disabled:opacity-25">
                  📱 Send Quote on WhatsApp
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
