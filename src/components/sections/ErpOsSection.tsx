export default function ErpOsSection() {
  return (
    <section className="hidden md:block relative" style={{ background: "#0A1520" }}>
      <div className="max-w-6xl mx-auto px-[6vw] py-20">
        <div className="text-center mb-12">
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "#F5C842" }}
          >
            FloxiaOS — Votre cockpit opérationnel
          </h2>
          <p style={{ color: "rgba(232,237,244,0.6)" }} className="mt-3 text-lg">
            Un seul écran. Tout votre business.
          </p>
        </div>
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
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
