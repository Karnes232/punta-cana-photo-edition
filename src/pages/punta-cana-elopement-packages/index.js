import React from "react";
import { graphql } from "gatsby";

import ElopementExperience from "../../components/ElopementComponents/ElopementExperience";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import heroImage from "../../images/elopement/huppa.webp";
import { buildElopementSchema } from "../../utils/elopementSeo";

const Index = ({ data, pageContext }) => {
  const language = pageContext.language === "es" ? "es" : "en-US";

  return (
    <Layout
      generalInfo={data.allContentfulGeneralLayout.nodes[0]}
      overlayHeader
    >
      <ElopementExperience
        language={language}
        page={data.allContentfulPageContent.nodes[0]}
        packages={data.allContentfulPackages.nodes}
        galleries={data.allContentfulPhotoGallery.nodes}
        faqs={data.allContentfulFaqsComponent.nodes}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ data, pageContext }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = pageContext.language === "es" ? "es" : "en-US";
  const languagePrefix = language === "es" ? "/es" : "";
  const pageUrl = `${rootUrl}${languagePrefix}/punta-cana-elopement-packages/`;
  const englishUrl = `${rootUrl}/punta-cana-elopement-packages/`;
  const spanishUrl = `${rootUrl}/es/punta-cana-elopement-packages/`;
  const seo = data.allContentfulSeo.nodes[0];
  const title =
    seo?.title ||
    (language === "es"
      ? "Paquetes de Elopement en Punta Cana | Sertuin Events"
      : "Punta Cana Elopement Packages | Sertuin Events");
  const description =
    seo?.description?.description ||
    (language === "es"
      ? "Paquetes de elopement en Punta Cana desde US$999. Playa o catamarán privado, transporte para dos, fotógrafo y decoración elegible. Boda legal +US$1,200."
      : "Punta Cana elopement packages from US$999. Private beach or catamaran, transportation for two, photographer and selectable décor. Legal wedding +US$1,200.");
  const cmsImage = seo?.images?.file?.url;
  const absoluteImage = cmsImage
    ? `${cmsImage.startsWith("//") ? "https:" : ""}${cmsImage}`
    : `${rootUrl}${heroImage}`;
  const imageAlt =
    language === "es"
      ? "Decoración tropical para una boda elopement en la playa de Punta Cana"
      : "Tropical décor for a Punta Cana beach elopement wedding";
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const schemaMarkup = buildElopementSchema({
    siteUrl: rootUrl,
    pageUrl,
    language,
    image: absoluteImage,
    companyName: generalInfo.companyName,
    telephone: generalInfo.telephone,
    instagram: generalInfo.instagram,
    title,
    description,
    experiences: data.allContentfulPackages.nodes,
    faqs: data.allContentfulFaqsComponent.nodes,
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(seo?.keywords || []).join(", ")}
        image={absoluteImage}
        imageAlt={imageAlt}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={language === "es" ? "es" : "en"}
        robots="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={language === "es" ? "es_DO" : "en_US"}
        alternateLocale={language === "es" ? "en_US" : "es_DO"}
      />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="es" href={spanishUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
    </>
  );
};

export const query = graphql`
  query ElopementPageQuery($language: String!) {
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
      filter: { page: { eq: "Elopement" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Elopement" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 1800
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 80
          )
          file {
            url
          }
          title
        }
        heroHeading
        heroHeading2
        heroEyebrow
        sectionTitle
        sectionTitle2
        primaryCtaLabel
        primaryCtaUrl
        secondaryCtaLabel
        secondaryCtaUrl
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
    allContentfulPackages(
      filter: { page: { eq: "Elopement" }, node_locale: { eq: $language } }
      sort: { price: ASC }
    ) {
      nodes {
        id
        title
        paragraph
        included
        price
        image {
          title
          gatsbyImage(
            layout: CONSTRAINED
            width: 900
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 78
          )
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Elopement" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        images {
          id
          title
          gatsbyImage(
            layout: CONSTRAINED
            width: 1100
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 78
          )
        }
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Elopement" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        content {
          content
        }
      }
    }
  }
`;
