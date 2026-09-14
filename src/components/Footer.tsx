import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] shadow-lg shadow-[var(--accent)]/20">
                <LineIcon name="code" size={18} color="#fff" />
              </span>
              <span className="text-[22px] font-black text-white">{SITE.name}</span>
            </a>
            <p className="mt-4 max-w-[280px] text-[12.5px] leading-relaxed text-white/35">
              Hyper-modern website development agency in Bangalore. We build websites that look stunning and convert visitors into customers.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: "github" as const, href: SITE.github },
                { icon: "instagram" as const, href: "https://instagram.com/pixelstudio" },
                { icon: "linkedin" as const, href: "https://linkedin.com/company/pixelstudio" },
                { icon: "youtube" as const, href: "https://youtube.com/@pixelstudio" },
                { icon: "twitter" as const, href: "https://twitter.com/pixelstudio" },
              ].map((s) => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] text-white/35 transition-all duration-300 hover:bg-[var(--accent)]/15 hover:text-[var(--accent)] hover:scale-110">
                  <LineIcon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Services", items: ["Business Websites", "E-Commerce", "PWA Web Apps", "Landing Pages", "AI Chatbots", "SEO & Performance"] },
            { title: "Company", items: ["About Us", "Work", "Pricing", "Reviews", "FAQ", "Contact"] },
          ].map((cat) => (
            <div key={cat.title}>
              <h4 className="text-[14px] font-bold text-white">{cat.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {cat.items.map((l) => (
                  <li key={l}>
                    <a href={`#${cat.title.toLowerCase()}`} className="text-[12.5px] text-white/35 transition-all duration-300 hover:text-white/70 hover:pl-1">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[14px] font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li className="text-[12.5px] text-white/35">{SITE.address}</li>
              <li><a href={SITE.phoneHref} className="text-[12.5px] text-white/35 hover:text-white/70 transition-colors">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="text-[12.5px] text-white/35 hover:text-white/70 transition-colors">{SITE.email}</a></li>
              <li className="text-[12.5px] text-white/35">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 md:flex-row">
          <div className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="text-[12px] text-white/25">Crafted with <span className="text-[var(--accent)]">♥</span> by Pixel Studio</div>
        </div>
      </div>
    </footer>
  );
}
