import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { siteLink } from "../HomeComponents/siteLink";
import { guideSlug, localized } from "../../utils/blogGuides";

// The page's own copy (hero, labels, intimate box) comes from this language's
// Blog Page document in Sanity; the guides, event types and topics from the
// Blog Guides. `posts` are this language's guide texts in library order.
const KnowledgeCenter = ({ copy, categories, topics, posts, language }) => {
  const inCategory = (category) =>
    posts.filter((post) => post.guide.category?.key === category.key);
  const guideLink = (post) =>
    localizedPath(`/blog/${guideSlug(post.guide)}/`, language);
  const activeCategories = categories.filter(
    (category) => inCategory(category).length,
  );
  return (
    <main className="knowledge-center">
      <header className="knowledge-center__hero">
        <p className="knowledge-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="knowledge-center__intro">{copy.intro}</p>
        <nav className="knowledge-jumps" aria-label={copy.topicsTitle}>
          {activeCategories.map((category) => (
            <a href={`#${category.key}`} key={category.key}>
              {localized(category.label, language)}
            </a>
          ))}
          <a href="#intimate">{copy.intimateLink?.label}</a>
        </nav>
      </header>
      <div className="knowledge-center__body">
        {categories.map((category, ci) => {
          const collection = inCategory(category);
          if (!collection.length) return null;
          return (
            <section
              className="knowledge-cluster"
              id={category.key}
              key={category.key}
            >
              <header>
                <p className="knowledge-eyebrow">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2>{localized(category.label, language)}</h2>
                <a href={localizedPath(category.servicePage, language)}>
                  {copy.serviceLabel} <span aria-hidden="true">↗</span>
                </a>
              </header>
              <div className="knowledge-cards">
                {collection.map((post, ni) => (
                  <article key={post.guide._id}>
                    <p className="knowledge-card-number" aria-hidden="true">
                      {String(ni + 1).padStart(2, "0")}
                    </p>
                    <h3>
                      <a href={guideLink(post)}>{post.title}</a>
                    </h3>
                    <p>{post.description}</p>
                    <a className="knowledge-read" href={guideLink(post)}>
                      {copy.readLabel} <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
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
            {topics.map((topic) => (
              <section id={`topic-${topic.key}`} key={topic.key}>
                <h3>{localized(topic.label, language)}</h3>
                <ul>
                  {posts
                    .filter((post) =>
                      post.guide.topics?.some((t) => t?.key === topic.key),
                    )
                    .map((post) => (
                      <li key={post.guide._id}>
                        <a href={guideLink(post)}>{post.title}</a>
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
