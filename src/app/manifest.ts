import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixel Forge — Website Development Studio",
    short_name: "Pixel Forge",
    description: "Custom websites, e-commerce, PWAs, AI chatbots — built to convert.",
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#8b5cf6",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
