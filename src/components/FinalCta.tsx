import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="section-apple relative overflow-hidden">
      <div className="orb absolute top-[10%] left-[12%] h-[350px] w-[350px] bg-[var(--accent)] opacity-20" />
      <div className="orb-reverse absolute bottom-[10%] right-[12%] h-[300px] w-[300px] bg-[var(--accent2)] opacity-15" />
      <div className="mx-auto max-w-[750px] px-6 text-center">
        <Reveal>
          <h2 className="section-title font-apple text-white">
            Ready to build your <span className="gradient-text-glow animate-breathe">dream website?</span>
          </h2>
          <p className="section-subtitle mx-auto mt-6">
            Get a free consultation and custom quote within 24 hours. No pressure, no hidden fees.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!%20I%27d%20like%20a%20free%20consultation.`} target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] !px-10 !py-4">
              🚀 Get Free Quote
            </a>
            <a href={SITE.phoneHref} className="cta-outline text-[15px] !px-10 !py-4">
              📞 Call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
