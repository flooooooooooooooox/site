"use client";
import { useId } from "react";

/**
 * Badge en forme de nuage (silhouette pleine, coherent avec le logo Cirrion)
 * utilise comme fond pour les icones de modules, a la place des carres arrondis.
 *
 * La forme est une union via clipPath : le remplissage est parfaitement
 * uniforme meme translucide (aucune superposition visible entre les cercles).
 * La bordure est un fin halo (drop-shadow) autour de la silhouette.
 */
const SHAPES = (
  <>
    <rect x="14" y="46" width="72" height="38" rx="19" />
    <circle cx="34" cy="46" r="22" />
    <circle cx="58" cy="36" r="26" />
    <circle cx="78" cy="50" r="17" />
  </>
);

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
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `cb-${uid}`;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, ...style }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-hidden
        style={{
          position: "absolute", inset: 0, overflow: "visible",
          filter: border ? `drop-shadow(0 0 0.6px ${border}) drop-shadow(0 0 0.6px ${border})` : undefined,
        }}
      >
        <defs>
          <clipPath id={clipId}>{SHAPES}</clipPath>
        </defs>
        <rect x="-10" y="-10" width="120" height="120" fill={fill} clipPath={`url(#${clipId})`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}
