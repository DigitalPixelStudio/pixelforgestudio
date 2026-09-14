"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 8,
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
    <section className="relative min-h-[100vh] overflow-hidden flex items-center justify-center pt-24 pb-16">
      {/* Cursor glow */}
      <div ref={glowRef} className="cursor-glow hidden md:block" />

      {/* Orbs */}
      <div className="orb absolute top-[15%] left-[10%] h-[300px] w-[300px] bg-[var(--accent)] opacity-20" />
      <div className="orb-reverse absolute bottom-[20%] right-[8%] h-[250px] w-[250px] bg-[var(--accent2)] opacity-15" />
      <div className="orb absolute top-[60%] left-[50%] h-[200px] w-[200px] bg-[var(--accent3)] opacity-10" />

      {/* Particles */}
      <div className="particles-layer">
        {PARTICLES.map((p) => (
          <div key={p.id} className="particle" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-2 text-[13px] font-semibold text-[var(--accent2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent2)] animate-breathe" />
            Available for new projects
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero-apple text-white">
            We Forge<br />
            <span className="gradient-text-glow">Digital Excellence</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-sub mx-auto mt-6">
            Full-stack website development studio in Bangalore. Custom websites, e-commerce stores, PWAs, AI chatbots — built to convert and scale.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/919620024812?text=Hi%20Pixel%20Forge!%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="cta-primary">
              Start Your Project
            </a>
            <a href="#work" className="cta-outline">
              See Our Work
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: SITE.projectsCompleted, l: "Projects Done" },
              { n: SITE.satisfactionRate, l: "Client Satisfaction" },
              { n: SITE.clientsServed, l: "Happy Clients" },
              { n: SITE.yearsActive, l: "Years Experience" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-[28px] font-bold text-white sm:text-[36px]">{s.n}</div>
                <div className="mt-1 text-[12px] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
