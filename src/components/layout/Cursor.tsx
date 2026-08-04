"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  // Doit demarrer a false pour correspondre au rendu serveur : activer des
  // l'initialisation du state provoquerait une erreur d'hydratation sur desktop.
  // Desactive sur ecrans tactiles : pas de curseur custom du tout.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // La position est ecrite en `transform` (composite, pas de recalcul de layout)
    // et coalescee dans une seule frame : plusieurs mousemove par frame ne
    // declenchent qu'un seul write. Pas de boucle rAF permanente — on ne peint
    // que quand la souris bouge reellement.
    let x = 0, y = 0, queued = false;
    const paint = () => {
      queued = false;
      const el = dot.current;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };

    // Delegation : un seul couple d'ecouteurs pour tout le document. Fonctionne
    // aussi sur les elements montes plus tard (changements de page, accordeons...),
    // ce qu'une boucle querySelectorAll au montage ne faisait pas.
    const INTERACTIVE = "a,button,input,textarea,select,[role='button']";
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      document.body.classList.toggle("cursor-hover", !!t?.closest?.(INTERACTIVE));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-hover");
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dot} className="cursor-dot" aria-hidden />;
}
