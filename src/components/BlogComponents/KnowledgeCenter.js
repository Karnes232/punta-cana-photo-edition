import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { siteLink } from "../HomeComponents/siteLink";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
const {
  nodes,
  clusters,
  topics,
  label,
} = require("../../data/knowledgeGraph");

// The page's own copy (hero, labels, intimate box) comes from this language's
// Blog Page document in Sanity; the guides and headings from the topic map.
const KnowledgeCenter = ({ copy, language, availableSlugs }) => {
  const available = new Set(availableSlugs);
  const active = nodes.filter((n) => available.has(n.slug));
  return (
    <main className="knowledge-center">
      <header className="knowledge-center__hero">
        <p className="knowledge-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="knowledge-center__intro">{copy.intro}</p>
        <nav className="knowledge-jumps" aria-label={copy.topicsTitle}>
          {clusters
            .filter((c) => active.some((n) => n.cluster === c.id))
            .map((c) => (
              <a href={`#${c.id}`} key={c.id}>
                {label(c, language)}
              </a>
            ))}
          <a href="#intimate">{copy.intimateLink?.label}</a>
        </nav>
      </header>
      <div className="knowledge-center__body">
        {clusters.map((c, ci) => {
          const collection = active.filter((n) => n.cluster === c.id);
          if (!collection.length) return null;
          return (
            <section className="knowledge-cluster" id={c.id} key={c.id}>
              <header>
                <p className="knowledge-eyebrow">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2>{label(c, language)}</h2>
                <a href={localizedPath(c.service, language)}>
                  {copy.serviceLabel} <span aria-hidden="true">↗</span>
                </a>
              </header>
              <div className="knowledge-cards">
                {collection.map((n, ni) => {
                  const article = getKnowledgeArticle(n.slug, language);
                  return (
                    <article key={n.id}>
                      <p className="knowledge-card-number" aria-hidden="true">
                        {String(ni + 1).padStart(2, "0")}
                      </p>
                      <h3>
                        <a href={localizedPath(`/blog/${n.slug}/`, language)}>
                          {article.title}
                        </a>
                      </h3>
                      <p>{article.description}</p>
                      <a
                        className="knowledge-read"
                        href={localizedPath(`/blog/${n.slug}/`, language)}
                      >
                        {copy.readLabel} <span aria-hidden="true">→</span>
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
        <section id="intimate" className="knowledge-intimate">
          <div>
            <p className="knowledge-eyebrow">{copy.intimateEyebrow}</p>
            <h2>{copy.intimateTitle}</h2>
            <p>{copy.intimateText}</p>
          </div>
          <a href={siteLink(copy.intimateLink?.url, language)}>
            {copy.intimateLink?.label} <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="knowledge-topics" id="planning-topics">
          <h2>{copy.topicsTitle}</h2>
          <div>
            {topics.map((t) => (
              <section id={`topic-${t.id}`} key={t.id}>
                <h3>{label(t, language)}</h3>
                <ul>
                  {active
                    .filter((n) => n.topics.includes(t.id))
                    .map((n) => (
                      <li key={n.id}>
                        <a href={localizedPath(`/blog/${n.slug}/`, language)}>
                          {getKnowledgeArticle(n.slug, language).title}
                        </a>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
export default KnowledgeCenter;
