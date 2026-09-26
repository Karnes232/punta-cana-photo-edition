import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout/Layout";

// One 404 page serves every missing URL, so the language comes from the path
// (/es/…, /pt/…, /fr/…) rather than the page context. All four Sanity 404
// documents are small, so the page loads them all and picks one.
const LANGUAGES = {
  es: { home: "/es/", htmlLang: "es" },
  pt: { home: "/pt/", htmlLang: "pt-BR" },
  fr: { home: "/fr/", htmlLang: "fr-FR" },
  en: { home: "/", htmlLang: "en" },
};

const languageFromPath = (pathname = "") =>
  ["es", "pt", "fr"].find((code) => pathname.startsWith(`/${code}/`)) || "en";

const pageFor = (data, language) => {
  const pages = data.allSanityNotFoundPage.nodes;
  return (
    pages.find((page) => page.language === language) ||
    pages.find((page) => page.language === "en")
  );
};

const NotFoundPage = ({ data, location }) => {
  const language = languageFromPath(location?.pathname);
  const page = pageFor(data, language);

  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <main className="flex min-h-[72vh] items-center bg-secondary-bg-color px-6 py-24 md:px-10">
        <div className="mx-auto w-full max-w-4xl border-l-4 border-primary-color bg-white p-8 shadow-xl md:p-14">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-primary-color">
            404
          </p>
          <h1 className="mt-4 font-crimson text-5xl font-medium leading-tight text-black md:text-7xl">
            {page?.heading}
          </h1>
          <p className="mt-6 max-w-2xl font-montserrat text-base leading-8 text-gray-700 md:text-lg">
            {page?.body}
          </p>
          <Link
            to={LANGUAGES[language].home}
            className="mt-8 inline-flex bg-black px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-white no-underline transition hover:bg-primary-color hover:text-black"
          >
            {page?.buttonLabel}
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = ({ data, location }) => {
  const language = languageFromPath(location?.pathname);
  const page = pageFor(data, language);

  return (
    <>
      <html lang={LANGUAGES[language].htmlLang} />
      <title>{page?.seoTitle}</title>
      <meta name="description" content={page?.seoDescription} />
      <meta name="robots" content="noindex,follow" />
    </>
  );
};

export const query = graphql`
  query NotFoundPageQuery {
    # The navbar and footer translate their labels through i18next.
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
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      facebook
      email
      instagram
      messengerLink
      x
      telephone
    }
    allSanityNotFoundPage {
      nodes {
        language
        heading
        body
        buttonLabel
        seoTitle
        seoDescription
      }
    }
  }
`;
