import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
const services=[
 ["Covers & sorties musicales","Pochettes de singles, EP, albums et visuels d'annonce."],
 ["Concerts & festivals","Affiches, programmes, stories et déclinaisons sociales."],
 ["Portraits d'artistes","Mise en valeur de talents à travers une direction visuelle forte."],
 ["Événements culturels","Communication visuelle pour événements et institutions."],
 ["Campagnes de communication","Concepts créatifs pour marques, produits et organisations."],
 ["Réseaux sociaux","Formats adaptés à Instagram, Facebook, TikTok et YouTube."]
];
export default function ServicesPage(){return <main className="page-main"><section className="page-hero"><p>Studio créatif</p><h1>NOS SERVICES</h1><span>Des solutions visuelles pensées pour attirer, informer et faire retenir votre message.</span></section><section className="services-page">{services.map(([t,d],i)=><article key={t}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{t}</h2><p>{d}</p></div><b>↗</b></article>)}</section><section className="cta"><h2>UN PROJET À FAIRE<br/><em>REMARQUER ?</em></h2><Link href="/commande">Commander un design →</Link></section><SiteFooter/></main>}
