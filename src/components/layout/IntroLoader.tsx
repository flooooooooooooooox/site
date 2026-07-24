"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEEN_KEY = "cirrion-intro-seen";

// Traces extraits du vrai logo (squelette du PNG public/logo-cirrion.png, viewBox 421x287).
// 5 segments — dessines dans l'ordre d'ecriture naturel, avec les interruptions du logo.
const PATHS: { d: string; dur: number; delay: number }[] = [
  { // Petite boucle gauche
    d: "M163,129 C162,129 157,130 154,129 C151,128 148,125 145,123 C142,121 139,118 136,117 C133,116 130,115 127,114 C124,113 121,112 118,111 C115,110 112,110 109,110 C106,110 103,110 100,110 C97,110 94,110 91,111 C88,112 85,112 82,113 C79,114 76,115 73,116 C70,117 67,119 64,121 C61,123 58,124 55,127 C52,130 50,133 47,136 C44,139 42,142 40,145 C38,148 37,151 36,154 C35,157 35,160 33,163 C31,166 26,169 24,170",
    dur: 0.155, delay: 0.0,
  },
  { // Grande arche du haut
    d: "M133,78 C133,76 132,72 133,69 C134,66 138,63 141,60 C144,57 147,54 150,52 C153,50 156,47 159,45 C162,43 165,41 168,40 C171,39 174,38 177,37 C180,36 183,35 186,34 C189,33 192,32 195,32 C198,32 201,31 204,31 C207,31 210,31 213,31 C216,31 219,31 222,31 C225,31 228,32 231,33 C234,34 237,35 240,36 C243,37 246,38 249,39 C252,40 255,42 258,44 C261,46 264,48 267,50 C270,52 273,54 276,57 C279,60 282,63 284,66 C286,69 289,72 291,75 C293,78 294,81 296,84 C298,87 299,90 300,93 C301,96 303,99 304,102 C305,105 306,108 306,111 C306,114 307,117 307,120 C307,123 308,126 308,129 C308,132 308,135 308,138 C308,141 308,144 307,147 C306,150 306,153 305,156 C304,159 304,162 303,165 C302,168 300,171 299,174 C298,177 294,180 294,183 C294,186 296,190 296,192 C296,194 297,196 297,197",
    dur: 0.295, delay: 0.155,
  },
  { // Courbe en S au centre (l'infini)
    d: "M275,117 C274,118 273,124 271,126 C269,128 265,129 262,131 C259,133 256,135 253,137 C250,139 247,140 244,143 C241,146 238,149 235,152 C232,155 229,158 227,161 C225,164 223,167 221,170 C219,173 217,176 215,179 C213,182 212,185 210,188 C208,191 206,194 204,197 C202,200 200,203 198,206 C196,209 194,212 191,215 C188,218 186,221 183,224 C180,227 177,230 174,232 C171,234 168,236 165,238 C162,240 159,242 156,243 C153,244 150,246 147,247 C144,248 141,250 138,251 C135,252 132,252 129,253 C126,254 123,255 120,255 C117,255 114,255 111,255 C108,255 105,256 102,256 C99,256 96,256 93,255 C90,254 87,254 84,253 C81,252 78,251 75,250 C72,249 69,248 66,246 C63,244 60,242 57,240 C54,238 51,234 48,231 C45,228 43,225 41,222 C39,219 37,216 36,213 C35,210 35,207 33,204 C31,201 27,198 26,197",
    dur: 0.29, delay: 0.45,
  },
  { // Ligne du bas
    d: "M178,266 C180,266 184,265 187,264 C190,263 193,263 196,262 C199,261 202,260 205,259 C208,258 211,256 214,256 C217,256 220,256 223,256 C226,256 229,256 232,256 C235,256 238,256 241,256 C244,256 247,256 250,256 C253,256 256,256 259,256 C262,256 265,256 268,256 C271,256 274,256 277,256 C280,256 283,256 286,256 C289,256 292,256 295,256 C298,256 301,256 304,256 C307,256 310,256 313,256 C316,256 319,256 322,256 C325,256 328,256 331,255 C334,254 337,254 340,253 C343,252 346,252 349,251 C352,250 355,248 358,246 C361,244 364,242 367,239 C370,236 374,234 376,231 C378,228 380,225 382,222 C384,219 385,216 386,213 C387,210 388,206 390,204 C392,202 395,202 396,201",
    dur: 0.235, delay: 0.74,
  },
  { // Petit arc droit
    d: "M338,110 C339,112 342,117 345,119 C348,121 350,122 353,124 C356,126 359,127 362,129 C365,131 368,133 371,136 C374,139 377,142 379,145 C381,148 382,151 384,154 C386,157 386,160 388,163 C390,166 392,169 394,171 C396,173 397,173 398,173",
    dur: 0.08, delay: 0.975,
  },
];

/**
 * Intro d'arrivee : le logo nuage se dessine trait par trait
 * (tracé fidele au logo), puis l'ecran fond vers le site.
 * Ne se joue qu'une fois par session de navigation.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(() =>
    typeof window === "undefined" ? true : !sessionStorage.getItem(SEEN_KEY)
  );

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setShow(false);
    }, 1500);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          aria-hidden
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#EFF4FF",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "1.5rem", pointerEvents: "none",
          }}
        >
          {/* Halo qui s'eveille derriere le logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute", width: "min(70vw, 480px)", height: "min(70vw, 480px)",
              borderRadius: "50%", background: "radial-gradient(circle, rgba(36,85,214,0.14) 0%, transparent 65%)",
              filter: "blur(10px)",
            }}
          />
          <motion.svg
            width="min(52vw, 280px)" viewBox="0 0 421 287" fill="none"
            initial={{ scale: 0.94, y: 6 }}
            animate={{ scale: [0.94, 1, 1.035, 1], y: [6, 0, 0, 0] }}
            transition={{ duration: 1.4, times: [0, 0.72, 0.88, 1], ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            {PATHS.map((p, i) => (
              <motion.path
                key={i}
                d={p.d}
                stroke="#2455D6"
                strokeWidth="23"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: p.dur, delay: p.delay, ease: "linear" },
                  opacity: { duration: 0.01, delay: p.delay },
                }}
              />
            ))}
          </motion.svg>
          <span style={{ display: "inline-flex", overflow: "hidden" }}>
            {"Cirrion".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito)", fontWeight: 800,
                  fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)", letterSpacing: "-0.02em",
                  color: "#1B2A4A",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
