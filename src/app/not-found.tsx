import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="text-[100px] font-black text-white/[0.04]">404</div>
        <h1 className="mt-4 text-[28px] font-black text-white">Page not found</h1>
        <p className="mt-3 text-[14px] text-white/45">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="cta-primary mt-8">Back to Home</Link>
      </div>
      <Footer />
    </main>
  );
}
