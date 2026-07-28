import Image from "next/image";

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <section className="project-gallery-v2" aria-label={`Galerie ${title}`}>
      {images.map((image, index) => (
        <figure key={`${image}-${index}`} className={index === 0 ? "project-gallery-v2__lead" : ""}>
          <Image src={image} alt={`${title} — visuel ${index + 1}`} fill sizes="(max-width: 760px) 100vw, 70vw" />
        </figure>
      ))}
    </section>
  );
}
