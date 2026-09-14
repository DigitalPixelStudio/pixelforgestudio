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

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="rounded-[16px] bg-[var(--bg-card)] neon-border overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left">
                  <span className="text-[14px] font-semibold text-white pr-4">{f.q}</span>
                  <LineIcon name={open === i ? "chevron-up" : "chevron-down"} size={16} className="shrink-0 text-[var(--accent)]" />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-[13px] leading-relaxed text-white/50">{f.a}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
