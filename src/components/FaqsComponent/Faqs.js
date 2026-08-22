import React, { useId, useState } from "react";
import uniqueByTitle from "../../hooks/uniqueByTitle";

// WAI-ARIA accordion rather than <details>/<summary>. A real <button> is
// focusable and toggles on Enter/Space, and keeping the panel in the DOM is
// what makes the height animation possible -- <details> hides its children
// when closed, so there is nothing to transition from.
const FaqRow = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div className="border-b border-gray-200 bg-white">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left text-[#48484a]"
        >
          <span className="font-montserrat text-lg leading-snug">
            {question}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="28px"
            height="28px"
            aria-hidden="true"
            focusable="false"
            className={`shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            <path d="M0 0h24v24H0V0z" fill="none" />
          </svg>
        </button>
      </h3>
      {/* 0fr -> 1fr animates the height without needing to know the content
          size. `invisible` when collapsed keeps the answer out of the
          accessibility tree and the tab order, which zero height alone does not. */}
      <div
        id={panelId}
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-4 pt-1 font-montserrat text-base leading-7 text-[#48484a]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Faqs = ({ faqs, title = "FAQ" }) => {
  const uniqueObjects = uniqueByTitle(faqs || []);

  if (!uniqueObjects.length) return null;

  return (
    // xl:w-full matters: the Layout wrapper is a column flex container, and the
    // auto cross-axis margins from xl:mx-auto suppress the default stretch, so
    // without it the section shrink-to-fits and its width jumps when a row opens.
    // Scoped to xl because below that the margins are mx-5/lg:mx-10, and a
    // 100% width alongside them would overflow horizontally.
    <section
      aria-labelledby="faq-heading"
      className="mx-5 lg:mx-10 xl:mx-auto xl:w-full max-w-5xl my-16 md:my-24"
    >
      <h2
        id="faq-heading"
        className="font-crimson font-normal tracking-wide text-3xl md:text-4xl text-[#48482a] text-center mb-10"
      >
        {title}
      </h2>
      <div className="border-t border-gray-200">
        {uniqueObjects.map((item) => (
          <FaqRow
            key={item.title}
            question={item.title}
            answer={item.content?.content}
          />
        ))}
      </div>
    </section>
  );
};

export default Faqs;
