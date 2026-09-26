const ORGANIZATION_ID = "https://sertuinevents.com/#organization";

// Structured-data wording per language. It never shows on the page, so it
// stays in code rather than in the Event Planner Page documents.
const LABELS = {
  "en-US": {
    inLanguage: "en-US",
    serviceName: "Corporate Event Planning and Management in Punta Cana",
    serviceType: "Corporate event management",
    catalogName: "Corporate event management services",
    home: "Home",
    breadcrumb: "Corporate Event Planner",
  },
  es: {
    inLanguage: "es-DO",
    serviceName: "Planificación y gestión de eventos corporativos en Punta Cana",
    serviceType: "Gestión de eventos corporativos",
    catalogName: "Servicios de gestión de eventos",
    home: "Inicio",
    breadcrumb: "Eventos corporativos",
  },
  pt: {
    inLanguage: "pt-BR",
    serviceName: "Planejamento e gestão de eventos corporativos em Punta Cana",
    serviceType: "Gestão de eventos corporativos",
    catalogName: "Serviços de gestão de eventos",
    home: "Início",
    breadcrumb: "Eventos corporativos",
  },
  fr: {
    inLanguage: "fr-FR",
    serviceName: "Organisation et gestion d’événements d’entreprise à Punta Cana",
    serviceType: "Gestion d’événements d’entreprise",
    catalogName: "Services de gestion d’événements",
    home: "Accueil",
    breadcrumb: "Événements d’entreprise",
  },
};

// General Layout stores the phone as digits ("18295222900"); schema.org wants
// an international number, written like the other pages' "+1-829-522-2900".
const internationalPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.length === 11 && digits.startsWith("1")
    ? `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`
    : `+${digits}`;
};

export const buildEventPlannerSchema = ({
  pageUrl,
  homeUrl,
  language,
  description,
  image,
  generalInfo,
  services,
  faqs,
}) => {
  const t = LABELS[language] || LABELS["en-US"];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: t.serviceName,
        serviceType: t.serviceType,
        url: pageUrl,
        description,
        inLanguage: t.inLanguage,
        image,
        areaServed: [
          { "@type": "City", name: "Punta Cana" },
          { "@type": "Country", name: "Dominican Republic" },
        ],
        provider: {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: "Sertuin Events",
          url: "https://sertuinevents.com/",
          email: generalInfo?.email || "info@sertuinevents.com",
          telephone: internationalPhone(generalInfo?.telephone),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.catalogName,
          itemListElement: (services || []).map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.title },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: t.inLanguage,
        mainEntity: (faqs || []).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: homeUrl },
          { "@type": "ListItem", position: 2, name: t.breadcrumb, item: pageUrl },
        ],
      },
    ],
  };
};
