import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

export default function StickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[var(--border)] bg-[var(--bg)]/90 py-3 backdrop-blur-xl lg:hidden">
      <a href={SITE.phoneHref} className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-white/55 transition-colors hover:text-white">
        <LineIcon name="phone" size={20} className="text-[var(--accent)]" />
        Call
      </a>
      <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!%20I%27m%20interested%20in%20a%20website.`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-white/55 transition-colors hover:text-white">
        <LineIcon name="whatsapp" size={20} className="text-[var(--accent2)]" />
        WhatsApp
      </a>
      <a href="#quote" className="cta-primary !px-7 !py-2.5 !text-[13px]">Get Quote</a>
    </div>
  );
}
