import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-apple relative hex-bg">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Get in touch</p>
          <h2 className="section-title font-apple mt-3 text-white">Let&apos;s build <span className="gradient-text-glow">something great.</span></h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[24px] neon-border h-[400px]">
              <iframe src={SITE.mapsEmbed} width="100%" height="100%" style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(0.75) saturate(0.5)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Pixel Studio Location" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-5">
              {[
                { icon: "map-pin" as const, label: "Address", value: SITE.address },
                { icon: "phone" as const, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                { icon: "mail" as const, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: "clock" as const, label: "Hours", value: SITE.hours },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-[20px] bg-[var(--bg-card)] p-5 neon-border transition-all duration-300 hover:-translate-y-0.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--accent)]/10">
                    <LineIcon name={c.icon} size={18} className="text-[var(--accent)]" />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-1 text-[14px] font-semibold text-white hover:text-[var(--accent)] transition-colors">{c.value}</a>
                    ) : (
                      <div className="mt-1 text-[14px] font-semibold text-white">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!%20I%27d%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener noreferrer" className="cta-primary w-full text-center">
                💬 Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
