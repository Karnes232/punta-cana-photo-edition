import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
const {
  nodes,
  clusters,
  label,
  languageIndex,
  findNode,
  relatedNodes,
} = require("../../data/knowledgeGraph");

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
export const KnowledgeBreadcrumbs = ({ slug, language }) => {
  const node = findNode(slug);
  if (!node) return null;
  const cluster = clusters.find((c) => c.id === node.cluster),
    i = languageIndex(language);
  return (
    <nav className="knowledge-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href={localizedPath("/", language)}>{labels.home[i]}</a>
        </li>
        <li>
          <a href={localizedPath("/blog/", language)}>{labels.center[i]}</a>
        </li>
        <li>
          <a href={`${localizedPath("/blog/", language)}#${cluster.id}`}>
            {label(cluster, language)}
          </a>
        </li>
        <li aria-current="page">
          {getKnowledgeArticle(slug, language)?.title}
        </li>
      </ol>
    </nav>
  );
};
export const KnowledgeToc = ({ article, language }) => (
  <nav
    className="knowledge-toc"
    aria-label={labels.toc[languageIndex(language)]}
  >
    <h2>{labels.toc[languageIndex(language)]}</h2>
    <ol>
      {article.sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`}>{s.heading}</a>
        </li>
      ))}
    </ol>
  </nav>
);
export const KnowledgeRelated = ({ slug, language }) => {
  const node = findNode(slug);
  if (!node) return null;
  const related = relatedNodes(node);
  const ordered = node.next
    ? [
        ...related.filter((n) => n.id === node.next),
        ...related.filter((n) => n.id !== node.next),
      ]
    : related;
  return (
    <nav className="knowledge-related" aria-labelledby="continue-planning">
      <h2 id="continue-planning">{labels.next[languageIndex(language)]}</h2>
      <div>
        {ordered.map((n) => {
          const a = getKnowledgeArticle(n.slug, language);
          return (
            <a key={n.id} href={localizedPath(`/blog/${n.slug}/`, language)}>
              <span>
                {label(
                  clusters.find((c) => c.id === n.cluster),
                  language,
                )}
              </span>
              <strong>{a.title}</strong>
              <small>{a.description}</small>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
export const breadcrumbSchema = (slug, language, rootUrl) => {
  const node = findNode(slug);
  if (!node) return null;
  const cluster = clusters.find((c) => c.id === node.cluster),
    i = languageIndex(language);
  const links = [
    [labels.home[i], localizedPath("/", language)],
    [labels.center[i], localizedPath("/blog/", language)],
    [
      label(cluster, language),
      `${localizedPath("/blog/", language)}#${cluster.id}`,
    ],
    [
      getKnowledgeArticle(slug, language).title,
      localizedPath(`/blog/${slug}/`, language),
    ],
  ];
  return {
    "@type": "BreadcrumbList",
    itemListElement: links.map(([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${rootUrl}${url}`,
    })),
  };
};
