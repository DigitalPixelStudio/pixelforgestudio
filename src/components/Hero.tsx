"use client";

/**
 * Hero — brutalist starting screen on true AMOLED black.
 *
 * Structure borrowed from the reference the client pointed at:
 *   · one enormous uppercase wordmark
 *   · a thin red rule under it
 *   · a metadata row ("Based in India. Available Worldwide.")
 *   · a marquee strip that runs edge to edge and never stops
 *   · a numbered services ledger underneath
 *
 * Everything animates on transform/opacity only. The marquee is a CSS
 * keyframe on translate3d, so it holds 120fps without a JS ticker.
 */

import { SITE } from "@/lib/site";

const MARQUEE = [
  "Websites",
  "CRMs",
  "Apps",
  "Digital Marketing",
  "PWAs",
  "AI Assistants",
  "SEO",
  "Brand Systems",
];

const SERVICES = [
  {
    num: "01",
    title: "Websites",
    tags: "Design · Build · Deploy · Maintain",
  },
  {
    num: "02",
    title: "CRMs",
    tags: "Lead capture · Pipeline · WhatsApp · Reports",
  },
  {
    num: "03",
    title: "Apps",
    tags: "PWA · Dashboards · Client portals",
  },
  {
    num: "04",
    title: "Digital Marketing",
    tags: "SEO · Google Ads · Meta Ads · Content",
  },
];

export default function Hero() {
  return (
    <section className="brut-hero brut-grain">
      {/* a single faint red wash — the only colour on the black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 8%, rgba(255,34,51,0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-32 pb-10 lg:px-10">
        {/* meta row */}
        <div className="brut-meta flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>Based in India</span>
          <span className="dot">•</span>
          <span>Available Worldwide</span>
          <span className="dot">•</span>
          <span>Est. 2024</span>
        </div>

        {/* the wordmark */}
        <h1 className="brut-word mt-6">
          Pixel Forge
          <br />
          <span className="text-[var(--accent)]">Studio</span>
        </h1>

        <div className="brut-rule mt-8 w-full" />

        {/* statement + actions */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[560px] text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-[16.5px]">
            We build websites, CRMs and apps for businesses that need to look
            serious online. Fixed price, fixed date, no retainers. Modern
            websites, forged in 7 days.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Forge%20Studio%2C%20I%27d%20like%20to%20start%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn"
            >
              Start a project
              <span aria-hidden="true">↗</span>
            </a>
            <a href="#work" className="brut-btn brut-btn--ghost">
              See the work
            </a>
          </div>
        </div>
      </div>

      {/* marquee — runs full bleed under the hero */}
      <div className="brut-marquee relative z-10">
        <div className="brut-marquee__track">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex">
              {MARQUEE.map((m) => (
                <span key={`${dup}-${m}`} className="brut-marquee__item">
                  {m}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* numbered ledger */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 py-14 lg:px-10">
        <div className="brut-meta mb-2">What we do</div>
        {SERVICES.map((s) => (
          <div key={s.num} className="brut-row">
            <div className="brut-row__num">{s.num}</div>
            <div>
              <div className="brut-row__title">{s.title}</div>
              <div className="brut-row__tags">{s.tags}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
