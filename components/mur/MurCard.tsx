import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export default function MurCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className={`mur-card-v2 mur-card-v2--${project.size}`}>
      <Link href={`/mur/${project.slug}`} className="mur-card-v2__link" aria-label={`Voir ${project.title}`}>
        <div className="mur-card-v2__image">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
          <div className="mur-card-v2__overlay">
            <span>{project.category}</span>
            <strong>Voir le projet ↗</strong>
          </div>
        </div>
        <div className="mur-card-v2__meta">
          <div>
            <span>{project.artist}</span>
            <h2>{project.title}</h2>
          </div>
          <time>{project.year}</time>
        </div>
      </Link>
    </article>
  );
}
