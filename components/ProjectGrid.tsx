"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
const projects=[
 {src:"/work/work-1.png",title:"Le saviez-vous ?",cat:"Éditorial"},{src:"/work/work-2.png",title:"Wildy 4real",cat:"Talent"},{src:"/work/work-3.png",title:"Sozzaa — Pirate",cat:"Musique"},{src:"/work/work-4.png",title:"Salty — Genesis",cat:"Musique"},{src:"/work/work-5.png",title:"Young King T9",cat:"Actualité"},{src:"/work/work-6.png",title:"Calail Chris",cat:"Actualité"},{src:"/work/work-7.png",title:"En ce moment",cat:"Culture"},{src:"/work/work-8.png",title:"Groupe Agon",cat:"Culture"}
];
const filters=["Tout","Musique","Talent","Actualité","Culture","Éditorial"];
export default function ProjectGrid({compact=false}:{compact?:boolean}){
 const [filter,setFilter]=useState("Tout"); const [modal,setModal]=useState<number|null>(null);
 const visible=useMemo(()=>filter==="Tout"?projects:projects.filter(p=>p.cat===filter),[filter]);
 return <>
 <div className="filters">{filters.map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}</button>)}</div>
 <div className={compact?"project-grid compact":"project-grid"}>{visible.map((p,i)=><button className="project-card" key={p.src} onClick={()=>setModal(projects.findIndex(x=>x.src===p.src))}><div className="project-image"><Image src={p.src} alt={p.title} fill sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 25vw"/></div><div className="project-info"><span>{p.cat}</span><b>{p.title}</b><em>↗</em></div></button>)}</div>
 {modal!==null&&<div className="modal" onClick={()=>setModal(null)}><button className="modal-close">Fermer ×</button><div className="modal-image" onClick={e=>e.stopPropagation()}><Image src={projects[modal].src} alt={projects[modal].title} fill sizes="90vw"/></div><div className="modal-caption"><b>{projects[modal].title}</b><span>{projects[modal].cat}</span></div></div>}
 </>
}
