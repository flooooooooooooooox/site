import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import { CinematicFooter } from "@/components/ui/motion-footer";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: ["700","800","900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500"] });

export const metadata: Metadata = {
  title: "Floxia — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
  description: "Floxia — Générez vos devis et factures depuis WhatsApp en 3 minutes. ERP IA pour artisans et PME du bâtiment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>
        {/* Chrome partagé — monté une seule fois, persiste entre les pages */}
        <SectionsBackdrop />
        <ClientCursor />
        <div className="grain" aria-hidden />
        <Navbar />
        {children}
        <div style={{ position: "relative", zIndex: 1 }}>
          <CinematicFooter />
        </div>
      </body>
    </html>
  );
}
