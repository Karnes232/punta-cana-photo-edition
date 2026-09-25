import React from "react";
import RichTextBlock from "./RichTextBlock";
import { hasContentfulCopy } from "./managedText";

const WhatWeDoSection = ({ page, content, managedText, language }) => (
  <section className="bg-white px-6 py-20 md:px-10 md:py-28">
    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#80651f]">
          {content.whatEyebrow}
        </p>
        <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
          {managedText(page?.sectionTitle2, content.whatTitle)}
        </h2>
      </div>
      <div>
        <RichTextBlock
          context={hasContentfulCopy(language) ? page?.paragraph1 : null}
          fallbackParagraphs={content.whatParagraphs}
          fallbackItems={content.whatItems}
        />
      </div>
    </div>
  </section>
);

export default WhatWeDoSection;
