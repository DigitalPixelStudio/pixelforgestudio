import { TESTIMONIALS } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="section-apple relative">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Client love</p>
          <h2 className="section-title font-apple mt-3 text-white">What our <span className="gradient-text-glow">clients say.</span></h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="spotlight-card rounded-[22px] bg-[var(--bg-card)] p-7 neon-border transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <LineIcon key={j} name="star" size={14} className="text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-white/70">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-[14px] font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
