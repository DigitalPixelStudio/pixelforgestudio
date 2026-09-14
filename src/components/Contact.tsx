import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-apple relative">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-apple text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">Get in touch</p>
          <h2 className="section-title font-apple mt-3 text-white">Let&apos;s build <span className="gradient-text-glow">something great.</span></h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Map */}
          <Reveal>
            <div className="overflow-hidden rounded-[22px] neon-border">
              <iframe src={SITE.mapsEmbed} width="100%" height="400" style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.8)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Pixel Forge Location" />
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={100}>
            <div className="space-y-6">
              {[
                { icon: "map-pin" as const, label: "Address", value: SITE.address },
                { icon: "phone" as const, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                { icon: "mail" as const, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: "clock" as const, label: "Hours", value: SITE.hours },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-[16px] bg-[var(--bg-card)] p-5 neon-border">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10">
                    <LineIcon name={c.icon} size={18} className="text-[var(--accent)]" />
                  </span>
                  <div>
                    <div className="text-[12px] font-semibold text-white/50">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 text-[14px] font-medium text-white hover:text-[var(--accent)] transition-colors">{c.value}</a>
                    ) : (
                      <div className="mt-0.5 text-[14px] font-medium text-white">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <a href="https://wa.me/919620024812?text=Hi%20Pixel%20Forge!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="cta-primary w-full text-center">
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
