import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

const findReference = (context, id) =>
  context?.references?.find((item) => item.contentful_id === id);

const correctConfirmedLanguageClaims = (value) => {
  if (Array.isArray(value)) return value.map(correctConfirmedLanguageClaims);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      if (key === "value" && typeof item === "string") {
        return [
          key,
          item
            .replace(
              "Sertuin Events communicates in English, Spanish and French as needed",
              "Sertuin Events guarantees planning and coordination in English and Spanish",
            )
            .replace(
              "Sertuin Events se comunica en inglés, español y francés cuando es necesario",
              "Sertuin Events garantiza planificación y coordinación en inglés y español",
            ),
        ];
      }
      return [key, correctConfirmedLanguageClaims(item)];
    }),
  );
};

const BlogBody = ({ context }) => {
  if (!context?.raw) return null;
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const image = findReference(context, node.data.target.sys.id);
        if (!image?.url) return null;
        return (
          <figure>
            <img
              src={`${image.url}?w=1200&fm=webp&q=78`}
              srcSet={`${image.url}?w=640&fm=webp&q=78 640w, ${image.url}?w=960&fm=webp&q=78 960w, ${image.url}?w=1200&fm=webp&q=78 1200w`}
              sizes="(min-width: 1024px) 900px, 100vw"
              width={image.width}
              height={image.height}
              alt={image.description || ""}
              loading="lazy"
              decoding="async"
            />
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const external = /^https?:\/\//i.test(node.data.uri);
        return (
          <a
            href={node.data.uri}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
  };

  let document;
  try {
    document = correctConfirmedLanguageClaims(JSON.parse(context.raw));
  } catch {
    return null;
  }
  return (
    <section className="blog-article-content">
      {documentToReactComponents(document, options)}
    </section>
  );
};

export default BlogBody;

