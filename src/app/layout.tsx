import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pixel-studio.vercel.app"),
  title: { default: "Pixel Studio — Website Development Agency, Bangalore", template: "%s | Pixel Studio" },
  description: "Hyper-modern website development agency in Bangalore. Custom websites, e-commerce, PWAs, AI chatbots, SEO — from ₹1,999. 30% cheaper than market.",
  keywords: ["Pixel Studio", "website development Bangalore", "web design agency", "e-commerce website", "PWA", "AI chatbot", "SEO", "Next.js developer"],
  authors: [{ name: "Pixel Studio" }],
  openGraph: {
    title: "Pixel Studio — We Build Websites That Make You Famous",
    description: "Hyper-modern website development agency in Bangalore. 30% cheaper than market.",
    url: "https://pixel-studio.vercel.app",
    siteName: "Pixel Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pixel Studio — Website Development Agency", description: "We Build Websites That Make You Famous." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = { themeColor: "#030311", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} antialiased`}>{children}</body>
    </html>
  );
}
