export type ProjectCategory =
  | "Musique"
  | "Portrait"
  | "Concert"
  | "Culture"
  | "Campagne"
  | "Éditorial";

export type Project = {
  slug: string;
  title: string;
  artist: string;
  category: ProjectCategory;
  year: string;
  format: string;
  client: string;
  cover: string;
  gallery: string[];
  excerpt: string;
  description: string;
  objective: string;
  deliverables: string[];
  featured?: boolean;
  size: "tall" | "wide" | "standard";
};
