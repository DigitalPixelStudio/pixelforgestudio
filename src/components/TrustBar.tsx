import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

const STATS = [
  { icon: "check-circle" as const, n: SITE.projectsCompleted, l: "Projects Delivered" },
  { icon: "star" as const, n: SITE.rating, l: "Client Rating" },
  { icon: "clock" as const, n: "2-14 Days", l: "Typical Delivery" },
  { icon: "shield" as const, n: "100%", l: "On-Time Delivery" },
];

export default function TrustBar() {
  return (
    <section className="relative border-t border-b border-white/5 bg-[var(--bg-alt)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div className="flex items-center gap-3 px-6 py-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10">
                <LineIcon name={s.icon} size={18} className="text-[var(--accent)]" />
              </span>
              <div>
                <div className="text-[16px] font-bold text-white">{s.n}</div>
                <div className="text-[11px] text-white/50">{s.l}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
