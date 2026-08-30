import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import CorporateEventPlanner from "../../components/CorporateEventPlanner/CorporateEventPlanner";
import { getCorporateEventContent } from "../../content/corporateEventContent";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

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
  const language = normalizeLanguage(pageContext.language);
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const languageConfig = getLanguageConfig(language);
  const seo = data.allContentfulSeo.nodes[0];
  const page = data.allContentfulPageContent.nodes[0];
  const content = getCorporateEventContent(language, page?.paragraph3?.raw);
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/event-planner/", language);
  const title =
    (isPortuguese || isFrench ? null : seo?.title) ||
    (isPortuguese
      ? "Planejamento de Eventos Corporativos em Punta Cana | Sertuin"
      : isFrench
        ? "Organisation d’Événements d’Entreprise à Punta Cana"
        : isSpanish
          ? "Planificador de eventos corporativos Punta Cana | Sertuin Events"
          : "Corporate Event Planner Punta Cana | Sertuin Events");
  const description =
    (isPortuguese || isFrench ? null : seo?.description?.description) ||
    (isPortuguese
      ? "Planejamento e gestão de eventos corporativos em Punta Cana: venues, fornecedores, equipe, catering, transporte, produção e execução local."
      : isFrench
        ? "Organisation et gestion d’événements d’entreprise à Punta Cana : lieux, prestataires, personnel, restauration, transport, production et exécution locale."
        : isSpanish
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
        name: isPortuguese
          ? "Planejamento e gestão de eventos corporativos em Punta Cana"
          : isFrench
            ? "Organisation et gestion d’événements d’entreprise à Punta Cana"
            : isSpanish
              ? "Planificación y gestión de eventos corporativos en Punta Cana"
              : "Corporate Event Planning and Management in Punta Cana",
        serviceType: isPortuguese
          ? "Gestão de eventos corporativos"
          : isFrench
            ? "Gestion d’événements d’entreprise"
            : isSpanish
              ? "Gestión de eventos corporativos"
              : "Corporate event management",
        url: siteUrl,
        description,
        inLanguage: isPortuguese
          ? "pt-BR"
          : isFrench
            ? "fr-FR"
            : isSpanish
              ? "es-DO"
              : "en-US",
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
          name: isPortuguese
            ? "Serviços de gestão de eventos"
            : isFrench
              ? "Services de gestion d’événements"
              : isSpanish
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
        inLanguage: isPortuguese
          ? "pt-BR"
          : isFrench
            ? "fr-FR"
            : isSpanish
              ? "es-DO"
              : "en-US",
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
            name: isPortuguese
              ? "Início"
              : isFrench
                ? "Accueil"
                : isSpanish
                  ? "Inicio"
                  : "Home",
            item: localizedUrl(rootUrl, "/", language),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isPortuguese
              ? "Eventos corporativos"
              : isFrench
                ? "Événements d’entreprise"
                : isSpanish
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
        keywords={(isPortuguese
          ? [
              "eventos corporativos Punta Cana",
              "planejamento de eventos corporativos Punta Cana",
              "produção de eventos Punta Cana",
              "gestão de eventos empresariais República Dominicana",
            ]
          : isFrench
            ? [
                "événement entreprise Punta Cana",
                "organisation événement entreprise Punta Cana",
                "production événementielle Punta Cana",
                "gestion événement République dominicaine",
              ]
            : seo?.keywords || []
        ).join(", ")}
        image={image}
        imageAlt={
          isPortuguese
            ? "Gestão de evento corporativo da Sertuin Events em Punta Cana"
            : isFrench
              ? "Gestion d’un événement d’entreprise par Sertuin Events à Punta Cana"
              : isSpanish
                ? "Gestión de eventos corporativos de Sertuin Events en Punta Cana"
                : "Sertuin Events corporate event management in Punta Cana"
        }
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/event-planner/" />
    </>
  );
};

export const query = graphql`
  query CorporateEventPlannerPage($contentLanguage: String = "en-US") {
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
        page: { eq: "Event-Planner" }
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
        page: { eq: "Event-Planner" }
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
      filter: {
        page: { eq: "Event-Planner" }
        node_locale: { eq: $contentLanguage }
      }
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
