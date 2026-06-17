"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ErpOsSection() {
  return (
    <section id="ecosysteme" style={{ background: "#0A1520", overflow: "hidden" }}>
      <ContainerScroll
        titleComponent={
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span style={{
              display: "inline-block", padding: "6px 20px", borderRadius: "999px",
              border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)",
              color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
              textTransform: "uppercase", marginBottom: "1.2rem",
            }}>
              FloxiaOS
            </span>
            <h2 style={{
              fontFamily: "var(--font-nunito)", fontWeight: 900,
              fontSize: "clamp(2rem,4vw,3.5rem)", color: "#E8EDF4",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>
              Votre{" "}
              <span style={{ color: "#F5C842" }}>cockpit opérationnel</span>
            </h2>
            <p style={{ marginTop: "0.75rem", color: "rgba(232,237,244,0.55)", fontSize: "1.1rem" }}>
              Un seul écran. Tout votre business.
            </p>
          </div>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image4.png"
          alt="FloxiaOS Dashboard"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", borderRadius: "1rem" }}
        />
      </ContainerScroll>
    </section>
  );
}
