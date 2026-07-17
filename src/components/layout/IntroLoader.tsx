"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEEN_KEY = "cirrion-intro-seen";

/**
 * Intro d'arrivee : le nuage du logo se dessine en un seul trait
 * (comme ecrit a la main), puis l'ecran fond vers le site.
 * Ne se joue qu'une fois par session de navigation.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setShow(false);
    }, 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          aria-hidden
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#EFF4FF",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "1.4rem", pointerEvents: "none",
          }}
        >
          <svg width="min(46vw, 260px)" viewBox="0 0 200 130" fill="none">
            <motion.path
              d="M140 106 L44 106 C24 106 12 90 18 74 C10 58 24 42 40 46 C46 26 70 18 82 32 C92 14 120 12 130 30 C150 22 168 40 162 58 C176 66 176 92 160 100 C154 104 148 106 140 106 C120 96 108 74 92 62 C80 53 62 56 58 68 C54 80 66 88 76 84"
              stroke="#2455D6"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-nunito)", fontWeight: 800,
              fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)", letterSpacing: "-0.02em",
              color: "#1B2A4A",
            }}
          >
            Cirrion
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
