import { ImageResponse } from "next/og";

export const alt = "Floxia — ERP IA pour artisans et PME du bâtiment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05080D 0%, #0F1923 55%, #1a0e00 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              marginRight: 18,
              background: "#2455D6",
              clipPath: "polygon(65% 0%,35% 45%,60% 45%,35% 100%,65% 55%,40% 55%)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Floxia</span>
            <span
              style={{
                marginLeft: 12,
                fontSize: 24,
                background: "#2455D6",
                color: "#FFFFFF",
                padding: "2px 10px",
                borderRadius: 8,
                fontWeight: 900,
              }}
            >
              OS
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 68,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          <span style={{ marginRight: 18 }}>Devis &amp; factures depuis</span>
          <span style={{ color: "#2455D6", marginRight: 18 }}>WhatsApp</span>
          <span>en 3 minutes</span>
        </div>

        <div style={{ display: "flex", fontSize: 32, color: "rgba(232,237,244,0.7)", marginTop: 28, maxWidth: 900 }}>
          L&apos;ERP IA pour artisans et PME du bâtiment · Hébergé en France
        </div>
      </div>
    ),
    { ...size }
  );
}
