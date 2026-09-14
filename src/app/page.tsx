"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import QuoteWizard from "@/components/QuoteWizard";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import ConciergeLaunch from "@/components/ConciergeLaunch";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import DynamicIsland from "@/components/DynamicIsland";
import ScrollProgress from "@/components/ScrollProgress";
import Concierge from "@/components/Concierge";

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <DynamicIsland />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Process />
        <Portfolio />
        <Pricing />
        <QuoteWizard />
        <Testimonials />
        <Faq />
        <ConciergeLaunch />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <Concierge />
    </div>
  );
}
