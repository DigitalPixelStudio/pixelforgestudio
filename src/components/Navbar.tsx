"use client";
import { useState, useEffect } from "react";
import { SITE } from "@/lib/site";
import { LineIcon } from "./Icons";

const LINKS = ["Services", "Work", "Pricing", "Testimonials", "FAQ", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5 bg-transparent"}`}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] shadow-lg shadow-[var(--accent)]/20">
            <LineIcon name="code" size={20} color="#fff" />
          </span>
          <span className="text-[22px] font-black tracking-tight text-white animate-breathe">{SITE.name}</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-semibold text-white/50 transition-all duration-300 hover:text-white hover:scale-105">{l}</a>
          ))}
          <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!%20I%27d%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener noreferrer" className="cta-primary !py-2.5 !px-6 !text-[13px]">
            Get Quote
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-xl text-white lg:hidden" aria-label="Toggle menu">
          <LineIcon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="glass mx-4 mt-3 rounded-2xl p-5 lg:hidden">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-3 text-[15px] font-medium text-white/70 transition-colors hover:text-white">{l}</a>
          ))}
          <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Pixel%20Studio!`} target="_blank" rel="noopener noreferrer" className="cta-primary mt-3 w-full text-center !text-[13px]">
            Get Quote
          </a>
        </div>
      )}
    </nav>
  );
}
