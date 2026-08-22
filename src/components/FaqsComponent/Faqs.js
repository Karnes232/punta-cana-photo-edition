import React from "react";
import uniqueByTitle from "../../hooks/uniqueByTitle";

// Built on native <details>/<summary> rather than react-faq-component, which
// rendered role="list" on a <section> (not a permitted role there), put
// role="button" on a div with no tabindex so the rows could not be opened by
// keyboard at all, and set an invalid alt attribute on a div. <summary> is
// focusable and toggles on Enter/Space with no JavaScript.
const Faqs = ({ faqs, title = "FAQ" }) => {
  const uniqueObjects = uniqueByTitle(faqs || []);

  if (!uniqueObjects.length) return null;

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-5 lg:mx-10 xl:mx-auto max-w-5xl my-16 md:my-24"
    >
      <h2
        id="faq-heading"
        className="font-crimson font-normal tracking-wide text-3xl md:text-4xl text-[#48482a] text-center mb-10"
      >
        {title}
      </h2>
      <div className="border-t border-gray-200">
        {uniqueObjects.map((item) => (
          <details
            key={item.title}
            className="group border-b border-gray-200 bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-4 text-[#48484a] [&::-webkit-details-marker]:hidden">
              <span className="font-montserrat text-lg leading-snug">
                {item.title}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="28px"
                height="28px"
                aria-hidden="true"
                focusable="false"
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                <path d="M0 0h24v24H0V0z" fill="none" />
              </svg>
            </summary>
            <div className="px-3 pb-4 pt-1 font-montserrat text-base leading-7 text-[#48484a]">
              {item.content?.content}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
