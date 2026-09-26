import React from "react";
import { sectionId } from "../../utils/blogGuides";

// A guide's sections and FAQ, from its Blog Post in Sanity.
const StructuredBlogBody = ({ post, language }) => {
  if (!post?.sections?.length) return null;

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
      {post.sections.map((section, index) => (
        <section key={sectionId(index)} id={sectionId(index)}>
          <h2>{section.heading}</h2>
          {section.intro && <p>{section.intro}</p>}
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.steps?.length > 0 && (
            <ol className="blog-timeline">
              {section.steps.map(({ label, detail }) => (
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
          {section.sources?.length > 0 && (
            <ul className="blog-sources blog-official-sources">
              {section.sources.map(({ label, url }) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      {post.faqs?.length > 0 && (
        <section id="frequently-asked-questions">
          <h2>{post.faqHeading}</h2>
          {post.faqs.map(({ question, answer }) => (
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
