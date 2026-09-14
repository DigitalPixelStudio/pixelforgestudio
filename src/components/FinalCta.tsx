import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section className="section-apple relative overflow-hidden">
      <div className="orb absolute top-[10%] left-[15%] h-[300px] w-[300px] bg-[var(--accent)] opacity-20" />
      <div className="orb-reverse absolute bottom-[10%] right-[15%] h-[250px] w-[250px] bg-[var(--accent2)] opacity-15" />
      <div className="mx-auto max-w-[700px] px-6 text-center">
        <Reveal>
          <h2 className="section-title font-apple text-white">
            Ready to build your <span className="gradient-text-glow animate-breathe">dream website?</span>
          </h2>
          <p className="section-subtitle mx-auto mt-5">
            Get a free consultation and custom quote within 24 hours. No pressure, no hidden fees — just honest advice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/919620024812?text=Hi%20Pixel%20Forge!%20I%27d%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" className="cta-primary text-[15px] !px-8 !py-4">
              🚀 Get Free Quote
            </a>
            <a href="tel:+919620024812" className="cta-outline text-[15px] !px-8 !py-4">
              Call +91 96200 24812
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
