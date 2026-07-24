"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  // Desactive sur ecrans tactiles : pas de curseur, pas de boucle d'animation.
  const [enabled] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    if (!enabled) return;
    let mx = 0, my = 0, rx = 0, ry = 0, gx = 0, gy = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = mx + "px"; dot.current.style.top = my + "px"; }
    };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      if (glow.current) { glow.current.style.left = gx + "px"; glow.current.style.top = gy + "px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const addHover = () => document.body.classList.add("cursor-hover");
    const rmHover = () => document.body.classList.remove("cursor-hover");
    document.querySelectorAll("a,button,input").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", rmHover);
    });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
