import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Tchad Urban — Média créatif",
  description: "Tchad Urban met en lumière la culture urbaine, les talents et les événements au Tchad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><SiteHeader />{children}</body></html>;
}
