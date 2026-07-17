"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ErpOsSection() {
  return (
    <section id="ecosysteme" style={{ background: "transparent", overflow: "hidden" }}>
      <ContainerScroll
        titleComponent={
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span style={{
              display: "inline-block", padding: "6px 20px", borderRadius: "999px",
              border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
              color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
              textTransform: "uppercase", marginBottom: "1.2rem",
            }}>
              CirrionOS
            </span>
            <h2 style={{
              fontFamily: "var(--font-nunito)", fontWeight: 900,
              fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--text)",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>
              Votre{" "}
              <span style={{ color: "#2455D6" }}>cockpit opérationnel</span>
            </h2>
            <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.55)", fontSize: "1.1rem" }}>
              Un seul écran. Tout votre business.
            </p>
          </div>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dashboard-cirrion.jpg"
          alt="Tableau de bord CirrionOS — cockpit de gestion pour artisans du bâtiment : devis, factures, chantiers, planning, relances et notifications"
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", borderRadius: "1rem" }}
        />
      </ContainerScroll>
    </section>
  );
}
