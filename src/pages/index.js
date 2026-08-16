import { graphql } from "gatsby";
import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import HomeExperience from "../components/HomeComponents/HomeExperience";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import { getHomeContent } from "../content/homeContent";
import { buildHomeSchema } from "../utils/homeSeo";

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
  const language = pageContext.language === "es" ? "es" : "en-US";
  const isSpanish = language === "es";
  const copy = getHomeContent(language);
  const seo = data.allContentfulSeo.nodes[0];
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const pageUrl = isSpanish
    ? `${data.site.siteMetadata.siteUrl}/es/`
    : `${data.site.siteMetadata.siteUrl}/`;
  const imageUrl = seo?.images?.file?.url
    ? `https:${seo.images.file.url}`
    : data.allContentfulPageContent.nodes[0]?.heroImageList?.[0]?.file?.url
      ? `https:${data.allContentfulPageContent.nodes[0].heroImageList[0].file.url}`
      : undefined;
  const title =
    seo?.title ||
    (isSpanish
      ? "Planificación Integral de Eventos en Punta Cana | Sertuin Events"
      : "Punta Cana Event Planner & Event Management | Sertuin Events");
  const description =
    seo?.description?.description ||
    (isSpanish
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
        keywords={seo?.keywords?.join(", ")}
        image={imageUrl}
        imageAlt={
          isSpanish
            ? "Evento planificado por Sertuin Events en Punta Cana"
            : "Event planned by Sertuin Events in Punta Cana"
        }
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={isSpanish ? "es" : "en"}
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={isSpanish ? "es_DO" : "en_US"}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
      />
      <link rel="canonical" href={pageUrl} />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${data.site.siteMetadata.siteUrl}/`}
      />
      <link
        rel="alternate"
        hrefLang="es"
        href={`${data.site.siteMetadata.siteUrl}/es/`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${data.site.siteMetadata.siteUrl}/`}
      />
      <meta name="theme-color" content="#000000" />
      <meta name="author" content={generalInfo?.legalName || "SERTUIN SRL"} />
      <meta name="contact" content={generalInfo?.email} />
      <meta name="subject" content={copy.eyebrow} />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery($language: String!) {
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
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 2200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 82
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
    allContentfulServices(filter: { node_locale: { eq: $language } }) {
      nodes {
        typeOfService
        cardDescription
        showOnHome
        homeOrder
        cardImage {
          gatsbyImage(
            layout: CONSTRAINED
            width: 900
            height: 1050
            resizingBehavior: FILL
            formats: [AUTO, WEBP, AVIF]
            placeholder: BLURRED
            quality: 80
          )
          title
        }
        page {
          url
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
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
            resizingBehavior: FILL
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 82
          )
          title
        }
      }
    }
  }
`;
