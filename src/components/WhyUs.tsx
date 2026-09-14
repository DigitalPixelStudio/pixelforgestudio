import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

const REASONS = [
  { icon: "rocket" as const, title: "Fast Delivery", desc: "Landing pages in 2-3 days. Full sites in 5-14 days. No months of waiting." },
  { icon: "zap" as const, title: "Blazing Performance", desc: "Next.js + Tailwind = sites that load in under 2 seconds. Core Web Vitals optimized." },
  { icon: "trending-up" as const, title: "Built to Convert", desc: "Every design decision is data-driven. Our sites turn visitors into paying customers." },
  { icon: "spark" as const, title: "AI-Powered Features", desc: "Chatbots, smart forms, content generation — we integrate AI where it matters." },
  { icon: "shield" as const, title: "Post-Launch Support", desc: "Free maintenance with every project. Monthly plans from ₹999/mo for ongoing care." },
  { icon: "shield" as const, title: "Transparent Pricing", desc: "No hidden fees. No surprise invoices. Fixed quotes delivered before work starts." },
];

export default function WhyUs() {
  return (
    <section className="section-apple relative bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Why Pixel Forge</p>
          <h2 className="section-title font-apple mt-3 text-white">We&apos;re not just developers. <span className="gradient-text-glow">We&apos;re partners.</span></h2>
          <p className="section-subtitle mx-auto mt-5">Agencies charge ₹50,000+ for what we deliver at a fraction. Here&apos;s why 50+ businesses trust us.</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="spotlight-card neon-border group rounded-[22px] bg-[var(--bg-card)] p-7 transition-all duration-300 hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)]/10 transition-all group-hover:scale-110 group-hover:bg-[var(--accent)]/20">
                  <LineIcon name={r.icon} size={22} className="text-[var(--accent)]" />
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
