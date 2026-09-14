import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export default function OGImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#030311,#0d0d35)", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 80, fontWeight: 900 }}>Pixel Studio</div>
      <div style={{ fontSize: 28, color: "#00e5a0", marginTop: 12 }}>We Build Websites That Make You Famous</div>
    </div>,
    { ...size }
  );
}
