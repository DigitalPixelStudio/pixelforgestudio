import { SERVICES } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="section-apple relative">
      <div className="orb absolute top-[20%] right-[5%] h-[200px] w-[200px] bg-[var(--accent)] opacity-10" />
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">What we build</p>
          <h2 className="section-title font-apple mt-3 text-white">Services that <span className="gradient-text-glow">drive growth.</span></h2>
          <p className="section-subtitle mx-auto mt-5">From landing pages to full-scale e-commerce — we build websites that look stunning and convert visitors into customers.</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div className="spotlight-card neon-border group rounded-[22px] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent2)]/10 transition-all group-hover:scale-110">
                  <LineIcon name={s.icon} size={22} className="text-[var(--accent)]" />
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-white">{s.name}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">{s.desc}</p>
                <div className="mt-4 text-[13px] font-semibold text-[var(--accent2)]">{s.price}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
