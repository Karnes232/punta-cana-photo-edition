import React from "react";
import RichTextBlock from "./RichTextBlock";
import { hasContentfulCopy } from "./managedText";

// Contentful's paragraph2 is written as "01 — Title. Body 02 — …". When it has
// exactly three such steps, show them as step cards; otherwise null.
const getStructuredProcessSteps = (context) => {
  if (!context?.raw) return null;

  try {
    const document = JSON.parse(context.raw);
    const readText = (node) => {
      if (typeof node?.value === "string") return node.value;
      return (node?.content || []).map(readText).join(" ");
    };
    const text = readText(document).replace(/\s+/g, " ").trim();
    const sections = text
      .split(/(?=0[1-3]\s*[—-])/)
      .map((section) => section.trim())
      .filter(Boolean);

    if (sections.length !== 3) return null;

    const steps = sections.map((section) => {
      const match = section.match(/^(\d{2})\s*[—-]\s*([^.!?]+)[.!?]\s*(.+)$/);
      return match
        ? { number: match[1], title: match[2].trim(), body: match[3].trim() }
        : null;
    });

    return steps.every(Boolean) ? steps : null;
  } catch {
    return null;
  }
};

const ProcessSection = ({ page, content, language }) => {
  const contentful = hasContentfulCopy(language) ? page?.paragraph2 : null;
  const structuredSteps = getStructuredProcessSteps(contentful);
  // Unstructured Contentful copy renders as rich text; otherwise step cards,
  // from Contentful when it parsed, else from the repo copy.
  const showRichText = contentful?.raw && !structuredSteps;

  return (
    <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
          {content.processEyebrow}
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h2 className="font-crimson text-4xl font-medium leading-tight md:text-6xl">
            {content.processTitle}
          </h2>
          <p className="font-montserrat text-base leading-8 text-gray-300 md:text-lg">
            {content.processIntro}
          </p>
        </div>
        {showRichText ? (
          <div className="mt-12 border border-white/15 bg-white p-8 text-black md:p-12">
            <RichTextBlock context={contentful} />
          </div>
        ) : (
          <div className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
            {(structuredSteps || content.process).map((step) => (
              <article key={step.number} className="bg-black p-8 md:p-10">
                <span className="font-montserrat text-xs font-semibold tracking-[0.2em] text-primary-color">
                  {step.number}
                </span>
                <h3 className="mt-7 font-crimson text-3xl font-medium">
                  {step.title}
                </h3>
                <p className="mt-4 font-montserrat text-sm leading-7 text-gray-300">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
