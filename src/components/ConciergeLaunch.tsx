"use client";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

const CAPS = [
  { icon: "zap" as const, title: "Instant answers", desc: "Get instant info on services, pricing, timelines, and more." },
  { icon: "spark" as const, title: "Smart guidance", desc: "Trained on Pixel Forge services — connects you to the right solution." },
  { icon: "whatsapp" as const, title: "Human handoff", desc: "One tap connects you to a real developer on WhatsApp." },
];

export default function ConciergeLaunch() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("concierge:open"));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="bot" className="section-apple relative bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">AI Assistant</p>
          <h2 className="section-title font-apple mt-3 text-white">Meet your <span className="gradient-text-glow">Pixel Forge AI.</span></h2>
          <p className="section-subtitle mx-auto mt-5">Ask anything about our services, pricing, timelines, or process — and get answers in seconds.</p>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:justify-center">
          <div className="grid w-full max-w-[560px] gap-4">
            {CAPS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-[22px] bg-[var(--bg-card)] p-5 neon-border transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent2)]/10">
                    <LineIcon name={c.icon} size={22} className="text-[var(--accent)]" />
                  </span>
                  <div>
                    <div className="text-[14.5px] font-bold text-white">{c.title}</div>
                    <div className="mt-0.5 text-[12.5px] text-white/50">{c.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="rounded-[30px] glass p-8 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] shadow-[0_0_40px_rgba(139,92,246,0.4)] animate-float">
                <LineIcon name="bot" size={38} color="#fff" />
              </div>
              <h3 className="mt-6 font-apple text-[19px] font-bold text-white">How can I help you?</h3>
              <p className="mx-auto mt-2 max-w-[280px] text-[13px] text-white/50">Get quotes, service info, delivery times — 24/7.</p>
              <button onClick={openChat} className="cta-primary mt-7 w-full press">
                <LineIcon name="bot" size={18} />
                Start AI Assistant
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
