import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { PortableText } from "@portabletext/react";
import React from "react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { openCookieSettings } from "../components/CookieConsent/consent";
import { getLanguageConfig, localizedUrl, normalizeLanguage } from "../utils/siteLocales";

// Privacy policy, terms and cookie policy: one Sanity document per page per
// language. gatsby-node passes the document's id and the page's address.
const pageOf = (data) =>
  data.sanityPrivacyPolicyPage || data.sanityTermsPage || data.sanityCookiePolicyPage;

const components = {
  block: {
    normal: ({ children }) => <p className="mt-4 leading-8">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 font-crimson text-3xl font-medium text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-montserrat text-base font-semibold text-black">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const external = /^https?:\/\//.test(value?.href || "");
      return (
        <a
          href={value?.href}
          className="text-primary-color underline underline-offset-2 hover:text-black"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

const LegalPage = ({ data, pageContext }) => {
  const { t } = useTranslation();
  const page = pageOf(data);
  const language = normalizeLanguage(pageContext.language);
  const updated =
    page?.lastUpdated &&
    new Intl.DateTimeFormat(getLanguageConfig(language).htmlLang, {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(page.lastUpdated));

  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <main className="bg-secondary-bg-color px-6 py-24 md:px-10">
        <article className="mx-auto w-full max-w-3xl bg-white p-8 font-montserrat text-base text-gray-700 shadow-xl md:p-14">
          <h1 className="font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
            {page?.title}
          </h1>
          {updated && (
            <p className="mt-4 text-sm text-gray-500">
              {t("Last updated")}: {updated}
            </p>
          )}
          {pageContext.kind === "cookies" && (
            <button
              type="button"
              onClick={openCookieSettings}
              className="mt-6 inline-flex bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary-color hover:text-black"
            >
              {t("Cookie settings")}
            </button>
          )}
          <div className="mt-6">
            <PortableText value={page?._rawBody || []} components={components} />
          </div>
        </article>
      </main>
    </Layout>
  );
};

export default LegalPage;

export const Head = ({ pageContext, data }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext.language || hookLanguage);
  const languageConfig = getLanguageConfig(language);
  const page = pageOf(data);
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, pageContext.basePath, language);
  return (
    <>
      <Seo
        title={page?.seo?.title}
        description={page?.seo?.description}
        keywords={(page?.seo?.keywords || []).join(", ")}
        url={siteUrl}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": siteUrl + "#webpage",
          name: page?.seo?.title,
          description: page?.seo?.description,
          url: siteUrl,
          inLanguage: languageConfig.htmlLang,
          dateModified: page?.lastUpdated,
          isPartOf: { "@id": rootUrl + "/#website" },
        }}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path={pageContext.basePath} />
    </>
  );
};

export const query = graphql`
  query LegalPageQuery($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
      email
      facebook
      instagram
      x
      telephone
      messengerLink
    }
    sanityPrivacyPolicyPage(_id: { eq: $id }) {
      ...LegalPageFields
    }
    sanityTermsPage(_id: { eq: $id }) {
      ...LegalPageFields
    }
    sanityCookiePolicyPage(_id: { eq: $id }) {
      ...LegalPageFields
    }
  }

  fragment LegalPageFields on Node {
    ... on SanityPrivacyPolicyPage {
      title
      lastUpdated
      _rawBody
      seo {
        title
        description
        keywords
      }
    }
    ... on SanityTermsPage {
      title
      lastUpdated
      _rawBody
      seo {
        title
        description
        keywords
      }
    }
    ... on SanityCookiePolicyPage {
      title
      lastUpdated
      _rawBody
      seo {
        title
        description
        keywords
      }
    }
  }
`;
