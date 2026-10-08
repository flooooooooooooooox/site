/**
 * Les six vues de la chaine Cirrion, dessinees en SVG.
 *
 * Elles sont dessinees plutot que captees : une capture d'ecran vieillit a
 * chaque refonte de l'ERP, pese plusieurs centaines de kilo-octets et devient
 * illisible une fois reduite. Ces vues ne montrent qu'une idee chacune, pesent
 * quelques kilo-octets et restent nettes a toutes les tailles.
 *
 * Elles sont statiques : seul le fondu entre deux vues est anime, par opacity
 * sur le conteneur. Rien ne tourne en continu.
 */

const BLUE = "#2455D6";
const INK = "#1B2A4A";
const GREEN = "#36C27A";

const sheet = (x: number, y: number, w: number, h: number, r = 14) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill="#FFFFFF" stroke="rgba(27,42,74,0.1)" />
);

const line = (x: number, y: number, w: number, o = 0.18, h = 7) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={INK} opacity={o} />
);

/** 1 — Le vocal WhatsApp devient un devis. */
export function FrameVocal() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Un message vocal se transforme en devis">
      {/* bulle vocale */}
      <rect x="54" y="74" width="292" height="78" rx="20" fill={BLUE} />
      <circle cx="92" cy="113" r="18" fill="#FFFFFF" opacity="0.95" />
      <path d="M87 105 L103 113 L87 121 Z" fill={BLUE} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const hgt = [14, 26, 38, 22, 44, 30, 18, 36, 24, 40, 20, 12][i];
        return (
          <rect key={i} x={126 + i * 16} y={113 - hgt / 2} width="6" height={hgt} rx="3" fill="#FFFFFF" opacity={0.85} />
        );
      })}
      <text x="322" y="142" textAnchor="end" fontSize="11" fill="#FFFFFF" opacity="0.7" fontFamily="system-ui">0:14</text>

      {/* la fleche de transformation */}
      <path d="M200 166 L200 198" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M192 190 L200 200 L208 190" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />

      {/* le devis qui en sort */}
      {sheet(54, 212, 292, 134)}
      <rect x="54" y="212" width="292" height="34" rx="14" fill={BLUE} opacity="0.1" />
      <rect x="54" y="232" width="292" height="14" fill={BLUE} opacity="0.1" />
      <text x="74" y="235" fontSize="13" fontWeight="700" fill={BLUE} fontFamily="system-ui">DEVIS N° 2026-104</text>
      {line(74, 264, 150)}
      {line(282, 264, 44, 0.3)}
      {line(74, 286, 182)}
      {line(282, 286, 44, 0.3)}
      {line(74, 308, 124)}
      {line(282, 308, 44, 0.3)}
      <rect x="236" y="326" width="90" height="4" rx="2" fill={BLUE} opacity="0.25" />
      <text x="74" y="338" fontSize="11" fill={INK} opacity="0.45" fontFamily="system-ui">TVA 10 %</text>
    </svg>
  );
}

/** 2 — Le client signe sur son telephone. */
export function FrameSignature() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Le client signe le devis sur son téléphone">
      {/* telephone */}
      <rect x="112" y="40" width="176" height="320" rx="28" fill="#FFFFFF" stroke="rgba(27,42,74,0.14)" strokeWidth="1.5" />
      <rect x="168" y="54" width="64" height="7" rx="3.5" fill={INK} opacity="0.12" />

      {/* document a signer */}
      <rect x="134" y="80" width="132" height="166" rx="10" fill="#F6F9FF" stroke="rgba(36,85,214,0.14)" />
      <text x="148" y="104" fontSize="10" fontWeight="700" fill={BLUE} fontFamily="system-ui">DEVIS 2026-104</text>
      {line(148, 118, 90, 0.14, 5)}
      {line(148, 132, 104, 0.14, 5)}
      {line(148, 146, 72, 0.14, 5)}
      {line(148, 160, 96, 0.14, 5)}
      <text x="148" y="190" fontSize="9" fill={INK} opacity="0.4" fontFamily="system-ui">Bon pour accord</text>

      {/* la signature manuscrite */}
      <path
        d="M152 218 C166 198, 176 234, 188 212 C198 194, 206 230, 218 210 C228 194, 238 224, 252 206"
        fill="none" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round"
      />

      {/* cachet horodate */}
      <g transform="translate(200 288)">
        <circle r="42" fill={GREEN} opacity="0.1" />
        <circle r="42" fill="none" stroke={GREEN} strokeWidth="1.5" opacity="0.5" />
        <path d="M-15 2 L-5 13 L16 -10" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text y="32" textAnchor="middle" fontSize="9" fontWeight="700" fill={GREEN} fontFamily="system-ui">SIGNÉ</text>
      </g>
      <text x="200" y="348" textAnchor="middle" fontSize="10" fill={INK} opacity="0.4" fontFamily="system-ui">
        Horodaté et archivé
      </text>
    </svg>
  );
}

/** 3 — Le planning se remplit et les salaries sont affectes. */
export function FramePlanning() {
  const filled = new Set(["0-1", "0-2", "1-2", "1-3", "2-0", "2-1", "2-4"]);
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Le planning se remplit et les salariés sont affectés">
      {sheet(40, 56, 320, 288, 18)}
      {/* en-tete jours */}
      {["L", "M", "M", "J", "V"].map((d, i) => (
        <text key={i} x={134 + i * 50} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} opacity="0.35" fontFamily="system-ui">{d}</text>
      ))}
      <line x1="64" y1="104" x2="336" y2="104" stroke={INK} strokeOpacity="0.08" />

      {/* trois salaries, trois lignes */}
      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(0 ${126 + row * 72})`}>
          <circle cx="82" cy="18" r="17" fill={BLUE} opacity={0.1 + row * 0.04} />
          <circle cx="82" cy="13" r="6" fill={BLUE} opacity="0.45" />
          <path d="M72 26 a10 10 0 0 1 20 0 Z" fill={BLUE} opacity="0.45" />
          {[0, 1, 2, 3, 4].map((col) => {
            const on = filled.has(`${row}-${col}`);
            return (
              <rect
                key={col}
                x={112 + col * 50} y="2" width="42" height="32" rx="8"
                fill={on ? BLUE : INK}
                opacity={on ? 0.85 - row * 0.12 : 0.05}
              />
            );
          })}
        </g>
      ))}

      {/* bandeau stock */}
      <rect x="64" y="300" width="272" height="30" rx="10" fill={GREEN} opacity="0.1" />
      <circle cx="84" cy="315" r="5" fill={GREEN} />
      <text x="100" y="319" fontSize="11" fontWeight="600" fill={INK} opacity="0.55" fontFamily="system-ui">
        Stock décompté automatiquement
      </text>
    </svg>
  );
}

/** 4 — Les factures s'enchainent et les impayes se relancent. */
export function FrameFactures() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Acompte, PV de réception et facture finale s'enchaînent">
      {/* pile : trois feuilles decalees */}
      <g opacity="0.45">{sheet(78, 62, 250, 150)}</g>
      <g opacity="0.7">{sheet(66, 80, 262, 162)}</g>
      {sheet(54, 100, 274, 176, 16)}

      <rect x="54" y="100" width="274" height="36" rx="16" fill={BLUE} opacity="0.1" />
      <rect x="54" y="120" width="274" height="16" fill={BLUE} opacity="0.1" />
      <text x="74" y="124" fontSize="12" fontWeight="700" fill={BLUE} fontFamily="system-ui">FACTURE FINALE</text>
      <rect x="236" y="108" width="74" height="20" rx="10" fill={GREEN} opacity="0.18" />
      <text x="273" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill={GREEN} fontFamily="system-ui">PAYÉE</text>

      {line(74, 156, 160)}
      {line(258, 156, 50, 0.3)}
      {line(74, 178, 126)}
      {line(258, 178, 50, 0.3)}
      {line(74, 200, 188)}
      {line(258, 200, 50, 0.3)}
      <rect x="200" y="222" width="108" height="5" rx="2.5" fill={BLUE} opacity="0.3" />
      <text x="74" y="250" fontSize="11" fill={INK} opacity="0.42" fontFamily="system-ui">Facture électronique · 2026</text>

      {/* relance automatique */}
      <rect x="54" y="300" width="274" height="46" rx="14" fill={BLUE} opacity="0.07" />
      <circle cx="82" cy="323" r="12" fill={BLUE} opacity="0.18" />
      <path d="M76 323 h12 M84 318 l5 5 l-5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="104" y="320" fontSize="11" fontWeight="700" fill={INK} opacity="0.6" fontFamily="system-ui">Relance envoyée</text>
      <text x="104" y="335" fontSize="10" fill={INK} opacity="0.4" fontFamily="system-ui">J+7 · sans intervention</text>
    </svg>
  );
}

/** 5 — TVA, URSSAF et DSN se preparent toutes seules. */
export function FrameDeclarations() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="TVA, URSSAF et DSN préparées automatiquement">
      {sheet(48, 48, 304, 304, 18)}
      <text x="72" y="86" fontSize="13" fontWeight="700" fill={BLUE} fontFamily="system-ui">CA3 — SEPTEMBRE</text>
      <line x1="72" y1="100" x2="328" y2="100" stroke={INK} strokeOpacity="0.08" />

      {[
        ["TVA collectée", 0.85],
        ["TVA déductible", 0.6],
        ["TVA à décaisser", 1],
      ].map(([label, strength], i) => (
        <g key={i} transform={`translate(0 ${124 + i * 52})`}>
          <text x="72" y="14" fontSize="11" fill={INK} opacity="0.5" fontFamily="system-ui">{label as string}</text>
          <rect x="222" y="0" width="106" height="26" rx="8" fill={BLUE} opacity={0.08 + (strength as number) * 0.1} />
          <rect x="238" y="11" width={54 * (strength as number)} height="5" rx="2.5" fill={BLUE} opacity="0.55" />
        </g>
      ))}

      {/* les deux autres declarations, cochees */}
      {[
        ["Charges sociales", 288],
        ["Déclaration de paie", 318],
      ].map(([label, y], i) => (
        <g key={i}>
          <circle cx="82" cy={(y as number) - 4} r="9" fill={GREEN} opacity="0.15" />
          <path d={`M78 ${(y as number) - 4} l3 3.5 l6 -7`} fill="none" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="102" y={y as number} fontSize="11" fill={INK} opacity="0.5" fontFamily="system-ui">{label as string}</text>
        </g>
      ))}
    </svg>
  );
}

/** 6 — Tout est teletransmis, le bilan est signe. */
export function FrameDepot() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Déclarations télétransmises et bilan signé par le cabinet partenaire">
      {/* bilan en arriere-plan */}
      <g opacity="0.5">{sheet(96, 44, 220, 140)}</g>
      <text x="120" y="76" fontSize="11" fontWeight="700" fill={BLUE} opacity="0.55" fontFamily="system-ui">BILAN & LIASSE</text>
      {line(120, 92, 120, 0.12)}
      {line(120, 110, 150, 0.12)}
      {line(120, 128, 96, 0.12)}
      <text x="120" y="160" fontSize="10" fill={INK} opacity="0.35" fontFamily="system-ui">Signé par le cabinet partenaire</text>

      {/* cachet de teletransmission */}
      <g transform="translate(200 254)">
        <circle r="74" fill={BLUE} opacity="0.07" />
        <circle r="74" fill="none" stroke={BLUE} strokeWidth="2" opacity="0.3" strokeDasharray="5 7" />
        <circle r="54" fill={BLUE} opacity="0.1" />
        <path d="M-20 2 L-7 17 L22 -16" fill="none" stroke={BLUE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <text y="40" textAnchor="middle" fontSize="11" fontWeight="800" fill={BLUE} fontFamily="system-ui">TÉLÉTRANSMIS</text>
      </g>
      <text x="200" y="358" textAnchor="middle" fontSize="11" fill={INK} opacity="0.45" fontFamily="system-ui">
        DGFiP · Net-entreprises · Greffe
      </text>
    </svg>
  );
}

export const STORY_FRAMES = [
  FrameVocal,
  FrameSignature,
  FramePlanning,
  FrameFactures,
  FrameDeclarations,
  FrameDepot,
];
