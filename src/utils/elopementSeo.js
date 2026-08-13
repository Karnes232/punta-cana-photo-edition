import {
  ELOPEMENT_DECORATIONS,
  ELOPEMENT_EXPERIENCES,
  LEGAL_UPGRADE_PRICE,
  buildElopementFaqs,
  getElopementCopy,
} from "../components/ElopementComponents/ElopementExperience";

export const buildElopementSchema = ({
  siteUrl,
  pageUrl,
  language,
  image,
  companyName,
  telephone,
  instagram,
}) => {
  const copy = getElopementCopy(language);
  const faqs = buildElopementFaqs(language);
  const isSpanish = language === "es";
  const description = isSpanish
    ? "Paquetes de elopement en Punta Cana con playa o catamarán privado, transporte para dos, fotógrafo, bouquet y decoración elegible."
    : "Punta Cana elopement packages with a private beach or catamaran, transportation for two, photographer, bouquet and selectable décor.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: companyName || "Sertuin Events",
        legalName: "Sertuin SRL",
        url: siteUrl,
        telephone,
        sameAs: instagram ? [instagram] : undefined,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.heroTitle,
        description,
        inLanguage: isSpanish ? "es" : "en",
        primaryImageOfPage: image
          ? {
              "@type": "ImageObject",
              contentUrl: image,
            }
          : undefined,
        about: { "@id": `${pageUrl}#service` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Sertuin Events",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: copy.heroTitle,
        description,
        serviceType: "Elopement wedding planning",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: {
          "@type": "City",
          name: "Punta Cana",
          containedInPlace: {
            "@type": "Country",
            name: "Dominican Republic",
          },
        },
        offers: [
          ...ELOPEMENT_EXPERIENCES.map((experience) => ({
            "@type": "Offer",
            name: copy[experience.id].title,
            price: experience.price,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
          })),
          ...ELOPEMENT_DECORATIONS.map((decoration) => ({
            "@type": "Offer",
            name: copy.decorNames[decoration.id],
            price: decoration.price,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
          })),
          {
            "@type": "Offer",
            name: copy.legal,
            price: LEGAL_UPGRADE_PRICE,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: isSpanish ? `${siteUrl}/es/` : `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumbCurrent,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };
};
