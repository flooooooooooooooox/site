"use client";
import { Cloud } from "lucide-react";

/**
 * Decoration nuage (style monoline, coherent avec le logo Cirrion) —
 * a utiliser en alternance avec les blobs "glass" pour varier les fonds de section.
 */
export function CloudDecor({
  size = 120,
  color = "#2455D6",
  opacity = 0.12,
  strokeWidth = 1.2,
  style,
  float = true,
  className,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  float?: boolean;
  className?: string;
}) {
  return (
    <Cloud
      aria-hidden
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={[float ? "cloud-decor-float" : "", className].filter(Boolean).join(" ")}
      style={{ opacity, position: "absolute", pointerEvents: "none", ...style }}
    />
  );
}

export const CLOUD_DECOR_STYLES = `
  @keyframes cloudDecorFloat {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-14px) translateX(6px); }
  }
  .cloud-decor-float { animation: cloudDecorFloat 10s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .cloud-decor-float { animation: none !important; }
  }
`;
