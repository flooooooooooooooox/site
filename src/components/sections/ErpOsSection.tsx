export default function ErpOsSection() {
  return (
    <section className="hidden md:block relative" style={{ background: "#0A1520" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "5rem 6vw" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{ fontFamily: "var(--font-nunito)", color: "#F5C842", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            FloxiaOS — Votre cockpit opérationnel
          </h2>
          <p style={{ color: "rgba(232,237,244,0.6)", marginTop: "0.75rem", fontSize: "1.125rem" }}>
            Un seul écran. Tout votre business.
          </p>
        </div>
        <div
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid rgba(245,200,66,0.15)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(245,200,66,0.05)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image4.png" alt="FloxiaOS Dashboard" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
