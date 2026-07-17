"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile : pas d'animation 3D (le zoom rend mal sur petit écran) — carte statique
  const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);

  return (
    <div
      ref={containerRef}
      style={{
        // Mobile : hauteur naturelle (pas d'animation) — desktop : scroll travel complet
        height: isMobile ? "auto" : "80rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: isMobile ? "0.5rem" : "5rem",
      }}
    >
      <div style={{
        paddingTop: isMobile ? "1.5rem" : "10rem",
        paddingBottom: isMobile ? "1.5rem" : "10rem",
        width: "100%",
        position: "relative",
        perspective: "1000px",
      }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div style={{ translateY: translate, maxWidth: "64rem", margin: "0 auto", textAlign: "center" }}>
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  isMobile,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  isMobile?: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      maxWidth: "64rem",
      marginTop: isMobile ? "1.25rem" : "-3rem",
      marginLeft: "auto",
      marginRight: "auto",
      // Desktop : 40rem inchangé. Mobile : 22rem pour respecter le ratio du dashboard
      height: isMobile ? "22rem" : "40rem",
      width: "100%",
      border: "1px solid rgba(36,85,214,0.2)",
      padding: "6px",
      background: "#0A1520",
      borderRadius: "1.75rem",
    }}
  >
    <div style={{
      height: "100%",
      width: "100%",
      overflow: "hidden",
      borderRadius: "1.25rem",
      background: "#0F1923",
    }}>
      {children}
    </div>
  </motion.div>
);
