import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { siteLink } from "../HomeComponents/siteLink";
import { guideSlug, localized } from "../../utils/blogGuides";

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const link = "[overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[5px] focus-visible:outline-primary-color";
const eyebrow = "font-montserrat text-[11px] font-semibold uppercase leading-[1.8] tracking-[0.18em]";
const sectionTitle = "m-0 font-crimson text-[length:clamp(28px,3vw,42px)] font-normal leading-[1.15]";
const smallLink = `font-montserrat text-[12px] font-semibold leading-[1.6] underline underline-offset-[5px] ${link}`;

// The page's own copy (hero, labels, intimate box) comes from this language's
// Blog Page document in Sanity; the guides, event types and topics from the
// Blog Guides. `posts` are this language's guide texts in library order.
const KnowledgeCenter = ({ copy, categories, topics, posts, language }) => {
  const inCategory = (category) =>
    posts.filter((post) => post.guide.category?.key === category.key);
  const guideLink = (post) =>
    localizedPath(`/blog/${guideSlug(post.guide)}/`, language);
  const jumpLinks = [
    ...categories
      .filter((category) => inCategory(category).length)
      .map((category) => [`#${category.key}`, localized(category.label, language)]),
    ["#intimate", copy.intimateLink?.label],
  ];
  return (
    <main className="bg-primary-bg-color text-[#111827]">
      <header className="mx-auto max-w-[1240px] px-10 pb-16 pt-[100px] max-[760px]:px-[22px] max-[760px]:pb-10 max-[760px]:pt-[66px]">
        <p className={`${eyebrow} text-[#4b5563]`}>{copy.eyebrow}</p>
        <h1 className="my-[22px] max-w-[920px] font-crimson text-[length:clamp(44px,6vw,82px)] font-normal leading-[1.06] tracking-[-0.03em] max-[760px]:text-[46px]">
          {copy.title}
        </h1>
        <p className="max-w-[650px] font-montserrat text-[17px] leading-[1.8] text-[#4b5563] max-[760px]:text-[15px]">
          {copy.intro}
        </p>
        <nav className="mt-9 flex flex-wrap gap-[10px]" aria-label={copy.topicsTitle}>
          {jumpLinks.map(([href, label]) => (
            <a
              href={href}
              key={href}
              className={`rounded-[2px] border border-secondary-color px-[17px] py-[11px] font-montserrat text-[12px] font-medium leading-[1.5] text-[#111827] hover:bg-[#03071a] hover:text-white focus-visible:bg-[#03071a] focus-visible:text-white ${link}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-[1240px] px-10 pb-20 max-[760px]:px-[22px] max-[760px]:pb-[50px]">
        {categories.map((category, ci) => {
          const collection = inCategory(category);
          if (!collection.length) return null;
          return (
            <section
              className="scroll-mt-[100px] border-t border-t-secondary-color py-12 max-[760px]:py-8"
              id={category.key}
              key={category.key}
            >
              <header className="mb-7 grid grid-cols-[36px_1fr_auto] items-center gap-4 max-[760px]:grid-cols-[26px_1fr]">
                <p className={`${eyebrow} text-[#4b5563]`}>
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 className={sectionTitle}>
                  {localized(category.label, language)}
                </h2>
                <a
                  href={localizedPath(category.servicePage, language)}
                  className={`${smallLink} max-[760px]:col-start-2`}
                >
                  {copy.serviceLabel} <span aria-hidden="true">↗</span>
                </a>
              </header>
              <div className="grid grid-cols-3 gap-[22px] max-[760px]:grid-cols-1">
                {collection.map((post, ni) => (
                  <article
                    key={post.guide._id}
                    className="flex flex-col border border-t-[3px] border-secondary-color border-t-primary-color bg-white p-7"
                  >
                    <p
                      className="mb-[18px] mt-0 font-crimson text-[24px] italic leading-[normal] text-[#4b5563]"
                      aria-hidden="true"
                    >
                      {String(ni + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mb-[18px] mt-0 font-crimson text-[28px] font-normal leading-[1.17]">
                      <a href={guideLink(post)} className={`hover:underline ${link}`}>
                        {post.title}
                      </a>
                    </h3>
                    <p className="mb-6 font-montserrat text-[13px] leading-[1.9] text-[#4b5563]">
                      {post.description}
                    </p>
                    <a
                      className={`mt-auto font-montserrat text-[12px] font-semibold leading-[1.6] text-[#111827] ${link}`}
                      href={guideLink(post)}
                    >
                      {copy.readLabel} <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        <section
          id="intimate"
          className="mb-[60px] mt-[30px] flex scroll-mt-[100px] items-center justify-between gap-8 bg-[#03071a] p-9 text-white max-[760px]:flex-col max-[760px]:items-start max-[760px]:p-[26px]"
        >
          <div>
            <p className={`${eyebrow} text-[#e4c05c]`}>{copy.intimateEyebrow}</p>
            <h2 className={sectionTitle}>{copy.intimateTitle}</h2>
            <p className="mb-0 mt-[18px] max-w-[700px] font-montserrat text-[14px] leading-[1.9]">
              {copy.intimateText}
            </p>
          </div>
          <a
            href={siteLink(copy.intimateLink?.url, language)}
            className={`min-w-[180px] ${smallLink}`}
          >
            {copy.intimateLink?.label} <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section id="planning-topics">
          <h2 className={sectionTitle}>{copy.topicsTitle}</h2>
          <div className="mt-[30px] grid grid-cols-3 gap-[34px] max-[760px]:grid-cols-1">
            {topics.map((topic) => (
              <section id={`topic-${topic.key}`} key={topic.key}>
                <h3 className="font-crimson text-[25px] font-normal leading-[1.2]">
                  {localized(topic.label, language)}
                </h3>
                <ul className="list-none p-0">
                  {posts
                    .filter((post) =>
                      post.guide.topics?.some((t) => t?.key === topic.key),
                    )
                    .map((post) => (
                      <li
                        key={post.guide._id}
                        className="my-[15px] font-montserrat text-[13px] leading-[1.8]"
                      >
                        <a
                          href={guideLink(post)}
                          className={`underline underline-offset-[3px] ${link}`}
                        >
                          {post.title}
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
