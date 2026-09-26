import React from "react";
import { sectionId } from "../../utils/blogGuides";

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const heading = "mb-[0.8rem] mt-10 font-crimson font-medium leading-[1.15]";
const paragraph = "mb-5 mt-0 max-w-[78ch] font-montserrat";
const list = "mb-6 mt-0 pl-6";
const item = "mb-2 font-montserrat";
// Numbered steps on a vertical line; the number sits in a circle on the line.
const step = `${item} relative min-h-[3rem] border-l border-l-[#d6c6ae] pb-5 pl-14 last:border-l-transparent before:absolute before:-left-5 before:-top-1 before:grid before:h-10 before:w-10 before:place-items-center before:rounded-[999px] before:border before:border-[#b98a4a] before:bg-white before:text-[0.8rem] before:font-bold before:text-[#8b5e14] before:content-[counter(proposal-timeline)] before:[counter-increment:proposal-timeline]`;

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
    <section
      className="mx-auto w-[min(100%,56rem)] font-montserrat text-[length:clamp(1rem,1.5vw,1.125rem)] leading-[1.8]"
      lang={htmlLanguage}
    >
      {post.sections.map((section, index) => (
        <section
          key={sectionId(index)}
          id={sectionId(index)}
          className="scroll-mt-[110px]"
        >
          <h2 className={`${heading} text-[length:clamp(2rem,4vw,3rem)]`}>
            {section.heading}
          </h2>
          {section.intro && <p className={paragraph}>{section.intro}</p>}
          {section.paragraphs?.map((paragraphText) => (
            <p key={paragraphText} className={paragraph}>
              {paragraphText}
            </p>
          ))}
          {section.steps?.length > 0 && (
            <ol className="mb-6 mt-0 list-none pl-0 [counter-reset:proposal-timeline]">
              {section.steps.map(({ label, detail }) => (
                <li key={label} className={step}>
                  <strong>{label}:</strong> {detail}
                </li>
              ))}
            </ol>
          )}
          {section.bullets?.length > 0 && (
            <ul className={list}>
              {section.bullets.map((bullet) => (
                <li key={bullet} className={item}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {section.note && (
            <blockquote className="my-8 border-l-[3px] border-l-primary-color bg-[#f7f6f3] px-6 py-4">
              {section.note}
            </blockquote>
          )}
          {section.sources?.length > 0 && (
            <ul className={list}>
              {section.sources.map(({ label, url }) => (
                <li key={url} className={item}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat text-[#8b5e14] underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      {post.faqs?.length > 0 && (
        <section id="frequently-asked-questions" className="scroll-mt-[110px]">
          <h2 className={`${heading} text-[length:clamp(2rem,4vw,3rem)]`}>
            {post.faqHeading}
          </h2>
          {post.faqs.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3 className={`${heading} text-[length:clamp(1.55rem,3vw,2.2rem)]`}>
                {question}
              </h3>
              <p className={paragraph}>{answer}</p>
            </React.Fragment>
          ))}
        </section>
      )}
    </section>
  );
};

export default StructuredBlogBody;
