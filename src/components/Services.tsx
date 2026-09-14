import { SERVICES } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="section-apple relative hex-bg">
      <div className="orb absolute top-[15%] right-[5%] h-[200px] w-[200px] bg-[var(--accent)] opacity-8" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">What we build</p>
          <h2 className="section-title font-apple mt-3 text-white">Services that <span className="gradient-text-glow">dominate.</span></h2>
          <p className="section-subtitle mx-auto mt-5">From landing pages to full-scale e-commerce — we build websites that look stunning and convert visitors into customers.</p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div className="spotlight-card neon-border perspective-1200 card-3d group rounded-[24px] bg-[var(--bg-card)] p-6 transition-all duration-300">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent2)]/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--accent)]/20">
                  <LineIcon name={s.icon} size={24} className="text-[var(--accent)]" />
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-white">{s.name}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{s.desc}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[15px] font-bold text-[var(--accent2)]">{s.price}</span>
                  <span className="text-[12px] text-white/30 line-through">{s.market}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
