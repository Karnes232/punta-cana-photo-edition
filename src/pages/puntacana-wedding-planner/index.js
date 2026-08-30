import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import WeddingPlannerExperience from "../../components/WeddingPlanner/WeddingPlannerExperience";
import {
  ensureSingleSouthAsianWeddingPackage,
  getWeddingPlannerContent,
  localizeFrenchWeddingPackage,
  localizePortugueseWeddingPackage,
  normalizeWeddingFaqs,
} from "../../content/weddingPlannerContent";
import { buildWeddingPlannerSchema } from "../../utils/weddingPlannerSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

const WeddingPlannerPage = ({ data, pageContext }) => {
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <WeddingPlannerExperience
        page={data.allContentfulPageContent.nodes[0]}
        galleries={data.allContentfulPhotoGallery.nodes}
        packages={data.allContentfulWeddingPackages.nodes}
        faqs={data.allContentfulFaqsComponent.nodes}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
    </Layout>
  );
};

export default WeddingPlannerPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const languageConfig = getLanguageConfig(language);
  const content = getWeddingPlannerContent(language);
  const seo = data.allContentfulSeo.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(
    rootUrl,
    "/puntacana-wedding-planner/",
    language,
  );
  // Keep the Spanish result linguistically distinct from the English page.
  // Search Console showed the Spanish URL receiving more impressions for the
  // English query "wedding planner punta cana" than the English URL.
  const title = isPortuguese
    ? "Wedding Planner em Punta Cana | Planejamento Completo"
    : isFrench
      ? "Wedding Planner à Punta Cana | Organisation Complète"
      : isSpanish
        ? "Planificación de Bodas en Punta Cana | Servicio Completo"
        : seo?.title ||
          "Punta Cana Wedding Planner | Full Planning & Coordination";
  const description = isPortuguese
    ? "Planejamento de casamentos de destino em Punta Cana com pacotes claros, assistência 24 horas e experiência multicultural e sul-asiática."
    : isFrench
      ? "Organisation de mariages de destination à Punta Cana avec forfaits clairs, assistance 24 h/24 et expertise multiculturelle et sud-asiatique."
      : isSpanish
        ? "Planificamos bodas de destino en Punta Cana con paquetes claros, asistencia 24/7 y experiencia en celebraciones multiculturales y del sur de Asia."
        : seo?.description?.description ||
          "Punta Cana wedding planning with clear packages, 24/7 support, and expertise in destination, multicultural and South Asian weddings.";
  const image = seo?.images?.file?.url
    ? `${seo.images.file.url.startsWith("//") ? "https:" : ""}${seo.images.file.url}`
    : undefined;
  const cmsPackages = data.allContentfulWeddingPackages.nodes.map((item) =>
    isPortuguese
      ? localizePortugueseWeddingPackage(
          item,
          content.packages.fallbackSouthAsian,
        )
      : isFrench
        ? localizeFrenchWeddingPackage(
            item,
            content.packages.fallbackSouthAsian,
          )
        : item,
  );
  const packages = ensureSingleSouthAsianWeddingPackage(
    cmsPackages,
    content.packages.fallbackSouthAsian,
  );
  const faqs = normalizeWeddingFaqs(
    data.allContentfulFaqsComponent.nodes,
    language,
  );
  const schemaMarkup = buildWeddingPlannerSchema({
    pageUrl,
    language,
    title,
    description,
    image,
    packages,
    faqs,
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(isPortuguese
          ? [
              "wedding planner Punta Cana",
              "planejamento de casamento Punta Cana",
              "casamento de destino Punta Cana",
              "casamento sul-asiático Punta Cana",
            ]
          : isFrench
            ? [
                "wedding planner Punta Cana",
                "organisation mariage Punta Cana",
                "mariage de destination Punta Cana",
                "mariage sud-asiatique Punta Cana",
              ]
            : seo?.keywords || []
        ).join(", ")}
        image={image}
        imageAlt={
          isPortuguese
            ? "Casamento de destino planejado pela Sertuin Events em Punta Cana"
            : isFrench
              ? "Mariage de destination organisé par Sertuin Events à Punta Cana"
              : isSpanish
                ? "Boda de destino organizada por Sertuin Events en Punta Cana"
                : "Destination wedding planned by Sertuin Events in Punta Cana"
        }
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates
        rootUrl={rootUrl}
        path="/puntacana-wedding-planner/"
      />
    </>
  );
};

export const query = graphql`
  query WeddingPlannerPage($contentLanguage: String = "en-US") {
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
        email
        facebook
        instagram
        messengerLink
        telephone
        x
      }
    }
    allContentfulSeo(
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $contentLanguage }
      }
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
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 1800
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 82
          )
          title
          description
        }
        heroHeading
        heroHeading2
        heroEyebrow
        sectionTitle
        primaryCtaLabel
        primaryCtaUrl
        secondaryCtaLabel
        secondaryCtaUrl
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
    allContentfulPhotoGallery(
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $contentLanguage }
      }
      sort: { section: ASC }
    ) {
      nodes {
        page
        title
        section
        images {
          url
          width
          height
          title
          description
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
    allContentfulWeddingPackages(
      filter: { node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        title
        description
        includedItems
        price
        mostPopular
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $contentLanguage } }
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
