import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { languageKey, localizedPath } from "../../utils/siteLocales";
import { guideSlug, languageIndex } from "../../utils/blogGuides";

// The Spanish service pages use Spanish wording for these English loanwords,
// which the guides' own titles keep.
const spanishServiceTerms = (title) =>
  title
    .replace(/\bwedding planner\b/gi, "planificadora de bodas")
    .replace(/\bwedding planning\b/gi, "planificación de bodas")
    .replace(/\belopements?\b/gi, "bodas íntimas")
    .replace(/\bgender reveal\b/gi, "revelación de género");

// A service page's related guides: every guide of that event type (Blog Guide
// in Sanity), in its order, titled in the page's language.
export default function ServiceGuides({ cluster, language }) {
  const { allSanityBlogPost } = useStaticQuery(graphql`
    query ServiceGuides {
      allSanityBlogPost {
        nodes {
          language
          title
          guide {
            _id
            order
            slug {
              current
            }
            category {
              key
            }
          }
        }
      }
    }
  `);
  const guides = allSanityBlogPost.nodes
    .filter(
      (post) =>
        post.language === languageKey(language) &&
        post.guide?.category?.key === cluster,
    )
    .sort((a, b) => a.guide.order - b.guide.order);
  const i = languageIndex(language);
  return (
    <section className="mx-auto my-16 w-full max-w-6xl px-5" aria-labelledby="service-guides-title">
      <h2 id="service-guides-title" className="font-crimson text-3xl md:text-4xl text-gray-900">
        {["Our guides to planning your event", "Nuestras guías para planificar tu evento", "Nossos guias para planejar seu evento", "Nos guides pour préparer votre événement"][i]}
      </h2>
      <p className="font-montserrat text-sm text-gray-600 my-4">
        {["We explain the decisions, timing and practical details before you book.", "Te explicamos las decisiones, los tiempos y los detalles prácticos antes de reservar.", "Explicamos as decisões, os prazos e os detalhes práticos antes da reserva.", "Nous expliquons les décisions, les délais et les détails pratiques avant de réserver."][i]}
      </p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 list-none">
        {guides.map((post) => <li key={post.guide._id} className="border border-gray-200 border-t-2 border-t-primary-color p-5">
          <Link className="font-crimson text-2xl text-gray-900 underline underline-offset-4" to={localizedPath(`/blog/${guideSlug(post.guide)}/`, language)}>
            {language === "es" ? spanishServiceTerms(post.title) : post.title}
          </Link>
        </li>)}
      </ul>
    </section>
  );
}
