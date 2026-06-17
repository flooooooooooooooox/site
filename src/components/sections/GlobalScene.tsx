"use client";
import { useEffect, useRef } from "react";

export default function GlobalScene() {
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgs = [img1Ref.current, img2Ref.current, img3Ref.current];
    if (imgs.some(i => !i)) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollY / total, 1);

      // 0–0.4: img1→img2, 0.4–0.7: img2→img3, 0.7–1: img3
      let op1 = 1, op2 = 0, op3 = 0;
      if (progress < 0.4) {
        const t = progress / 0.4;
        op1 = 1 - t; op2 = t; op3 = 0;
      } else if (progress < 0.7) {
        const t = (progress - 0.4) / 0.3;
        op1 = 0; op2 = 1 - t; op3 = t;
      } else {
        op1 = 0; op2 = 0; op3 = 1;
      }

      imgs[0]!.style.opacity = String(op1);
      imgs[1]!.style.opacity = String(op2);
      imgs[2]!.style.opacity = String(op3);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgStyle: React.CSSProperties = {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center",
    transition: "opacity 0.8s ease",
  };

  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <img ref={img1Ref} src="/chantier1.png" alt="" style={{ ...imgStyle, opacity: 1 }} />
      <img ref={img2Ref} src="/chantier2.png" alt="" style={{ ...imgStyle, opacity: 0 }} />
      <img ref={img3Ref} src="/chantier3.png" alt="" style={{ ...imgStyle, opacity: 0 }} />
      {/* dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,16,0.6)", zIndex: 1 }} />
    </div>
  );
}
