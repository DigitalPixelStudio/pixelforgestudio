import { STATS } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function TrustBar() {
  return (
    <section className="relative border-t border-b border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="flex items-center gap-4 px-6 py-6 hover-pop">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--accent)]/10 neon-border">
                <LineIcon name={s.icon} size={20} className="text-[var(--accent)]" />
              </span>
              <div>
                <div className="text-[20px] font-black text-white">{s.value}</div>
                <div className="text-[11px] font-medium text-white/45">{s.label}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
