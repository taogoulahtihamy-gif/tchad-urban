"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {src:"/work/work-3.png", eyebrow:"Média créatif • N'Djamena", title:"SOZZAA — PIRATE", description:"Une création musicale pensée pour imposer une identité forte dès le premier regard."},
  {src:"/work/work-2.png", eyebrow:"Talent du jour", title:"WILDY 4REAL", description:"Tchad Urban valorise les artistes et les nouveaux visages de la scène 235."},
  {src:"/work/work-1.png", eyebrow:"Notre quotidien 235", title:"LE SAVIEZ-VOUS ?", description:"Une série éditoriale qui raconte le Tchad avec clarté, rythme et impact."},
  {src:"/work/work-4.png", eyebrow:"Sortie musicale", title:"SALTY — GENESIS", description:"Des visuels premium pour les sorties, les portraits et les campagnes culturelles."}
];

export default function Hero(){
 const [index,setIndex]=useState(0); const [playing,setPlaying]=useState(true);
 useEffect(()=>{if(!playing)return; const id=setInterval(()=>setIndex(v=>(v+1)%slides.length),5000); return()=>clearInterval(id)},[playing]);
 const s=slides[index];
 return <section className="hero">
   <div className="hero-glow"/>
   <div className="hero-copy">
     <p className="hero-tag">#Notrequotidien235</p>
     <p className="hero-eyebrow">{s.eyebrow}</p>
     <h1>{s.title}</h1>
     <div className="accent-line"/>
     <p>{s.description}</p>
     <div className="hero-actions"><Link href="/mur">Découvrir <span>→</span></Link><button onClick={()=>setPlaying(v=>!v)}>{playing?"Ⅱ":"▶"} Reel visuel</button></div>
   </div>
   <button className="hero-visual" onClick={()=>setIndex(v=>(v+1)%slides.length)} aria-label="Afficher le visuel suivant">
     <Image key={s.src} src={s.src} alt={s.title} fill priority sizes="(max-width: 760px) 75vw, 35vw"/>
     <span className="poster-shine"/>
   </button>
   <div className="hero-dots">{slides.map((_,i)=><button key={i} aria-label={`Visuel ${i+1}`} className={i===index?"active":""} onClick={()=>setIndex(i)}/>)}</div>
   <div className="hero-arrows"><button onClick={()=>setIndex((index-1+slides.length)%slides.length)}>←</button><button onClick={()=>setIndex((index+1)%slides.length)}>→</button></div>
 </section>
}
