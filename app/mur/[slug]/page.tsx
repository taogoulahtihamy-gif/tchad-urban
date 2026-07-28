import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import ProjectGallery from "@/components/mur/ProjectGallery";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable — Tchad Urban" };
  return {
    title: `${project.title} — Tchad Urban`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  return (
    <main className="page-main project-page-v2">
      <section className="project-hero-v2">
        <div className="project-hero-v2__image">
          <Image src={project.cover} alt={project.title} fill priority sizes="100vw" />
        </div>
        <div className="project-hero-v2__overlay" />
        <div className="project-hero-v2__content">
          <Link href="/mur">← Retour au Mur</Link>
          <div>
            <p>{project.category} — {project.year}</p>
            <h1>{project.title}</h1>
            <span>{project.artist}</span>
          </div>
        </div>
      </section>

      <section className="project-intro-v2">
        <div className="project-intro-v2__lead">
          <p>Le projet</p>
          <h2>{project.excerpt}</h2>
        </div>
        <div className="project-intro-v2__copy">
          <p>{project.description}</p>
          <dl>
            <div><dt>Client</dt><dd>{project.client}</dd></div>
            <div><dt>Format</dt><dd>{project.format}</dd></div>
            <div><dt>Année</dt><dd>{project.year}</dd></div>
          </dl>
        </div>
      </section>

      <ProjectGallery images={project.gallery} title={project.title} />

      <section className="project-details-v2">
        <div>
          <p>Objectif</p>
          <h2>{project.objective}</h2>
        </div>
        <div>
          <p>Livrables</p>
          <ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <Link href={`/mur/${nextProject.slug}`} className="next-project-v2">
        <span>Projet suivant</span>
        <strong>{nextProject.title}</strong>
        <em>→</em>
      </Link>

      <SiteFooter />
    </main>
  );
}
