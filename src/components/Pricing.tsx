import { PRICING, MARKET_COMPARISON } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="section-apple relative hex-bg">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Pricing</p>
          <h2 className="section-title font-apple mt-3 text-white">Honest pricing. <span className="gradient-text-glow">No surprises.</span></h2>
          <p className="section-subtitle mx-auto mt-5">We undercut agencies by 30-80% while delivering the same quality. Pick a plan or get a custom quote.</p>
        </Reveal>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className={`relative rounded-[28px] p-[1.5px] transition-all duration-300 hover:-translate-y-2 ${p.popular ? "bg-gradient-to-br from-[var(--accent)] via-[var(--accent2)] to-[var(--accent4)] shadow-xl shadow-[var(--accent)]/15" : "bg-white/[0.08]"}`}>
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-5 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-[var(--accent)]/30">
                    Most Popular
                  </div>
                )}
                <div className="rounded-[27px] bg-[var(--bg-card)] p-8 h-full flex flex-col">
                  <div className="text-[14px] font-bold text-[var(--accent)]">{p.name}</div>
                  <div className="mt-1 text-[12px] text-white/40">{p.tagline}</div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-[44px] font-black text-white">{p.price}</span>
                    <span className="text-[13px] text-white/40">{p.priceNote}</span>
                  </div>
                  <div className="mt-1 text-[12px] text-white/25">Market: <span className="line-through">{p.market}</span></div>
                  <div className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-[13px] text-white/65">
                        <LineIcon name="check" size={14} className="mt-0.5 shrink-0 text-[var(--accent2)]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`https://wa.me/919620024812?text=Hi%20Pixel%20Studio!%20I%27m%20interested%20in%20the%20${p.name}%20plan.`} target="_blank" rel="noopener noreferrer" className={`mt-8 w-full text-center !text-[14px] ${p.popular ? "cta-primary" : "cta-outline"}`}>
                    {p.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Market Comparison */}
        <Reveal delay={200}>
          <div className="mt-24 rounded-[28px] bg-[var(--bg-card)] p-[1.5px] gradient-border neon-border">
            <div className="rounded-[27px] bg-[var(--bg-card)] p-6 sm:p-10">
              <h3 className="text-center text-[22px] font-black text-white">Market vs. <span className="text-[var(--accent2)]">Pixel Studio</span></h3>
              <p className="mt-2 text-center text-[14px] text-white/45">Why pay ₹50,000 when you can get the same result for ₹7,999?</p>
              <div className="mt-8 overflow-x-auto">
                <table className="pricing-table w-full">
                  <thead>
                    <tr>
                      <th className="rounded-tl-xl text-white/60">Service</th>
                      <th className="text-right text-white/40">Market Rate</th>
                      <th className="text-right text-[var(--accent2)]">Pixel Studio</th>
                      <th className="rounded-tr-xl text-right text-[var(--accent3)]">You Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MARKET_COMPARISON.map((r) => (
                      <tr key={r.service} className="hover:bg-white/[0.02] transition-colors">
                        <td className="font-semibold text-white">{r.service}</td>
                        <td className="text-right price-market">{r.market}</td>
                        <td className="text-right price-ours">{r.ours}</td>
                        <td className="text-right price-save">{r.save}</td>
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
