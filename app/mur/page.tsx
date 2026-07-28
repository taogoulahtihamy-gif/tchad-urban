import type { Metadata } from "next";
import MurHero from "@/components/mur/MurHero";
import MurExplorer from "@/components/mur/MurExplorer";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Le Mur — Tchad Urban",
  description: "Explorez les créations, artistes, campagnes et événements de Tchad Urban.",
};

export default function MurPage() {
  return (
    <main className="page-main mur-page-v2">
      <MurHero />
      <MurExplorer />
      <SiteFooter />
    </main>
  );
}
