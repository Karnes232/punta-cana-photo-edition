import { Check } from "lucide-react";
import React from "react";

const WhatWeDoSection = ({ home }) => {
  const items = home.whatItems || [];

  return (
    <section className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#80651f]">
            {home.whatEyebrow}
          </p>
          <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
            {home.whatTitle}
          </h2>
        </div>
        <div>
          {(home.whatParagraphs || []).map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 font-montserrat text-base leading-8 text-gray-700 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
          {items.length > 0 && (
            <ul className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-white px-5 py-5 font-montserrat text-sm font-semibold leading-6 text-gray-800"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-primary-color"
                    size={18}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
