import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import CorporateEventPlanner from "../../components/CorporateEventPlanner/CorporateEventPlanner";
import { getCorporateEventContent } from "../../content/corporateEventContent";

const EventPlannerPage = ({ data, pageContext }) => {
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const page = data.allContentfulPageContent.nodes[0];
  const gallery = data.allContentfulPhotoGallery.nodes[0];
  const carousel = data.allContentfulSwiperCarousel.nodes[0];

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <CorporateEventPlanner
        page={page}
        gallery={gallery}
        carousel={carousel}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
    </Layout>
  );
};

export default EventPlannerPage;

export const Head = ({ pageContext, data }) => {
  const isSpanish = pageContext.language === "es";
  const seo = data.allContentfulSeo.nodes[0];
  const page = data.allContentfulPageContent.nodes[0];
  const content = getCorporateEventContent(
    pageContext.language,
    page?.paragraph3?.raw,
  );
  const siteUrl = `${data.site.siteMetadata.siteUrl}${isSpanish ? "/es" : ""}/event-planner/`;
  const title =
    seo?.title ||
    (isSpanish
      ? "Planificador de eventos corporativos Punta Cana | Sertuin Events"
      : "Corporate Event Planner Punta Cana | Sertuin Events");
  const description =
    seo?.description?.description ||
    (isSpanish
      ? "Planificación y gestión de eventos corporativos en Punta Cana. Coordinamos proveedores, personal, catering, logística, producción y ejecución en sitio."
      : "Corporate event planning and management in Punta Cana. Sertuin coordinates vendors, staffing, catering, logistics, production and on-site execution.");
  const image = seo?.images?.file?.url
    ? `https:${seo.images.file.url}`
    : undefined;
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}#service`,
        name: isSpanish
          ? "Planificación y gestión de eventos corporativos en Punta Cana"
          : "Corporate Event Planning and Management in Punta Cana",
        serviceType: isSpanish
          ? "Gestión de eventos corporativos"
          : "Corporate event management",
        url: siteUrl,
        description,
        image,
        areaServed: [
          { "@type": "City", name: "Punta Cana" },
          { "@type": "Country", name: "Dominican Republic" },
        ],
        provider: {
          "@type": "Organization",
          "@id": "https://sertuinevents.com/#organization",
          name: "Sertuin Events",
          url: "https://sertuinevents.com/",
          email: "info@sertuinevents.com",
          telephone: data.allContentfulGeneralLayout.nodes[0]?.telephone,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isSpanish
            ? "Servicios de gestión de eventos"
            : "Corporate event management services",
          itemListElement: content.services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.title },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isSpanish ? "Inicio" : "Home",
            item: isSpanish
              ? "https://sertuinevents.com/es/"
              : "https://sertuinevents.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isSpanish
              ? "Eventos corporativos"
              : "Corporate Event Planner",
            item: siteUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={
          isSpanish
            ? "Gestión de eventos corporativos de Sertuin Events en Punta Cana"
            : "Sertuin Events corporate event management in Punta Cana"
        }
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={isSpanish ? "es" : "en"}
        siteName="Sertuin Events"
        locale={isSpanish ? "es_DO" : "en_US"}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={siteUrl} />
      <link
        rel="alternate"
        hrefLang="en"
        href="https://sertuinevents.com/event-planner/"
      />
      <link
        rel="alternate"
        hrefLang="es"
        href="https://sertuinevents.com/es/event-planner/"
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://sertuinevents.com/event-planner/"
      />
    </>
  );
};

export const query = graphql`
  query CorporateEventPlannerPage($language: String!) {
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
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
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
        }
        heroHeading
        heroHeading2
        sectionTitle
        sectionTitle2
        videoUrl
        paragraph3 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        images {
          url
          width
          height
          title
          gatsbyImage(
            layout: CONSTRAINED
            width: 1000
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 78
          )
        }
      }
    }
    allContentfulSwiperCarousel(filter: { page: { eq: "Event-Planner" } }) {
      nodes {
        page
        images {
          url
          title
          gatsbyImage(
            layout: CONSTRAINED
            width: 1000
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 78
          )
        }
      }
    }
  }
`;
