import Reveal from "./Reveal";

const PROJECTS = [
  {
    title: "Red Apple Mobile Repair Store",
    desc: "Full-stack website with AI concierge, quote wizard, dynamic island, PWA — 40+ components, Apple-quality design.",
    tags: ["Next.js", "AI Chatbot", "PWA", "WhatsApp Integration"],
    link: "https://red-apple-repair.vercel.app",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "Pixel Forge Agency Site",
    desc: "Dark futuristic design with glowing effects, 3D tilt cards, animated gradient borders — this very site you're viewing.",
    tags: ["Next.js 16", "Tailwind 4", "Dark Theme", "3D Effects"],
    link: "#",
    color: "from-purple-500/20 to-teal-500/20",
  },
  {
    title: "E-Commerce Platform",
    desc: "Full-featured online store with inventory management, Stripe payments, and real-time order tracking.",
    tags: ["React", "E-Commerce", "Stripe", "Admin Panel"],
    link: "#",
    color: "from-blue-500/20 to-cyan-500/20",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="section-apple relative bg-[var(--bg-alt)]">
      <div className="orb-reverse absolute bottom-[10%] left-[5%] h-[250px] w-[250px] bg-[var(--accent2)] opacity-10" />
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Our work</p>
          <h2 className="section-title font-apple mt-3 text-white">Projects that <span className="gradient-text-glow">speak for themselves.</span></h2>
          <p className="section-subtitle mx-auto mt-5">Real results for real businesses. Every project is built with the same care and precision.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="spotlight-card tilt-wrap group rounded-[22px] bg-[var(--bg-card)] p-6 neon-border transition-all duration-300">
                <div className={`tilt-inner h-40 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                  <span className="text-[36px] font-bold text-white/20">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">{t}</span>
                  ))}
                </div>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] hover:text-[var(--accent2)] transition-colors">
                    View Live Site →
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
