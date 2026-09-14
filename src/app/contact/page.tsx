"use client";
import { useState } from "react";
import { SITE } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import StickyCta from "@/components/StickyCta";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.trim().length < 10 || msg.trim().length < 5) return;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`📋 Contact Enquiry\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${msg}`)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <ScrollProgress />
      <Navbar />
      <section className="section-apple">
        <div className="mx-auto max-w-[600px] px-6">
          <h1 className="section-title font-apple text-white text-center">Get in <span className="gradient-text-glow">Touch</span></h1>
          <p className="section-subtitle mx-auto mt-4 text-center">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          <form onSubmit={submit} className="mt-10 space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-2xl border border-white/10 bg-[var(--bg-card)] px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full rounded-2xl border border-white/10 bg-[var(--bg-card)] px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell us about your project..." rows={5} className="w-full resize-none rounded-2xl border border-white/10 bg-[var(--bg-card)] px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-[var(--accent)]/50 transition-colors" />
            <button type="submit" className="cta-primary w-full">Send Message</button>
          </form>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
