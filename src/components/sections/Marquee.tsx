export default function Marquee() {
  const row1 = ["WhatsApp", "Devis PDF", "Factures", "Signature électronique", "ERP IA", "Bâtiment", "Artisans", "PME"];
  const row2 = ["100% Français", "RGPD", "IA Souveraine", "Zéro formation", "24h/24", "3 minutes", "ROI x3", "Relances auto"];

  const renderItems = (items: string[]) =>
    [...items, ...items].map((item, i) => (
      <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.2rem", whiteSpace: "nowrap" }}>
        <span style={{ color: "#2455D6", opacity: 0.45, fontSize: "clamp(.85rem,1.4vw,1rem)", fontWeight: 600, letterSpacing: ".04em" }}>
          {item}
        </span>
        <span style={{ color: "#2455D6", opacity: 0.2, fontSize: ".7rem" }}>◆</span>
      </span>
    ));

  return (
    <div style={{ background: "transparent", padding: "2.5rem 0", overflow: "hidden", userSelect: "none" }}>
      {/* Row 1 — scrolls left */}
      <div style={{ display: "flex", gap: "1.2rem", marginBottom: "1.4rem", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "1.2rem", animation: "marqueeLeft 24s linear infinite", willChange: "transform" }}>
          {renderItems(row1)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ display: "flex", gap: "1.2rem", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "1.2rem", animation: "marqueeRight 28s linear infinite", willChange: "transform" }}>
          {renderItems(row2)}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
