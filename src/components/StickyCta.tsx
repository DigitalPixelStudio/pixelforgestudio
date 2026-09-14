import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

export default function StickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/10 bg-[var(--bg)]/90 py-3 backdrop-blur-xl md:hidden">
      <a href={`tel:${SITE.phoneHref}`} onClick={(e) => { e.preventDefault(); window.location.href = SITE.phoneHref; }} className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-white/60">
        <LineIcon name="phone" size={18} className="text-[var(--accent)]" />
        Call
      </a>
      <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Forge!%20I%27m%20interested%20in%20a%20website.`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-white/60">
        <LineIcon name="whatsapp" size={18} className="text-[var(--accent2)]" />
        WhatsApp
      </a>
      <a href="#quote" className="cta-primary !px-7 !py-2 text-[13px]">Get Quote</a>
    </div>
  );
}
