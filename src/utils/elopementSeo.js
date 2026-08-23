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
  title,
  description: managedDescription,
  experiences: managedExperiences = [],
  faqs: managedFaqs = [],
}) => {
  const copy = getElopementCopy(language);
  const faqs = buildElopementFaqs(language);
  const isSpanish = language === "es";
  const description =
    managedDescription ||
    (isSpanish
      ? "Paquetes de elopement en Punta Cana con playa o catamarán privado, transporte para hasta 10 personas, fotógrafo, bouquet y decoración opcional."
      : "Punta Cana elopement packages with a private beach or catamaran, transportation for up to 10 people, photographer, bouquet and optional décor.");
  const pageName = title || copy.heroTitle;
  const experiences = ELOPEMENT_EXPERIENCES.map((experience) => {
    const matcher =
      experience.id === "beach"
        ? /private beach|beach ceremony|playa privada|ceremonia.*playa/i
        : /catamaran|catamar[aá]n/i;
    const managed = managedExperiences.find((item) =>
      matcher.test(item?.title || ""),
    );
    return managed && Number.isFinite(Number(managed.price))
      ? { ...experience, price: Number(managed.price) }
      : experience;
  });
  const normalizedFaqs = managedFaqs
    .map((item) => [item?.title?.trim(), item?.content?.content?.trim()])
    .filter(([question, answer]) => question && answer);
  const managedFaqsAreCurrent =
    normalizedFaqs.length >= 3 &&
    normalizedFaqs.every(
      ([question, answer]) =>
        !/transport(?:ation)? for two|transporte (?:ida y vuelta )?para dos|non-refundable under all|no se reembolsa bajo ninguna|before boarding|antes de abordar|on arrival|al llegar/i.test(
          `${question} ${answer}`,
        ),
    );

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
        image,
        areaServed: {
          "@type": "City",
          name: "Punta Cana",
          containedInPlace: {
            "@type": "Country",
            name: "Dominican Republic",
          },
        },
        contactPoint: telephone
          ? {
              "@type": "ContactPoint",
              telephone,
              contactType: "customer service",
              areaServed: "DO",
              availableLanguage: ["English", "Spanish"],
            }
          : undefined,
        sameAs: instagram ? [instagram] : undefined,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        description,
        inLanguage: isSpanish ? "es" : "en",
        primaryImageOfPage: image
          ? {
              "@type": "ImageObject",
              contentUrl: image,
            }
          : undefined,
        about: { "@id": `${pageUrl}#service` },
        mainEntity: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Sertuin Events",
        inLanguage: ["en", "es"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: pageName,
        description,
        serviceType: "Elopement wedding planning",
        url: pageUrl,
        image,
        inLanguage: isSpanish ? "es" : "en",
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
          ...experiences.map((experience) => ({
            "@type": "Offer",
            name: copy[experience.id].title,
            description: copy[experience.id].summary,
            category:
              experience.id === "beach"
                ? "Private beach elopement"
                : "Private catamaran elopement",
            price: experience.price,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
            seller: { "@id": `${siteUrl}/#organization` },
            eligibleQuantity:
              experience.id === "catamaran"
                ? {
                    "@type": "QuantitativeValue",
                    minValue: 2,
                    maxValue: 10,
                    unitText: "people",
                  }
                : undefined,
          })),
          ...ELOPEMENT_DECORATIONS.map((decoration) => ({
            "@type": "Offer",
            name: copy.decorNames[decoration.id],
            description: copy.decorDescriptions[decoration.id],
            category: "Elopement wedding décor",
            price: decoration.price,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
            seller: { "@id": `${siteUrl}/#organization` },
          })),
          {
            "@type": "Offer",
            name: copy.legal,
            description: copy.legalText,
            category: "Legal wedding upgrade",
            price: LEGAL_UPGRADE_PRICE,
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: pageUrl,
            seller: { "@id": `${siteUrl}/#organization` },
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
            item: {
              "@type": "WebPage",
              "@id": isSpanish ? `${siteUrl}/es/` : `${siteUrl}/`,
              name: copy.breadcrumbHome,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumbCurrent,
            item: {
              "@type": "WebPage",
              "@id": pageUrl,
              name: copy.breadcrumbCurrent,
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: (managedFaqsAreCurrent ? normalizedFaqs : faqs).map(
          ([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          }),
        ),
      },
    ],
  };
};
