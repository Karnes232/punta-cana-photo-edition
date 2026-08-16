const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const buildHomeSchema = ({
  generalInfo,
  language,
  pageUrl,
  pageTitle,
  pageDescription,
  imageUrl,
}) => {
  const isSpanish = language === "es";
  const telephone = "+1-829-522-2900";
  const email = generalInfo?.email || "info@sertuinevents.com";
  const legalName = generalInfo?.legalName || "SERTUIN SRL";
  const taxId = (generalInfo?.rnc || "132199652").replace(/\D/g, "");
  const logoUrl = generalInfo?.logo?.file?.url
    ? `https:${generalInfo.logo.file.url}`
    : "https://sertuinevents.com/icons/icon-512x512.png";
  const hoursAvailable = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAYS.map((day) => `https://schema.org/${day}`),
    opens: "00:00",
    closes: "23:59",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sertuinevents.com/#organization",
        name: "Sertuin Events",
        legalName,
        url: "https://sertuinevents.com/",
        description: isSpanish
          ? "Planificación, diseño, coordinación y gestión integral de eventos en Punta Cana."
          : "Full-service event planning, design, coordination and management in Punta Cana.",
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        image: imageUrl,
        email,
        telephone,
        taxID: taxId,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "RNC",
          value: taxId,
        },
        foundingLocation: {
          "@type": "Place",
          name: "Dominican Republic",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Punta Cana",
          },
          {
            "@type": "Country",
            name: "Dominican Republic",
          },
        ],
        sameAs: [
          generalInfo?.instagram,
          generalInfo?.facebook,
          generalInfo?.x,
        ].filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "event planning inquiries",
          telephone,
          email,
          availableLanguage: ["English", "Spanish"],
          areaServed: "DO",
          hoursAvailable,
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://sertuinevents.com/#website",
        url: "https://sertuinevents.com/",
        name: "Sertuin Events",
        publisher: {
          "@id": "https://sertuinevents.com/#organization",
        },
        inLanguage: ["en", "es"],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#event-planning-service`,
        name: isSpanish
          ? "Planificación y gestión integral de eventos en Punta Cana"
          : "Full-service event planning and management in Punta Cana",
        serviceType: isSpanish
          ? "Planificación, diseño, coordinación, producción y gestión de eventos"
          : "Event planning, design, coordination, production and management",
        description: pageDescription,
        provider: {
          "@id": "https://sertuinevents.com/#organization",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Punta Cana",
          },
          {
            "@type": "Country",
            name: "Dominican Republic",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: isSpanish
            ? "Empresas, parejas y clientes que organizan celebraciones privadas"
            : "Companies, couples and private celebration clients",
        },
        hoursAvailable,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name:
          pageTitle ||
          (isSpanish
            ? "Planificación de Eventos en Punta Cana | Sertuin Events"
            : "Punta Cana Event Planner & Event Management | Sertuin Events"),
        description: pageDescription,
        isPartOf: {
          "@id": "https://sertuinevents.com/#website",
        },
        about: {
          "@id": "https://sertuinevents.com/#organization",
        },
        mainEntity: {
          "@id": `${pageUrl}#event-planning-service`,
        },
        primaryImageOfPage: imageUrl
          ? {
              "@type": "ImageObject",
              url: imageUrl,
            }
          : undefined,
        inLanguage: isSpanish ? "es" : "en",
      },
    ],
  };
};
