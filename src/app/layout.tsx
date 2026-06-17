import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: ["700","800","900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500"] });

export const metadata: Metadata = {
  title: "Floxia — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
  description: "Floxia — Générez vos devis et factures depuis WhatsApp en 3 minutes. ERP IA pour artisans et PME du bâtiment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
