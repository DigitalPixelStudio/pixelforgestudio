import Reveal from "./Reveal";

const PROJECTS = [
  { title: "Red Apple Mobile Repair Store", desc: "Full-stack website with AI concierge, quote wizard, dynamic island, PWA — 40+ components, Apple-quality design.", tags: ["Next.js", "AI Chatbot", "PWA", "WhatsApp"], link: "https://red-apple-repair.vercel.app", gradient: "from-red-500/25 to-orange-500/25" },
  { title: "Pixel Studio Agency", desc: "This very site — dark futuristic design with glowing effects, 3D tilt cards, animated gradient borders.", tags: ["Next.js 16", "Tailwind 4", "Dark Theme", "3D Effects"], link: "#", gradient: "from-purple-500/25 to-cyan-500/25" },
  { title: "E-Commerce Platform", desc: "Full-featured online store with inventory management, Stripe payments, and real-time order tracking.", tags: ["React", "E-Commerce", "Stripe", "Admin Panel"], link: "#", gradient: "from-blue-500/25 to-teal-500/25" },
];

export default function Portfolio() {
  return (
    <section id="work" className="section-apple relative bg-[var(--bg-alt)]">
      <div className="orb-reverse absolute bottom-[10%] left-[5%] h-[250px] w-[250px] bg-[var(--accent2)] opacity-10" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Our work</p>
          <h2 className="section-title font-apple mt-3 text-white">Projects that <span className="gradient-text-glow">speak for themselves.</span></h2>
          <p className="section-subtitle mx-auto mt-5">Real results for real businesses. Every project built with the same care and precision.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="spotlight-card perspective-1200 card-3d group rounded-[24px] bg-[var(--bg-card)] p-6 neon-border">
                <div className={`h-44 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                  <span className="text-[48px] font-black text-white/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-[17px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/50">{t}</span>
                  ))}
                </div>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-300 hover:gap-3">
                    View Live Site <span className="text-[16px]">→</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
