import commercialMetadata from "../../data/commercialMetadata.json";
import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import ContactExperience from "../../components/ContactForm/ContactExperience";
import { useI18next } from "gatsby-plugin-react-i18next";
import { getLanguageConfig, localizedUrl, normalizeLanguage } from "../../utils/siteLocales";

const Index = ({ data, pageContext }) => (
  <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]} overlayHeader>
    <ContactExperience language={pageContext.language} />
  </Layout>
);
export default Index;

export const Head = ({ pageContext, data }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext.language || hookLanguage);
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const languageConfig = getLanguageConfig(language);
  const { images, keywords } =
    data.allContentfulSeo.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/contact/", language);
  const { title, description } = commercialMetadata["/contact/"][language];
  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(isPortuguese
          ? [
              "contato planejador de eventos Punta Cana",
              "cotação evento Punta Cana",
              "Sertuin Events contato",
            ]
          : isFrench
            ? [
                "contacter organisateur événement Punta Cana",
                "devis événement Punta Cana",
                "contact Sertuin Events",
              ]
            : keywords
        ).join(", ")}
        image={`https:${images?.file?.url}`}
        url={siteUrl}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": siteUrl + "#webpage",
          name: title,
          description,
          url: siteUrl,
          inLanguage: languageConfig.htmlLang,
          about: { "@id": rootUrl + "/#organization" },
          isPartOf: { "@id": rootUrl + "/#website" },
        }}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/contact/" />
    </>
  );
};

export const query = graphql`
  query MyQuery($contentLanguage: String = "en-US") {
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
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
        messengerLink
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Contact" }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        title
        keywords
        images {
          file {
            url
          }
        }
        description {
          description
        }
        schema {
          internal {
            content
          }
        }
      }
    }
    allContentfulPageContent(
      filter: { page: { eq: "Contact" }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: NONE
            formats: WEBP
            quality: 65
          )
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        paragraph1 {
          raw
        }
        paragraph2 {
          raw
        }
      }
    }
  }
`;
