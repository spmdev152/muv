import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #33491A 0%, #49671D 100%)",
          padding: "80px",
          color: "#F7F4EC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            MUV
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              width: 80,
              height: 4,
              background: "#BF9B5F",
            }}
          />
          <div style={{ fontSize: 60, lineHeight: 1.1, maxWidth: 900 }}>
            Fisioterapia eficaz, eficiente y empática
          </div>
          <div style={{ fontSize: 30, color: "rgba(247,244,236,0.75)" }}>
            Clínica de fisioterapia · El Cañaveral · Tres Cantos · Madrid
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
