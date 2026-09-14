import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import ScrollProgress from "@/components/ScrollProgress";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote — Pixel Forge",
  description: `Tell us about your project and get a custom quote within 24 hours. ${SITE.phone}`,
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <ScrollProgress />
      <Navbar />
      <div className="pt-24">
        <QuoteWizard />
      </div>
      <Footer />
    </main>
  );
}
