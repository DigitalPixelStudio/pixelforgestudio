import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

const LINKS = {
  Services: ["Business Websites", "E-Commerce", "PWA Web Apps", "Landing Pages", "AI Chatbots", "SEO & Performance"],
  Company: ["About Us", "Work", "Pricing", "Reviews", "FAQ", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--bg)] py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2 text-[18px] font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]">
                <LineIcon name="code" size={18} color="#fff" />
              </span>
              Pixel Forge
            </a>
            <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-white/40">
              Full-stack website development studio in Bangalore. We build websites that look stunning and convert visitors into customers.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: "github" as const, href: SITE.github },
                { icon: "instagram" as const, href: "https://instagram.com/pixelforge" },
                { icon: "linkedin" as const, href: "https://linkedin.com/company/pixelforge" },
                { icon: "youtube" as const, href: "https://youtube.com/@pixelforge" },
                { icon: "twitter" as const, href: "https://twitter.com/pixelforge" },
              ].map((s) => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-[var(--accent)]/20 hover:text-[var(--accent)]">
                  <LineIcon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {(["Services", "Company"] as const).map((cat) => (
            <div key={cat}>
              <h4 className="text-[13px] font-bold text-white">{cat}</h4>
              <ul className="mt-4 space-y-2.5">
                {LINKS[cat].map((l) => (
                  <li key={l}>
                    <a href={`#${cat.toLowerCase()}`} className="text-[12.5px] text-white/40 transition-colors hover:text-white/70">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[13px] font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li className="text-[12.5px] text-white/40">{SITE.address}</li>
              <li><a href={SITE.phoneHref} className="text-[12.5px] text-white/40 hover:text-white/70 transition-colors">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="text-[12.5px] text-white/40 hover:text-white/70 transition-colors">{SITE.email}</a></li>
              <li className="text-[12.5px] text-white/40">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <div className="text-[12px] text-white/30">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="text-[12px] text-white/30">Built with <span className="text-[var(--accent)]">♥</span> by Pixel Forge</div>
        </div>
      </div>
    </footer>
  );
}
