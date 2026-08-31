import React from "react";

const StructuredBlogBody = ({ article, language }) => {
  if (!article?.sections?.length) return null;

  const htmlLanguage =
    language === "pt"
      ? "pt-BR"
      : language === "fr"
        ? "fr"
        : language === "es"
          ? "es"
          : "en";

  return (
    <section className="blog-article-content" lang={htmlLanguage}>
      {article.author && <p className="blog-byline">{article.author}</p>}
      {article.reviewNote && (
        <p className="blog-review-note">{article.reviewNote}</p>
      )}
      {article.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.intro && <p>{section.intro}</p>}
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.steps?.length > 0 && (
            <ol className="blog-timeline">
              {section.steps.map(([label, detail]) => (
                <li key={label}>
                  <strong>{label}:</strong> {detail}
                </li>
              ))}
            </ol>
          )}
          {section.bullets?.length > 0 && (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.note && <blockquote>{section.note}</blockquote>}
        </section>
      ))}
      {article.faqs?.length > 0 && (
        <section id="frequently-asked-questions">
          <h2>{article.faqHeading}</h2>
          {article.faqs.map(([question, answer]) => (
            <React.Fragment key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </React.Fragment>
          ))}
        </section>
      )}
    </section>
  );
};

export default StructuredBlogBody;
