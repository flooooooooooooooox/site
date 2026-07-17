"use client";

/**
 * Nuage volumétrique "3D" qui supporte une carte — silhouette pleine avec
 * dégradé et ombre portée, dépassant sous la carte comme un coussin de nuage.
 * Le parent doit être en position: relative.
 */
export function CloudSupport({
  width = 320,
  bottom = -38,
  delay = 0,
}: {
  width?: number;
  bottom?: number;
  delay?: number;
}) {
  const id = `cs-${Math.round(width)}-${Math.round(bottom)}-${Math.round(delay * 10)}`;
  return (
    <div
      aria-hidden
      className="cloud-support-float"
      style={{
        position: "absolute",
        bottom,
        left: "50%",
        transform: "translateX(-50%)",
        width,
        maxWidth: "94%",
        zIndex: 0,
        pointerEvents: "none",
        animationDelay: `${delay}s`,
        filter: "drop-shadow(0 18px 22px rgba(27,42,74,0.16))",
      }}
    >
      <svg viewBox="0 0 320 110" width="100%" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#EDF2FC" />
            <stop offset="100%" stopColor="#D8E2F5" />
          </linearGradient>
        </defs>
        <g fill={`url(#${id})`}>
          <ellipse cx="70" cy="72" rx="58" ry="34" />
          <ellipse cx="150" cy="58" rx="72" ry="44" />
          <ellipse cx="240" cy="70" rx="62" ry="36" />
          <rect x="30" y="62" width="262" height="44" rx="22" />
        </g>
        {/* reflet haut pour le volume */}
        <ellipse cx="150" cy="42" rx="52" ry="20" fill="rgba(255,255,255,0.85)" />
      </svg>
    </div>
  );
}

export const CLOUD_SUPPORT_STYLES = `
  @keyframes cloudSupportFloat {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-8px); }
  }
  .cloud-support-float { animation: cloudSupportFloat 7s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .cloud-support-float { animation: none !important; }
  }
`;
