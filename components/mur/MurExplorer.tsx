"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import type { ProjectCategory } from "@/types/project";
import MurCard from "./MurCard";

type Filter = "Tous" | ProjectCategory;

export default function MurExplorer() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [query, setQuery] = useState("");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return projects.filter((project) => {
      const matchesFilter = filter === "Tous" || project.category === filter;
      const haystack = `${project.title} ${project.artist} ${project.category} ${project.format}`.toLocaleLowerCase("fr");
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [filter, query]);

  return (
    <section className="mur-explorer" id="projets">
      <header className="mur-explorer__header">
        <div>
          <p>Archive visuelle</p>
          <h2>TOUTES LES CRÉATIONS</h2>
        </div>
        <label className="mur-search-v2">
          <span>Rechercher</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Artiste, projet, catégorie…"
          />
        </label>
      </header>

      <div className="mur-filter-row">
        <div className="mur-filters-v2" role="group" aria-label="Filtrer les projets">
          {projectCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span>{visibleProjects.length.toString().padStart(2, "0")} projets</span>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="mur-masonry-v2">
          {visibleProjects.map((project, index) => (
            <MurCard key={project.slug} project={project} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mur-empty-v2">
          <h3>Aucun projet trouvé.</h3>
          <button type="button" onClick={() => { setFilter("Tous"); setQuery(""); }}>
            Réinitialiser la recherche
          </button>
        </div>
      )}
    </section>
  );
}
