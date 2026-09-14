import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixel Studio — Website Development Agency",
    short_name: "Pixel Studio",
    description: "We Build Websites That Make You Famous.",
    start_url: "/",
    display: "standalone",
    background_color: "#030311",
    theme_color: "#6d5cff",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
