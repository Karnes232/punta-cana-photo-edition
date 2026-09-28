import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { guideSlug, localized, sectionId } from "../../utils/blogGuides";

// `labels` is this language's Blog Page document in Sanity: homeLabel,
// libraryLabel, breadcrumbLabel, tocLabel and nextLabel.

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const column = "mx-auto w-[min(100%,56rem)]";
const focusRing = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[5px] focus-visible:outline-primary-color";
// Each item after the first starts with a "/" separator.
const crumb = "font-montserrat [&:not(:first-child)]:before:mr-2 [&:not(:first-child)]:before:text-[#6b7280] [&:not(:first-child)]:before:content-['/']";

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
    // A step without a name (e.g. a guide with no event type) is left out.
  ].filter(([name]) => name);
};

export const KnowledgeBreadcrumbs = ({ title, guide, labels, language }) => {
  const links = trail({ title, guide, labels, language });
  return (
    <nav
      className={`${column} mb-8 mt-0 max-w-[960px] font-montserrat text-[12px] leading-[1.6] text-[#4b5563]`}
      aria-label={labels.breadcrumbLabel}
    >
      <ol className="flex list-none flex-wrap gap-2 p-0">
        {links.slice(0, 3).map(([name, url]) => (
          <li key={url} className={crumb}>
            <a href={url} className={`font-montserrat underline ${focusRing}`}>
              {name}
            </a>
          </li>
        ))}
        <li aria-current="page" className={`${crumb} max-w-full [overflow-wrap:anywhere]`}>
          {title}
        </li>
      </ol>
    </nav>
  );
};

export const KnowledgeToc = ({ sections, labels }) => (
  <nav
    className={`${column} my-8 border border-l-[3px] border-secondary-color border-l-primary-color bg-secondary-bg-color px-[30px] py-[26px] max-[760px]:p-[22px]`}
    aria-label={labels.tocLabel}
  >
    <h2 className="mb-[15px] mt-0 font-crimson text-[25px] font-normal leading-[1.2]">
      {labels.tocLabel}
    </h2>
    <ol className="m-0 columns-2 gap-8 pl-5 max-[760px]:columns-1">
      {sections.map((section, index) => (
        <li
          key={sectionId(index)}
          className="mb-[10px] mt-0 break-inside-avoid font-montserrat text-[13px] leading-[1.7]"
        >
          <a
            href={`#${sectionId(index)}`}
            className={`font-montserrat underline underline-offset-[3px] ${focusRing}`}
          >
            {section.heading}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

// The guide's related guides, its suggested next one first. `texts` maps a
// guide's id to its text in this language.
export const KnowledgeRelated = ({ guide, texts, labels, language }) => {
  const related = (guide.related || []).filter(
    (item) => item && texts[item._id],
  );
  const nextId = guide.next?._id;
  const ordered = [
    ...related.filter((item) => item._id === nextId),
    ...related.filter((item) => item._id !== nextId),
  ];
  if (!ordered.length) return null;
  return (
    <nav
      className={`${column} my-[45px] border-t border-t-secondary-color pt-8`}
      aria-labelledby="continue-planning"
    >
      <h2
        id="continue-planning"
        className="font-crimson text-[34px] font-normal leading-[1.2]"
      >
        {labels.nextLabel}
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
        {ordered.map((item) => {
          const text = texts[item._id];
          return (
            <a
              key={item._id}
              href={localizedPath(`/blog/${guideSlug(item)}/`, language)}
              className={`flex flex-col gap-[10px] border border-secondary-color p-[22px] font-montserrat [overflow-wrap:anywhere] ${focusRing}`}
            >
              <span className="font-montserrat text-[10px] font-medium uppercase leading-[1.6] tracking-[0.08em] text-[#4b5563]">
                {localized(item.category?.label, language)}
              </span>
              <strong className="font-crimson text-[24px] font-normal leading-[1.2]">
                {text.title}
              </strong>
              <small className="font-montserrat text-[12px] leading-[1.7] text-[#4b5563]">
                {text.description}
              </small>
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
