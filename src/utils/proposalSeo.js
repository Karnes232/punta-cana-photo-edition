const asAbsoluteUrl = (siteUrl, path) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).href;
};

export const buildProposalSchema = ({
  siteUrl,
  pageUrl,
  language,
  title,
  description,
  image,
  companyName,
  legalName,
  directorName,
  telephone,
  instagram,
  googleMapsUrl,
  packages = [],
  faqs = [],
}) => {
  const rootUrl = siteUrl.replace(/\/$/, "");
  const languagePrefix = language === "es" ? "/es" : "";
  const organizationId = `${rootUrl}/#organization`;
  const websiteId = `${rootUrl}/#website`;
  const webpageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;
  const sameAs = [instagram, googleMapsUrl].filter(Boolean);

  const offerItems = packages.map((proposalPackage) => {
    const packagePath = proposalPackage.packagePage?.urlSlug
      ? `/packages/${proposalPackage.packagePage.urlSlug}/`
      : proposalPackage.link;

    return {
      "@type": "Offer",
      name: proposalPackage.title,
      url: asAbsoluteUrl(rootUrl, packagePath),
      price: proposalPackage.price,
      priceCurrency: "USD",
      itemOffered: {
        "@type": "Service",
        name: proposalPackage.title,
        description: proposalPackage.included?.join(", "),
      },
    };
  });

  const faqEntities = faqs
    .filter((faq) => faq.title && faq.content?.content)
    .map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.content.content,
      },
    }));

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: companyName || "Sertuin Events",
      legalName: legalName || "Sertuin SRL",
      url: rootUrl,
      telephone,
      sameAs,
      description:
        language === "es"
          ? "Empresa dominicana de planificación de eventos ubicada en Punta Cana, dirigida por la wedding planner Grecia Mejía, con más de 10 años de experiencia y más de 1,800 propuestas de matrimonio realizadas. Los clientes comienzan por WhatsApp, teléfono o el formulario."
          : "Dominican event-planning company based in Punta Cana, led by wedding planner Grecia Mejía, with more than 10 years of experience and more than 1,800 marriage proposals created. Clients begin through WhatsApp, phone or the inquiry form.",
      location: {
        "@type": "Place",
        name: "Punta Cana, Dominican Republic",
      },
      areaServed: {
        "@type": "Place",
        name: "Punta Cana, Dominican Republic",
      },
      employee: {
        "@type": "Person",
        name: directorName || "Grecia Mejía",
        jobTitle:
          language === "es"
            ? "Wedding planner y directora de la empresa"
            : "Wedding Planner and Company Director",
        worksFor: { "@id": organizationId },
      },
      contactPoint: telephone
        ? {
            "@type": "ContactPoint",
            telephone,
            contactType: "customer service",
            availableLanguage: ["English", "Spanish"],
          }
        : undefined,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: rootUrl,
      name: companyName || "Sertuin Events",
      publisher: { "@id": organizationId },
      inLanguage: ["en-US", "es"],
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { "@id": websiteId },
      about: { "@id": serviceId },
      primaryImageOfPage: image
        ? {
            "@type": "ImageObject",
            url: image,
          }
        : undefined,
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name:
        language === "es"
          ? "Planificación de propuestas de matrimonio en Punta Cana"
          : "Marriage Proposal Planning in Punta Cana",
      description,
      url: pageUrl,
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "Place", name: "Punta Cana, Dominican Republic" },
        { "@type": "Place", name: "Uvero Alto, Dominican Republic" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:
          language === "es"
            ? "Paquetes de propuestas de Sertuin Events"
            : "Sertuin Events proposal packages",
        itemListElement: offerItems,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: language === "es" ? "Inicio" : "Home",
          item: `${rootUrl}${languagePrefix}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: language === "es" ? "Propuestas" : "Proposals",
          item: pageUrl,
        },
      ],
    },
  ];

  if (faqEntities.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: language,
      mainEntity: faqEntities,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
