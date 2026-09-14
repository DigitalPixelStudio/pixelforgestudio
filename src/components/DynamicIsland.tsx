"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { LineIcon, type IconName } from "./Icons";

const STATES = [
  { icon: "code" as IconName, text: "Custom website from ₹1,999", sub: "3-day delivery · 100% responsive" },
  { icon: "shopping-cart" as IconName, text: "E-Commerce stores from ₹7,999", sub: "Payments, admin, analytics included" },
  { icon: "bot" as IconName, text: "AI chatbots from ₹2,999", sub: "24/7 support · lead qualification" },
  { icon: "trending-up" as IconName, text: "SEO & Performance tuning", sub: "Core Web Vitals optimized" },
  { icon: "rocket" as IconName, text: "PWA web apps from ₹5,999", sub: "App-like experience on any device" },
];

export default function DynamicIsland() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATES.length), 3200);
    const show = setTimeout(() => setVisible(true), 600);
    return () => { clearInterval(t); clearTimeout(show); };
  }, []);

  const s = STATES[idx];

  return (
    <div className={`fixed left-1/2 top-[72px] z-40 -translate-x-1/2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
      <a href="#quote" onClick={() => track("quote_started", { source: "dynamic_island" })} className="dynamic-island hidden items-center gap-3 rounded-full px-5 py-2.5 text-white md:flex">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)]/15">
          <LineIcon name={s.icon} size={16} className="text-[var(--accent)]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[12.5px] font-bold">{s.text}</span>
          <span className="block text-[10.5px] text-white/50">{s.sub}</span>
        </span>
        <span className="relative ml-1 flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent2)] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent2)]" />
        </span>
      </a>
    </div>
  );
}
