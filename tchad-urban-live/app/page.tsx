import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import ProjectGrid from "@/components/ProjectGrid";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import Image from "next/image";

export default function HomePage(){return <main><Hero/><NewsTicker/>
<section className="section home-works"><div className="section-heading"><div><p>Le mur</p><h2>RÉALISATIONS<br/>RÉCENTES</h2></div><Link href="/mur">Voir tout <span>→</span></Link></div><ProjectGrid compact/></section>
<section className="home-services"><div><p>Notre savoir-faire</p><h2>DES VISUELS<br/>QUI FONT LA<br/><em>DIFFÉRENCE.</em></h2><Link href="/services">Nos services <span>→</span></Link></div><div className="service-preview">{["Covers & singles","Concerts & festivals","Portraits d'artistes","Campagnes & communication","Réseaux sociaux"].map((x,i)=><article key={x}><span>{["♫","◉","♙","⌁","▯"][i]}</span><h3>{x}</h3></article>)}</div></section>
<section className="feature"><div className="feature-copy"><p>En ce moment</p><h2>GROUPE AGON</h2><p>Une actualité culturelle mise en scène avec une direction graphique claire et identifiable.</p><Link href="/mur">Voir l'actualité <span>→</span></Link></div><div className="feature-image"><Image src="/work/work-8.png" alt="Groupe Agon" fill sizes="(max-width:800px) 100vw, 56vw"/><span className="play-badge">▶</span></div></section>
<SiteFooter/></main>}
