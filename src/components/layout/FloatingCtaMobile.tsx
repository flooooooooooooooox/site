"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, FileText } from "lucide-react";

/**
 * Mobile uniquement : le bouton « Demander un devis » colle en bas d'ecran,
 * et un bouton rond remet en haut de page. Masque sur /devis, ou il serait
 * redondant avec le formulaire lui-meme.
 */
export default function FloatingCtaMobile() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [far, setFar] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const onDevis = pathname === "/devis";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 320);
      setFar(window.scrollY > 1400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBar = scrolled && !dismissed && !onDevis;

  // Le bandeau est fixe : sans reserve de place en bas de document, il
  // recouvre en permanence la fin du contenu.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    document.body.style.paddingBottom = showBar && mobile ? "5.5rem" : "";
    return () => { document.body.style.paddingBottom = ""; };
  }, [showBar]);

  return (
    <>
      {far && (
        <button
          type="button"
          className="mob-top"
          aria-label="Remonter en haut de la page"
          style={{ bottom: showBar ? "5.9rem" : "1.25rem" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={20} strokeWidth={2.4} />
        </button>
      )}

      {showBar && (
        <div className="floating-cta-mobile">
          <Link href="/devis" className="mob-cta-main">
            <FileText size={18} strokeWidth={2.2} aria-hidden />
            <span>
              <strong>Demander un devis</strong>
              <small>Réponse sous 24 h</small>
            </span>
            <span className="mob-cta-arrow" aria-hidden>→</span>
          </Link>
          <button type="button" className="mob-cta-close" aria-label="Fermer" onClick={() => setDismissed(true)}>
            ×
          </button>
        </div>
      )}

      <style>{`
        .floating-cta-mobile {
          position: fixed; left: 12px; right: 12px; z-index: 8888;
          bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          display: flex; align-items: center; gap: .4rem;
          padding: .4rem .4rem .4rem .4rem; border-radius: 1.2rem;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(36,85,214,0.22);
          box-shadow: 0 14px 30px -12px rgba(27,42,74,0.35);
          animation: slideUpCta .4s cubic-bezier(.16,1,.3,1) both;
        }
        .mob-cta-main {
          flex: 1; min-width: 0; min-height: 52px;
          display: flex; align-items: center; gap: .7rem;
          padding: .55rem 1rem; border-radius: .95rem;
          background: linear-gradient(135deg,#2A5FE0,#1C46BE); color: #fff;
          text-decoration: none;
          box-shadow: 0 10px 20px -12px rgba(36,85,214,.9);
        }
        .mob-cta-main > span:nth-of-type(1) { flex: 1; display: flex; flex-direction: column; line-height: 1.2; }
        .mob-cta-main strong { font-size: .95rem; font-weight: 800; }
        .mob-cta-main small { font-size: .7rem; opacity: .8; font-weight: 500; }
        .mob-cta-arrow { font-size: 1.15rem; font-weight: 800; }
        .mob-cta-close {
          flex-shrink: 0; width: 44px; height: 44px; border: 0; background: none;
          color: rgba(27,42,74,.45); font-size: 1.5rem; line-height: 1; cursor: pointer;
        }
        .mob-top {
          position: fixed; right: 12px; z-index: 8887;
          margin-bottom: env(safe-area-inset-bottom, 0px);
          width: 48px; height: 48px; border-radius: 50%;
          display: grid; place-items: center; cursor: pointer;
          background: rgba(255,255,255,0.96); color: #2455D6;
          border: 1px solid rgba(36,85,214,0.22);
          box-shadow: 0 10px 22px -10px rgba(27,42,74,0.4);
          animation: slideUpCta .3s cubic-bezier(.16,1,.3,1) both;
        }
        .mob-top:active { transform: scale(.94); }
        @keyframes slideUpCta {
          from { transform: translateY(120%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (min-width: 769px) {
          .floating-cta-mobile, .mob-top { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-cta-mobile, .mob-top { animation: none; }
        }
      `}</style>
    </>
  );
}
