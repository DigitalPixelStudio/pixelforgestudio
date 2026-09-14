import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

const STEPS = [
  { icon: "search" as const, n: "01", title: "Discovery", desc: "We understand your business, audience, and goals to craft the right strategy." },
  { icon: "palette" as const, n: "02", title: "Design", desc: "Wireframes → mockups → interactive prototypes. You approve every pixel." },
  { icon: "code" as const, n: "03", title: "Develop", desc: "Clean, fast code using Next.js, React & Tailwind. Real-time progress updates." },
  { icon: "cloud" as const, n: "04", title: "Deploy", desc: "Production-grade hosting on Vercel. SSL, CDN, global edge — zero setup hassle." },
  { icon: "shield" as const, n: "05", title: "Support", desc: "Post-launch maintenance, updates, and priority support. We don&apos;t disappear." },
];

export default function Process() {
  return (
    <section className="section-apple relative hex-bg">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">How we work</p>
          <h2 className="section-title font-apple mt-3 text-white">From idea to <span className="gradient-text-glow">live site.</span></h2>
          <p className="section-subtitle mx-auto mt-5">A transparent 5-step process — you&apos;re in the loop at every stage.</p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative perspective-1200 card-3d rounded-[24px] bg-[var(--bg-card)] p-6 text-center neon-border">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-4 py-1 text-[11px] font-bold text-white shadow-lg shadow-[var(--accent)]/30">{s.n}</div>
                <div className="mx-auto mt-3 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent)]/10 transition-all duration-300 hover:scale-110">
                  <LineIcon name={s.icon} size={24} className="text-[var(--accent)]" />
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-white/45">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
