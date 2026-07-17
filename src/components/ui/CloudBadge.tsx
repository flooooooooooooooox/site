"use client";

/**
 * Badge en forme de nuage (silhouette pleine, coherent avec le logo Cirrion)
 * utilise comme fond pour les icones de modules, a la place des carres arrondis.
 */
export function CloudBadge({
  size = 46,
  fill = "rgba(36,85,214,0.1)",
  border,
  children,
  style,
}: {
  size?: number;
  fill?: string;
  border?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, ...style }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
        <g fill={fill} stroke={border} strokeWidth={border ? 2 : 0}>
          <rect x="14" y="46" width="72" height="38" rx="19" />
          <circle cx="34" cy="46" r="22" />
          <circle cx="58" cy="36" r="26" />
          <circle cx="78" cy="50" r="17" />
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}
