import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import WeddingPlannerExperience from "../../components/WeddingPlanner/WeddingPlannerExperience";
import {
  getWeddingPlannerContent,
  normalizeWeddingFaqs,
} from "../../content/weddingPlannerContent";
import { buildWeddingPlannerSchema } from "../../utils/weddingPlannerSeo";

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
  const language = pageContext.language;
  const isSpanish = language === "es";
  const content = getWeddingPlannerContent(language);
  const seo = data.allContentfulSeo.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = `${rootUrl}${isSpanish ? "/es" : ""}/puntacana-wedding-planner/`;
  const title =
    seo?.title ||
    (isSpanish
      ? "Wedding Planner en Punta Cana | Planificación Completa"
      : "Punta Cana Wedding Planner | Full Planning & Coordination");
  const description =
    seo?.description?.description ||
    (isSpanish
      ? "Wedding planning en Punta Cana con paquetes claros, asistencia 24/7 y experiencia en bodas de destino, multiculturales y del sudeste asiático."
      : "Punta Cana wedding planning with clear packages, 24/7 support, and expertise in destination, multicultural and South Asian weddings.");
  const image = seo?.images?.file?.url
    ? `${seo.images.file.url.startsWith("//") ? "https:" : ""}${seo.images.file.url}`
    : undefined;
  const cmsPackages = data.allContentfulWeddingPackages.nodes;
  const hasSouthAsian = cmsPackages.some((item) =>
    /south asian|sudeste asi[aá]tico|indian|sikh/i.test(item?.title || ""),
  );
  const packages = hasSouthAsian
    ? cmsPackages
    : [...cmsPackages, content.packages.fallbackSouthAsian];
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
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={
          isSpanish
            ? "Boda de destino organizada por Sertuin Events en Punta Cana"
            : "Destination wedding planned by Sertuin Events in Punta Cana"
        }
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={isSpanish ? "es" : "en"}
        siteName="Sertuin Events"
        locale={isSpanish ? "es_DO" : "en_US"}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={pageUrl} />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${rootUrl}/puntacana-wedding-planner/`}
      />
      <link
        rel="alternate"
        hrefLang="es"
        href={`${rootUrl}/es/puntacana-wedding-planner/`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${rootUrl}/puntacana-wedding-planner/`}
      />
    </>
  );
};

export const query = graphql`
  query WeddingPlannerPage($language: String!) {
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
        node_locale: { eq: $language }
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
        node_locale: { eq: $language }
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
        node_locale: { eq: $language }
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
    allContentfulWeddingPackages(filter: { node_locale: { eq: $language } }) {
      nodes {
        title
        description
        includedItems
        price
        mostPopular
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
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
