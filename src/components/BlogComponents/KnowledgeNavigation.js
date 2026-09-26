import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { guideSlug, localized, sectionId } from "../../utils/blogGuides";

// `labels` is this language's Blog Page document in Sanity: homeLabel,
// libraryLabel, breadcrumbLabel, tocLabel and nextLabel.

// Home › Guides › the guide's event type › the guide.
const trail = ({ title, guide, labels, language }) => {
  const category = guide.category;
  return [
    [labels.homeLabel, localizedPath("/", language)],
    [labels.libraryLabel, localizedPath("/blog/", language)],
    [
      localized(category?.label, language),
      `${localizedPath("/blog/", language)}#${category?.key}`,
    ],
    [title, localizedPath(`/blog/${guideSlug(guide)}/`, language)],
  ];
};

export const KnowledgeBreadcrumbs = ({ title, guide, labels, language }) => {
  const links = trail({ title, guide, labels, language });
  return (
    <nav className="knowledge-breadcrumbs" aria-label={labels.breadcrumbLabel}>
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

export const KnowledgeToc = ({ sections, labels }) => (
  <nav className="knowledge-toc" aria-label={labels.tocLabel}>
    <h2>{labels.tocLabel}</h2>
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
export const KnowledgeRelated = ({ guide, texts, labels, language }) => {
  const related = (guide.related || []).filter((item) => texts[item._id]);
  const nextId = guide.next?._id;
  const ordered = [
    ...related.filter((item) => item._id === nextId),
    ...related.filter((item) => item._id !== nextId),
  ];
  if (!ordered.length) return null;
  return (
    <nav className="knowledge-related" aria-labelledby="continue-planning">
      <h2 id="continue-planning">{labels.nextLabel}</h2>
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

export const breadcrumbSchema = ({ title, guide, labels, language, rootUrl }) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail({ title, guide, labels, language }).map(
    ([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${rootUrl}${url}`,
    }),
  ),
});
