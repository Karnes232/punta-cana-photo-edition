import { graphql } from "gatsby";
import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import HomeExperience from "../components/HomeComponents/HomeExperience";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { getHomeContent } from "../content/homeContent";
import { buildHomeSchema } from "../utils/homeSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";

const IndexPage = ({ data }) => {
  const { language } = useI18next();
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const page = data.allContentfulPageContent.nodes[0];

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <HomeExperience
        page={page}
        services={data.allContentfulServices.nodes}
        featureCard={data.allContentfulCardWithImage.nodes[0]}
        generalInfo={generalInfo}
        language={language}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const languageConfig = getLanguageConfig(language);
  const copy = getHomeContent(language);
  const seo = data.allContentfulSeo.nodes[0];
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(rootUrl, "/", language);
  const imageUrl = seo?.images?.file?.url
    ? `https:${seo.images.file.url}`
    : data.allContentfulPageContent.nodes[0]?.heroImageList?.[0]?.file?.url
      ? `https:${data.allContentfulPageContent.nodes[0].heroImageList[0].file.url}`
      : undefined;
  const title =
    (isPortuguese ? null : seo?.title) ||
    (isPortuguese
      ? "Planejamento de Eventos em Punta Cana | Sertuin Events"
      : isSpanish
        ? "Planificación Integral de Eventos en Punta Cana | Sertuin Events"
        : "Punta Cana Event Planner & Event Management | Sertuin Events");
  const description =
    (isPortuguese ? null : seo?.description?.description) ||
    (isPortuguese
      ? "Planejamento completo de eventos em Punta Cana para empresas, casamentos de destino, pedidos de casamento e celebrações, do conceito à execução."
      : isSpanish
        ? "Planificación y gestión integral de eventos en Punta Cana para empresas, bodas de destino y celebraciones privadas, desde el concepto hasta la ejecución."
        : "Full-service event planning in Punta Cana for corporate events, destination weddings and private celebrations, from concept through on-site execution.");
  const schemaMarkup = buildHomeSchema({
    generalInfo,
    language,
    pageUrl,
    pageTitle: title,
    pageDescription: description,
    imageUrl,
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(isPortuguese
          ? [
              "planejamento de eventos Punta Cana",
              "organização de eventos Punta Cana",
              "wedding planner Punta Cana",
              "pedido de casamento Punta Cana",
              "eventos corporativos Punta Cana",
            ]
          : seo?.keywords || []
        ).join(", ")}
        image={imageUrl}
        imageAlt={
          isPortuguese
            ? "Evento planejado pela Sertuin Events em Punta Cana"
            : isSpanish
              ? "Evento planificado por Sertuin Events en Punta Cana"
              : "Event planned by Sertuin Events in Punta Cana"
        }
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={language === "en-US" ? "es_DO" : "en_US"}
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/" />
      <meta name="theme-color" content="#000000" />
      <meta name="author" content={generalInfo?.legalName || "SERTUIN SRL"} />
      <meta name="contact" content={generalInfo?.email} />
      <meta name="subject" content={copy.eyebrow} />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery($contentLanguage: String = "en-US") {
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
    allContentfulGeneralLayout(
      filter: { node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        companyName
        legalName
        rnc
        email
        facebook
        instagram
        x
        telephone
        messengerLink
        availability
        logo {
          file {
            url
          }
        }
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Index" }, node_locale: { eq: $contentLanguage } }
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
      }
    }
    allContentfulPageContent(
      filter: { page: { eq: "Index" }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 2200
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 70
          )
          file {
            url
          }
          title
        }
        heroEyebrow
        heroHeading
        heroHeading2
        primaryCtaLabel
        primaryCtaUrl
        secondaryCtaLabel
        secondaryCtaUrl
        sectionTitle
        sectionTitle2
        contactEyebrow
        contactHeading
        contactBody
        paragraph1 {
          raw
        }
        paragraph2 {
          raw
        }
        paragraph3 {
          raw
        }
      }
    }
    allContentfulServices(
      filter: {
        node_locale: { eq: $contentLanguage }
        page: {
          url: {
            nin: ["/event-rentals/", "/birthday-celebrations/", "/floral-art/"]
          }
        }
      }
    ) {
      nodes {
        typeOfService
        cardDescription
        showOnHome
        homeOrder
        cardImage {
          # Cards sit in a sm:grid-cols-2 lg:grid-cols-4 grid, so they are
          # ~320px wide on desktop and ~364px on mobile - nowhere near the 900
          # this used to request. The matching sizes value is applied in
          # HomeExperience's ServiceCard; the Contentful resolver ignores a
          # sizes argument here.
          gatsbyImage(
            layout: CONSTRAINED
            width: 460
            height: 537
            formats: [AUTO, WEBP]
            placeholder: BLURRED
            quality: 80
            outputPixelDensities: [0.5, 1, 2]
          )
          title
        }
        page {
          url
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Index" }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        title
        secondaryTitle
        paragraph
        buttonText
        linkUrl
        image {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            height: 1300
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 82
          )
          title
        }
      }
    }
  }
`;
