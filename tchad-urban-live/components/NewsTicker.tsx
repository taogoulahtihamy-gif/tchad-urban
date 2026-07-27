export default function NewsTicker(){
 const items=["Young King T9 dévoile un nouveau single","Calail Chris cumule 17K vues en 5 jours","Groupe Agon représente le Tchad à Timgad","De nouveaux talents arrivent sur la scène 235"];
 return <div className="newsbar"><strong>Actualités</strong><div className="ticker-window"><div className="ticker-track">{[...items,...items].map((item,i)=><span key={`${item}-${i}`}>{item}<i>•</i></span>)}</div></div></div>
}
