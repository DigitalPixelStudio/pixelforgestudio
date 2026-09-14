"use client";
import { useState } from "react";
import { FAQS } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section-apple relative bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[800px] px-6">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">FAQ</p>
          <h2 className="section-title font-apple mt-3 text-white">Got questions? <span className="gradient-text-glow">We&apos;ve got answers.</span></h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="rounded-[20px] bg-[var(--bg-card)] neon-border overflow-hidden transition-all duration-300">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-7 py-5 text-left">
                  <span className="text-[14.5px] font-bold text-white pr-4">{f.q}</span>
                  <LineIcon name={open === i ? "chevron-up" : "chevron-down"} size={18} className={`shrink-0 transition-all duration-300 ${open === i ? "text-[var(--accent2)] rotate-180" : "text-[var(--accent)]"}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${open === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-7 pb-6 text-[13.5px] leading-relaxed text-white/45">{f.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
