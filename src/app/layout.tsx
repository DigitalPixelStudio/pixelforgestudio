import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Pixel Forge — Website Development Studio, Bangalore",
    template: "%s | Pixel Forge",
  },
  description: "Full-stack website development studio in Bangalore. Custom websites, e-commerce, PWAs, AI chatbots, SEO — built to convert. From ₹2,999.",
  keywords: ["website development Bangalore", "web design Bangalore", "e-commerce website", "PWA development", "AI chatbot", "SEO services", "Next.js developer", "Pixel Forge", "affordable website", "website agency India"],
  authors: [{ name: "Pixel Forge" }],
  openGraph: {
    title: "Pixel Forge — We Forge Digital Excellence",
    description: "Full-stack website development studio in Bangalore. Custom websites, e-commerce, PWAs, AI chatbots — built to convert.",
    url: "https://pixel-forge.vercel.app",
    siteName: "Pixel Forge",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pixel Forge — Website Development Studio", description: "Custom websites, e-commerce, PWAs, AI chatbots — built to convert." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
