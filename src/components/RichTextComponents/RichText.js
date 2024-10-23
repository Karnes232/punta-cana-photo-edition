import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import TextComponent from "./TextComponent";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const RichText = ({ context }) => {
  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => {
        return (
          <SyntaxHighlighter language="javascript" style={monokai}>
            {text}
          </SyntaxHighlighter>
        );
      },
      [MARKS.BOLD]: (text) => {
        return <span className="font-bold">{text}</span>;
      },
      [MARKS.ITALIC]: (text) => {
        return <span className="italic">{text}</span>;
      },
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <TextComponent
          title={children}
          heading="h1"
          className="my-5 2xl:mb-2 2xl:mt-10 text-3xl md:text-4xl text-center"
        />
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <TextComponent
          title={children}
          heading="h2"
          className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
        />
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <TextComponent
          title={children}
          heading="h3"
          className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
        />
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <TextComponent
          title={children}
          heading="h4"
          className="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
        />
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <TextComponent
          title={children}
          heading="h5"
          className="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl text-center"
        />
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <TextComponent
          title={children}
          heading="h6"
          className="my-5 2xl:mb-2 2xl:mt-10 text-lg md:text-xl text-center"
        />
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <TextComponent paragraph={children} pClassName="mb-4" />
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc ml-5">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal ml-5">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li className="text-sm ">{children}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <div className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
          <svg
            className="mb-4 h-6 w-6 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          {children}
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        let image = null;
        context.references.forEach((imageData) => {
          if (imageData.contentful_id === node.data.target.sys.id) {
            image = imageData;
          }
        });
        const imageGatsby = getImage(image.gatsbyImage);
        return (
          <div className="flex justify-center items-center lg:justify-start">
            <GatsbyImage
              image={imageGatsby}
              alt={image.title}
              className="rounded-lg w-[20rem] mb-4 lg:w-[30rem]"
            />
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <a href={node.data.uri} className="italic underline text-blue-600">
            {children}
          </a>
        );
      },
    },
  };
  const textDocument = documentToReactComponents(
    JSON.parse(context.raw),
    options,
  );
  return (
    <>
      <div className="flex flex-col max-w-5xl mx-5 lg:p-2 xl:mx-auto">
        {textDocument}
      </div>
    </>
  );
};

export default RichText;
