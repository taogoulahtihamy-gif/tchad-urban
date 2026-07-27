"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/", "Accueil"], ["/mur", "Le mur"], ["/services", "Services"],
  ["/a-propos", "À propos"], ["/contact", "Contact"]
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="Tchad Urban accueil"><span className="brand-u">U</span><span>TCHAD<br/><b>URBAN</b></span></Link>
    <nav className={open ? "main-nav open" : "main-nav"}>
      {links.map(([href,label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname===href ? "active" : ""}>{label}</Link>)}
    </nav>
    <Link href="/commande" className="order-button">Commander <span>↗</span></Link>
    <button className="menu-button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(v => !v)}><span/><span/></button>
  </header>;
}
