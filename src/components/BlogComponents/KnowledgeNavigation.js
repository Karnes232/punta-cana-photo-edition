import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import {
  guideSlug,
  languageIndex,
  localized,
  sectionId,
} from "../../utils/blogGuides";

// Page chrome, not content: the same wording on every guide.
const labels = {
  home: ["Home", "Inicio", "Início", "Accueil"],
  center: [
    "Event planning guides",
    "Guías para planificar eventos",
    "Guias de planejamento",
    "Guides d’organisation",
  ],
  next: [
    "Continue planning",
    "Continúa planificando",
    "Continue planejando",
    "Poursuivre la préparation",
  ],
  toc: ["In this guide", "En esta guía", "Neste guia", "Dans ce guide"],
};

// Home › Guides › the guide's event type › the guide.
const trail = ({ title, guide, language }) => {
  const i = languageIndex(language);
  const category = guide.category;
  return [
    [labels.home[i], localizedPath("/", language)],
    [labels.center[i], localizedPath("/blog/", language)],
    [
      localized(category?.label, language),
      `${localizedPath("/blog/", language)}#${category?.key}`,
    ],
    [title, localizedPath(`/blog/${guideSlug(guide)}/`, language)],
  ];
};

export const KnowledgeBreadcrumbs = ({ title, guide, language }) => {
  const links = trail({ title, guide, language });
  return (
    <nav className="knowledge-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {links.slice(0, 3).map(([name, url]) => (
          <li key={url}>
            <a href={url}>{name}</a>
          </li>
        ))}
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
};

export const KnowledgeToc = ({ sections, language }) => (
  <nav
    className="knowledge-toc"
    aria-label={labels.toc[languageIndex(language)]}
  >
    <h2>{labels.toc[languageIndex(language)]}</h2>
    <ol>
      {sections.map((section, index) => (
        <li key={sectionId(index)}>
          <a href={`#${sectionId(index)}`}>{section.heading}</a>
        </li>
      ))}
    </ol>
  </nav>
);

// The guide's related guides, its suggested next one first. `texts` maps a
// guide's id to its text in this language.
export const KnowledgeRelated = ({ guide, texts, language }) => {
  const related = (guide.related || []).filter((item) => texts[item._id]);
  const nextId = guide.next?._id;
  const ordered = [
    ...related.filter((item) => item._id === nextId),
    ...related.filter((item) => item._id !== nextId),
  ];
  if (!ordered.length) return null;
  return (
    <nav className="knowledge-related" aria-labelledby="continue-planning">
      <h2 id="continue-planning">{labels.next[languageIndex(language)]}</h2>
      <div>
        {ordered.map((item) => {
          const text = texts[item._id];
          return (
            <a
              key={item._id}
              href={localizedPath(`/blog/${guideSlug(item)}/`, language)}
            >
              <span>{localized(item.category?.label, language)}</span>
              <strong>{text.title}</strong>
              <small>{text.description}</small>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export const breadcrumbSchema = ({ title, guide, language, rootUrl }) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail({ title, guide, language }).map(
    ([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${rootUrl}${url}`,
    }),
  ),
});
