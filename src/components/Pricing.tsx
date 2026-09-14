import { PRICING, PRICING_REPAIR } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="section-apple relative">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Pricing</p>
          <h2 className="section-title font-apple mt-3 text-white">Honest pricing. <span className="gradient-text-glow">No surprises.</span></h2>
          <p className="section-subtitle mx-auto mt-5">We undercut agencies by 70%+ while delivering the same quality. Pick a plan or get a custom quote.</p>
        </Reveal>

        {/* Pricing cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className={`relative rounded-[24px] p-[1px] transition-all duration-300 hover:-translate-y-1 ${p.popular ? "bg-gradient-to-br from-[var(--accent)] via-[var(--accent2)] to-[var(--accent3)]" : "bg-white/10"}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-4 py-1 text-[11px] font-bold text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="rounded-[23px] bg-[var(--bg-card)] p-7 h-full flex flex-col">
                  <div className="text-[13px] font-semibold text-[var(--accent)]">{p.name}</div>
                  <div className="mt-1 text-[12px] text-white/40">{p.tagline}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-[40px] font-bold text-white">{p.price}</span>
                    <span className="text-[13px] text-white/40">{p.priceNote}</span>
                  </div>
                  <div className="mt-1 text-[12px] text-white/30">Market: <span className="line-through">{p.market}</span></div>
                  <div className="mt-5 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-[13px] text-white/70">
                        <LineIcon name="check" size={14} className="mt-0.5 shrink-0 text-[var(--accent2)]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`https://wa.me/919620024812?text=Hi%20Pixel%20Forge!%20I%27m%20interested%20in%20the%20${p.name}%20plan.`} target="_blank" rel="noopener noreferrer" className={`mt-6 w-full text-center ${p.popular ? "cta-primary" : "cta-outline"}`}>
                    {p.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Price comparison table */}
        <Reveal delay={200}>
          <div className="mt-20 rounded-[24px] bg-[var(--bg-card)] p-1 neon-border gradient-border">
            <div className="rounded-[23px] bg-[var(--bg-card)] p-6 sm:p-8">
              <h3 className="text-center text-[18px] font-bold text-white">Market vs. Pixel Forge</h3>
              <p className="mt-2 text-center text-[13px] text-white/50">Why pay ₹75,000 when you can get the same result for ₹9,999?</p>
              <div className="mt-6 overflow-x-auto">
                <table className="pricing-table w-full">
                  <thead>
                    <tr>
                      <th className="rounded-tl-xl text-white/60">Service</th>
                      <th className="text-right text-white/40">Market Rate</th>
                      <th className="rounded-tr-xl text-right text-[var(--accent2)]">Pixel Forge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICING_REPAIR.map((r) => (
                      <tr key={r.service}>
                        <td className="font-medium text-white">{r.service}</td>
                        <td className="text-right price-market">{r.official}</td>
                        <td className="text-right price-ours font-bold">{r.ours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
