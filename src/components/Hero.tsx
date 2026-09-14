"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: 1.5 + Math.random() * 3, delay: Math.random() * 8, duration: 8 + Math.random() * 10,
}));

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-16 hex-bg">
      <div ref={glowRef} className="cursor-glow hidden md:block" />

      {/* Orbs */}
      <div className="orb absolute top-[10%] left-[8%] h-[350px] w-[350px] bg-[var(--accent)] opacity-15" />
      <div className="orb-reverse absolute bottom-[15%] right-[5%] h-[300px] w-[300px] bg-[var(--accent2)] opacity-12" />
      <div className="orb absolute top-[55%] left-[45%] h-[200px] w-[200px] bg-[var(--accent4)] opacity-10" />
      <div className="orb-reverse absolute top-[30%] right-[30%] h-[180px] w-[180px] bg-[var(--accent3)] opacity-8" />

      {/* Particles */}
      <div className="particles-layer">
        {PARTICLES.map((p) => (
          <div key={p.id} className="particle" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 text-center">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-5 py-2.5 text-[13px] font-semibold text-[var(--accent2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent2)] animate-breathe" />
            Available for new projects
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero-apple text-white">
            <span className="text-[1.2em] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent4)]" style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)" }}>
              {SITE.name}
            </span>
            <br />
            We Build Websites That
            <br />
            <span className="gradient-text-glow animate-breathe">Make You Famous</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-sub mx-auto mt-8">
            Hyper-modern website development agency in Bangalore. Custom websites, e-commerce, PWAs, AI chatbots — built with cutting-edge tech at 30% less than market rates.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!%20I%27d%20like%20to%20start%20a%20project.`} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] !px-8 !py-4">
              🚀 Start Your Project
            </a>
            <a href="#work" className="cta-outline text-[15px] !px-8 !py-4">
              See Our Work
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: SITE.projectsCompleted, l: "Projects Done" },
              { n: SITE.satisfactionRate, l: "Client Satisfaction" },
              { n: SITE.clientsServed, l: "Happy Clients" },
              { n: "30%", l: "Cheaper Than Market" },
            ].map((s) => (
              <div key={s.l} className="perspective-1200 card-3d rounded-[20px] bg-white/[0.03] p-5 border border-white/[0.06]">
                <div className="text-[32px] font-black text-white sm:text-[40px]">{s.n}</div>
                <div className="mt-1 text-[12px] font-medium text-white/45">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
