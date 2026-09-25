import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Check } from "lucide-react";
import React from "react";

const CheckIcon = () => (
  <Check
    aria-hidden="true"
    className="mt-0.5 shrink-0 text-primary-color"
    size={18}
  />
);

const options = {
  renderMark: {
    [MARKS.BOLD]: (children) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    [MARKS.ITALIC]: (children) => <em>{children}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mt-5 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h3 className="mt-8 font-crimson text-3xl font-medium text-black">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mt-7 font-crimson text-2xl font-medium text-black">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="mt-8 grid gap-4 md:grid-cols-3">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="flex items-start gap-3 bg-white px-5 py-5 font-montserrat text-sm font-semibold leading-6 text-gray-800">
        <CheckIcon />
        <span>{children}</span>
      </li>
    ),
  },
};

// Renders a Contentful rich-text field, or the repo fallback copy when the
// field is empty (always the case for Portuguese and French).
const RichTextBlock = ({ context, fallbackParagraphs, fallbackItems }) => {
  if (context?.raw) {
    return documentToReactComponents(JSON.parse(context.raw), options);
  }

  return (
    <>
      {fallbackParagraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-5 font-montserrat text-base leading-8 text-gray-700 md:text-lg"
        >
          {paragraph}
        </p>
      ))}
      {fallbackItems?.length > 0 && (
        <ul className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {fallbackItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-white px-5 py-5 font-montserrat text-sm font-semibold leading-6 text-gray-800"
            >
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RichTextBlock;
