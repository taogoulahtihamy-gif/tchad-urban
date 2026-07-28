import Image from "next/image";

export default function MurHero() {
  return (
    <section className="mur-hero-v2">
      <div className="mur-hero-v2__media" aria-hidden="true">
        <Image src="/work/work-3.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="mur-hero-v2__shade" />
      <div className="mur-hero-v2__content">
        <p>Galerie créative — N’Djamena</p>
        <h1>LE MUR</h1>
        <div className="mur-hero-v2__bottom">
          <p>
            Musique, talents, culture et campagnes racontés avec une direction visuelle forte.
          </p>
          <span>Explorer les projets ↓</span>
        </div>
      </div>
    </section>
  );
}
