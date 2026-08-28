import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";

const { isPublishedBlogSlug } = require("../../data/publishedBlogSlugs");

const BlogIndex = ({ data, pageContext }) => {
  const isSpanish = pageContext.language === "es";
  const prefix = isSpanish ? "/es" : "";
  const posts = (data.allContentfulBlogPost.nodes || []).filter(({ slug }) =>
    isPublishedBlogSlug(slug),
  );

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <main className="bg-white px-5 py-24 text-[#03061a] md:px-10 md:py-32">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-montserrat text-xs uppercase tracking-[0.28em] text-[#a95f13]">
            Sertuin Events
          </p>
          <h1 className="mt-4 font-crimson text-5xl leading-tight md:text-7xl">
            {isSpanish
              ? "Blog de eventos en Punta Cana"
              : "Punta Cana Event Blog"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-montserrat text-base leading-8 text-slate-600 md:text-lg">
            {isSpanish
              ? "Guías claras para planificar bodas, propuestas, elopements, eventos corporativos y celebraciones en Punta Cana."
              : "Clear guides for planning weddings, proposals, elopements, corporate events and celebrations in Punta Cana."}
          </p>
        </header>

        {posts.length > 0 ? (
          <section
            className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3"
            aria-label={isSpanish ? "Artículos del blog" : "Blog articles"}
          >
            {posts.map((post) => {
              const slug = post.slug.trim();
              const image = post.galleryImages?.[0];

              return (
                <article
                  key={`${post.id}-${post.node_locale}`}
                  className="overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {image?.image?.url && image.altText && (
                    <img
                      src={`${image.image.url}?w=900&fm=webp&q=72`}
                      srcSet={`${image.image.url}?w=480&fm=webp&q=72 480w, ${image.image.url}?w=900&fm=webp&q=72 900w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      width={image.image.width}
                      height={image.image.height}
                      alt={image.altText}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <div className="p-7">
                    <h2 className="font-crimson text-3xl leading-tight">
                      <Link to={`${prefix}/blog/${slug}/`}>{post.title}</Link>
                    </h2>
                    {post.description && (
                      <p className="mt-4 font-montserrat text-sm leading-7 text-slate-600">
                        {post.description}
                      </p>
                    )}
                    <Link
                      to={`${prefix}/blog/${slug}/`}
                      className="mt-6 inline-block font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#a95f13]"
                    >
                      {isSpanish ? "Leer artículo" : "Read article"} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <p className="mx-auto mt-16 max-w-2xl border border-slate-200 p-8 text-center font-montserrat text-slate-600">
            {isSpanish
              ? "Estamos preparando nuevas guías. Vuelve pronto."
              : "We are preparing new guides. Please check back soon."}
          </p>
        )}
      </main>
    </Layout>
  );
};

export default BlogIndex;

export const Head = ({ data, pageContext }) => {
  const isSpanish = pageContext.language === "es";
  const baseUrl = data.site.siteMetadata.siteUrl;
  const pageUrl = `${baseUrl}${isSpanish ? "/es" : ""}/blog/`;
  const hasPosts = data.allContentfulBlogPost.nodes.some(({ slug }) =>
    isPublishedBlogSlug(slug),
  );
  const title = isSpanish
    ? "Blog de Eventos en Punta Cana | Sertuin Events"
    : "Punta Cana Event Planning Blog | Sertuin Events";
  const description = isSpanish
    ? "Guías para planificar bodas, propuestas, elopements, eventos corporativos y celebraciones en Punta Cana."
    : "Guides for planning weddings, proposals, elopements, corporate events and celebrations in Punta Cana.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={pageUrl}
        language={isSpanish ? "es" : "en"}
        siteName="Sertuin Events"
        locale={isSpanish ? "es_DO" : "en_US"}
      />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/blog/`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es/blog/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/blog/`} />
      {!hasPosts && <meta name="robots" content="noindex, follow" />}
    </>
  );
};

export const query = graphql`
  query BlogIndexQuery($language: String!) {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout(filter: { node_locale: { eq: $language } }) {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
        messengerLink
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: $language } }
      sort: { updatedAt: DESC }
    ) {
      nodes {
        id
        node_locale
        title
        slug
        description
        updatedAt
        galleryImages {
          altText
          image {
            url
            width
            height
          }
        }
      }
    }
  }
`;
