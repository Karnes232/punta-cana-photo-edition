import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import CorporateEventPlanner from "../../components/CorporateEventPlanner/CorporateEventPlanner";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// Copy, photos and SEO come from this language's Event Planner Page document
// in Sanity; phone and email from General Layout.
const EventPlannerPage = ({ data, pageContext }) => {
  const generalInfo = data.sanityGeneralLayout;

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <CorporateEventPlanner
        page={data.sanityEventPlannerPage || {}}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
      <ServiceGuides cluster="corporate" language={pageContext.language} />
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
  const page = data.sanityEventPlannerPage || {};
  const seo = page.seo;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/event-planner/", language);
  const title = seo?.title;
  const description = seo?.description;
  const image = shareImageUrl(seo?.image?.asset?.url);
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
          telephone: data.sanityGeneralLayout?.telephone,
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
          itemListElement: (page.services || []).map((service) => ({
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
        mainEntity: (page.faqs || []).map((faq) => ({
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
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={seo?.image?.alt}
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
  query CorporateEventPlannerPage($sanityLanguage: String = "en") {
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
      email
      facebook
      instagram
      messengerLink
      telephone
      x
    }
    sanityEventPlannerPage(language: { eq: $sanityLanguage }) {
      heroImage {
        alt
        asset {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      eyebrow
      heroHeading
      heroSubheading
      servicesLine
      primaryCtaLabel
      whatsappCtaLabel
      whatsappMessage
      trustItems
      introTitle
      introBody
      workModesTitle
      workModesIntro
      workModes {
        _key
        title
        description
        bestFor
      }
      servicesTitle
      servicesIntro
      services {
        _key
        icon
        title
        description
      }
      processTitle
      processIntro
      processSteps {
        _key
        title
        body
      }
      budgetEyebrow
      budgetTitle
      budgetBody
      budgetPoints
      budgetChangeTitle
      budgetChangeBody
      onsiteImage {
        alt
        asset {
          gatsbyImageData(width: 1000, placeholder: BLURRED)
        }
      }
      onsiteEyebrow
      onsiteTitle
      onsiteBody
      onsitePoints
      caseStudiesTitle
      caseStudiesIntro
      caseStudies {
        _key
        client
        title
        facts
        description
        videoUrl
        images {
          _key
          alt
          asset {
            gatsbyImageData(width: 1000, placeholder: BLURRED)
          }
        }
      }
      whyTitle
      whyItems {
        _key
        icon
        title
        description
      }
      eventTypesTitle
      eventTypes
      venueEyebrow
      venueTitle
      resortTitle
      resortBody
      independentTitle
      independentBody
      venueClosing
      faqTitle
      faqs {
        _key
        question
        answer
      }
      formEyebrow
      formTitle
      formIntro
      formSubmitLabel
      seo {
        title
        description
        keywords
        image {
          alt
          asset {
            url
          }
        }
      }
    }
  }
`;
