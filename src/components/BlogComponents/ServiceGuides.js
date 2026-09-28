import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { languageKey, localizedPath } from "../../utils/siteLocales";
import { guideSlug } from "../../utils/blogGuides";

// A service page's related guides: every guide of that event type (Blog Guide
// in Sanity), in its order, in the page's language. The heading and intro come
// from the Blog Page document; each guide shows its "Title on service pages"
// if it has one.
export default function ServiceGuides({ cluster, language }) {
  const { allSanityBlogPage, allSanityBlogPost } = useStaticQuery(graphql`
    query ServiceGuides {
      allSanityBlogPage {
        nodes {
          language
          serviceGuidesTitle
          serviceGuidesIntro
        }
      }
      allSanityBlogPost {
        nodes {
          language
          title
          serviceTitle
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
        post.guide?.category?.key === cluster &&
        guideSlug(post.guide),
    )
    .sort((a, b) => a.guide.order - b.guide.order);
  const copy =
    allSanityBlogPage.nodes.find((page) => page.language === languageKey(language)) || {};
  // No guides for this service: no empty section.
  if (!guides.length) return null;
  return (
    <section className="mx-auto my-16 w-full max-w-6xl px-5" aria-labelledby="service-guides-title">
      <h2 id="service-guides-title" className="font-crimson text-3xl md:text-4xl text-gray-900">
        {copy.serviceGuidesTitle}
      </h2>
      <p className="font-montserrat text-sm text-gray-600 my-4">
        {copy.serviceGuidesIntro}
      </p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 list-none">
        {guides.map((post) => <li key={post.guide._id} className="border border-gray-200 border-t-2 border-t-primary-color p-5">
          <Link className="font-crimson text-2xl text-gray-900 underline underline-offset-4" to={localizedPath(`/blog/${guideSlug(post.guide)}/`, language)}>
            {post.serviceTitle || post.title}
          </Link>
        </li>)}
      </ul>
    </section>
  );
}
