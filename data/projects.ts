import type { Project, ProjectCategory } from "@/types/project";

export const projectCategories: Array<"Tous" | ProjectCategory> = [
  "Tous",
  "Musique",
  "Portrait",
  "Concert",
  "Culture",
  "Campagne",
  "Éditorial",
];

export const projects: Project[] = [
  {
    slug: "le-saviez-vous-bunda",
    title: "Le saviez-vous ?",
    artist: "Tchad Urban",
    category: "Éditorial",
    year: "2026",
    format: "Série culturelle",
    client: "Tchad Urban",
    cover: "/work/work-1.png",
    gallery: ["/work/work-1.png", "/work/work-7.png"],
    excerpt: "Un format court pour raconter le Tchad avec une identité directe.",
    description:
      "Une série éditoriale conçue pour transmettre une information culturelle en quelques secondes, sans sacrifier la qualité visuelle.",
    objective:
      "Créer un rendez-vous identifiable, mémorable et facilement déclinable sur les réseaux sociaux.",
    deliverables: ["Direction artistique", "Post Instagram", "Story", "Déclinaisons sociales"],
    featured: true,
    size: "tall",
  },
  {
    slug: "wildy-4real-talent-du-jour",
    title: "Wildy 4real",
    artist: "Wildy 4real",
    category: "Portrait",
    year: "2026",
    format: "Portrait d’artiste",
    client: "Wildy 4real",
    cover: "/work/work-2.png",
    gallery: ["/work/work-2.png", "/work/work-6.png"],
    excerpt: "Mise en lumière d’un nouveau visage de la scène urbaine 235.",
    description:
      "Un portrait éditorial construit autour de l’attitude, de la personnalité et de l’univers musical de l’artiste.",
    objective:
      "Présenter un talent émergent avec les codes graphiques d’un média musical international.",
    deliverables: ["Portrait éditorial", "Direction graphique", "Publication sociale"],
    featured: true,
    size: "standard",
  },
  {
    slug: "sozzaa-pirate",
    title: "Sozzaa — Pirate",
    artist: "Sozzaa",
    category: "Musique",
    year: "2026",
    format: "Sortie de clip",
    client: "Sozzaa",
    cover: "/work/work-3.png",
    gallery: ["/work/work-3.png", "/work/work-5.png"],
    excerpt: "Une campagne visuelle sombre et cinématographique pour le clip Pirate.",
    description:
      "Une composition pensée pour annoncer le clip, installer son atmosphère et rendre l’artiste immédiatement reconnaissable.",
    objective:
      "Créer un visuel de lancement puissant, lisible et cohérent avec l’énergie scénique du projet.",
    deliverables: ["Key visual", "Post de lancement", "Story", "Teaser social"],
    featured: true,
    size: "wide",
  },
  {
    slug: "salty-genesis",
    title: "Salty — Genesis",
    artist: "Salty",
    category: "Musique",
    year: "2026",
    format: "Cover & promotion",
    client: "Salty",
    cover: "/work/work-4.png",
    gallery: ["/work/work-4.png", "/work/work-2.png"],
    excerpt: "Direction visuelle et déclinaisons digitales autour d’une sortie musicale.",
    description:
      "Une identité concise et frontale, conçue pour fonctionner aussi bien dans un feed que dans une campagne de lancement.",
    objective:
      "Donner à la sortie une signature graphique nette et adaptable à tous les formats numériques.",
    deliverables: ["Cover", "Post social", "Story", "Bannière"],
    size: "standard",
  },
  {
    slug: "young-king-t9-live",
    title: "Young King T9",
    artist: "Young King T9",
    category: "Concert",
    year: "2026",
    format: "Annonce événement",
    client: "Young King T9",
    cover: "/work/work-5.png",
    gallery: ["/work/work-5.png", "/work/work-8.png"],
    excerpt: "Une annonce scénique conçue pour retenir l’attention immédiatement.",
    description:
      "Un visuel événementiel qui hiérarchise clairement l’artiste, l’information et l’appel à l’action.",
    objective:
      "Transformer une annonce de concert en contenu éditorial désirable et partageable.",
    deliverables: ["Affiche digitale", "Post Instagram", "Story événement"],
    size: "tall",
  },
  {
    slug: "calail-chris-performance",
    title: "Calail Chris",
    artist: "Calail Chris",
    category: "Campagne",
    year: "2026",
    format: "Performance digitale",
    client: "Calail Chris",
    cover: "/work/work-6.png",
    gallery: ["/work/work-6.png", "/work/work-3.png"],
    excerpt: "Un visuel de campagne pour transformer une performance en actualité.",
    description:
      "La donnée devient ici un argument narratif et une preuve de traction, intégrée dans une composition éditoriale.",
    objective:
      "Valoriser la progression d’un contenu sans perdre l’identité visuelle de l’artiste.",
    deliverables: ["Post performance", "Story", "Déclinaison annonce"],
    size: "standard",
  },
  {
    slug: "en-ce-moment-culture",
    title: "En ce moment",
    artist: "Tchad Urban",
    category: "Culture",
    year: "2026",
    format: "Actualité culturelle",
    client: "Tchad Urban",
    cover: "/work/work-7.png",
    gallery: ["/work/work-7.png", "/work/work-1.png"],
    excerpt: "Une actualité culturelle traitée comme un véritable objet graphique.",
    description:
      "Un format média régulier qui associe information, photographie et identité visuelle cohérente.",
    objective:
      "Rendre l’actualité locale plus attractive et augmenter sa capacité de partage.",
    deliverables: ["Direction éditoriale", "Post", "Story"],
    size: "wide",
  },
  {
    slug: "groupe-agon-timgad",
    title: "Groupe Agon",
    artist: "Groupe Agon",
    category: "Culture",
    year: "2026",
    format: "Communication culturelle",
    client: "Groupe Agon",
    cover: "/work/work-8.png",
    gallery: ["/work/work-8.png", "/work/work-5.png"],
    excerpt: "Une campagne pour inscrire un groupe et son univers dans l’actualité.",
    description:
      "Un traitement média pensé pour mettre en valeur une présence culturelle, un événement et une identité collective.",
    objective:
      "Faire émerger le groupe dans le flux social avec une composition immédiatement identifiable.",
    deliverables: ["Key visual", "Post média", "Story"],
    size: "standard",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
