import React from "react";

const FrenchBlogBody = ({ article }) => {
  if (!article?.sections?.length) return null;

  return (
    <section className="blog-article-content" lang="fr-FR">
      {article.author && <p>{article.author}</p>}
      {article.sections.map(([heading, ...paragraphs]) => (
        <React.Fragment key={heading}>
          <h2>{heading}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </React.Fragment>
      ))}
    </section>
  );
};

export default FrenchBlogBody;
