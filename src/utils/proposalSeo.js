const asAbsoluteUrl = (siteUrl, path) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).href;
};

const asLocalizedPackagePath = (proposalPackage, language) => {
  const languagePrefix =
    language === "es"
      ? "/es"
      : language === "pt"
        ? "/pt"
        : language === "fr"
          ? "/fr"
          : "";
  const slug = proposalPackage.packagePage?.urlSlug?.trim();

  if (slug) return `${languagePrefix}/packages/${slug}/`;

  const path = proposalPackage.link;
  if (!languagePrefix || !path || /^https?:\/\//i.test(path)) return path;
  if (path.startsWith(`${languagePrefix}/`)) return path;
  return path.startsWith("/")
    ? `${languagePrefix}${path}`
    : `${languagePrefix}/${path}`;
};

const buildOrganization = ({
  rootUrl,
  language,
  organizationId,
  companyName,
  legalName,
  directorName,
  telephone,
  instagram,
  googleMapsUrl,
}) => {
  const sameAs = [instagram, googleMapsUrl].filter(Boolean);

  return {
    "@type": "Organization",
    "@id": organizationId,
    name: companyName || "Sertuin Events",
    legalName: legalName || "Sertuin SRL",
    url: rootUrl,
    telephone,
    sameAs,
    description:
      language === "pt"
        ? "Empresa dominicana de planejamento de eventos em Punta Cana, dirigida pela wedding planner Grecia Mejía, com mais de 10 anos de experiência e mais de 1.800 pedidos de casamento realizados. Os clientes podem começar pelo WhatsApp, telefone ou formulário."
        : language === "fr"
          ? "Entreprise dominicaine d’organisation d’événements basée à Punta Cana, dirigée par la wedding planner Grecia Mejía, avec plus de 10 ans d’expérience et plus de 1 800 demandes en mariage réalisées. Les clients peuvent commencer sur WhatsApp, par téléphone ou avec le formulaire."
          : language === "es"
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
        language === "pt"
          ? "Wedding planner e diretora da empresa"
          : language === "fr"
            ? "Wedding planner et directrice de l’entreprise"
            : language === "es"
              ? "Wedding planner y directora de la empresa"
              : "Wedding Planner and Company Director",
      worksFor: { "@id": organizationId },
    },
    contactPoint: telephone
      ? {
          "@type": "ContactPoint",
          telephone,
          contactType: "customer service",
          availableLanguage: ["English", "Spanish", "Portuguese", "French"],
        }
      : undefined,
  };
};

const buildWebsite = ({ rootUrl, websiteId, organizationId, companyName }) => ({
  "@type": "WebSite",
  "@id": websiteId,
  url: rootUrl,
  name: companyName || "Sertuin Events",
  publisher: { "@id": organizationId },
  inLanguage: ["en-US", "es", "pt-BR", "fr-FR"],
});

const buildImageObjects = ({ images, pageUrl, language, packageName }) => {
  const seen = new Set();

  return images
    .map((image, index) => {
      const contentUrl = asAbsoluteUrl(
        pageUrl,
        typeof image === "string" ? image : image?.file?.url || image?.url,
      );
      if (!contentUrl || seen.has(contentUrl)) return null;
      seen.add(contentUrl);

      const fallback =
        language === "pt"
          ? `${packageName}: montagem de pedido de casamento em Uvero Alto, Punta Cana`
          : language === "fr"
            ? `${packageName} : installation de demande en mariage à Uvero Alto, Punta Cana`
            : language === "es"
              ? `${packageName}: montaje de propuesta de matrimonio en Uvero Alto, Punta Cana`
              : `${packageName}: marriage proposal setup in Uvero Alto, Punta Cana`;

      return {
        "@type": "ImageObject",
        "@id": `${pageUrl}#image-${index + 1}`,
        contentUrl,
        url: contentUrl,
        name: image?.title || fallback,
        caption: image?.description || image?.title || fallback,
        inLanguage:
          language === "pt" ? "pt-BR" : language === "fr" ? "fr-FR" : language,
        representativeOfPage: seen.size === 1,
      };
    })
    .filter(Boolean);
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
  const languagePrefix =
    language === "es"
      ? "/es"
      : language === "pt"
        ? "/pt"
        : language === "fr"
          ? "/fr"
          : "";
  const schemaLanguage =
    language === "pt" ? "pt-BR" : language === "fr" ? "fr-FR" : language;
  const organizationId = `${rootUrl}/#organization`;
  const websiteId = `${rootUrl}/#website`;
  const webpageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;
  const offerCatalogId = `${pageUrl}#offer-catalog`;

  const offerItems = packages.map((proposalPackage) => {
    const packagePath = asLocalizedPackagePath(proposalPackage, language);
    const packageUrl = asAbsoluteUrl(rootUrl, packagePath);

    return {
      "@type": "Offer",
      "@id": `${packageUrl}#offer`,
      name: proposalPackage.title,
      url: packageUrl,
      price: proposalPackage.price,
      priceCurrency: "USD",
      seller: { "@id": organizationId },
      itemOffered: {
        "@type": "Service",
        "@id": `${packageUrl}#service`,
        name: proposalPackage.title,
        url: packageUrl,
        provider: { "@id": organizationId },
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
    buildOrganization({
      rootUrl,
      language,
      organizationId,
      companyName,
      legalName,
      directorName,
      telephone,
      instagram,
      googleMapsUrl,
    }),
    buildWebsite({ rootUrl, websiteId, organizationId, companyName }),
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: title,
      description,
      inLanguage: schemaLanguage,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": serviceId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
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
        language === "pt"
          ? "Planejamento de pedidos de casamento em Punta Cana"
          : language === "fr"
            ? "Organisation de demandes en mariage à Punta Cana"
            : language === "es"
              ? "Planificación de propuestas de matrimonio en Punta Cana"
              : "Marriage Proposal Planning in Punta Cana",
      description,
      url: pageUrl,
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "Place", name: "Punta Cana, Dominican Republic" },
        { "@type": "Place", name: "Uvero Alto, Dominican Republic" },
      ],
      mainEntityOfPage: { "@id": webpageId },
      hasOfferCatalog: { "@id": offerCatalogId },
    },
    {
      "@type": "OfferCatalog",
      "@id": offerCatalogId,
      name:
        language === "pt"
          ? "Pacotes de pedido de casamento da Sertuin Events"
          : language === "fr"
            ? "Forfaits de demande en mariage de Sertuin Events"
            : language === "es"
              ? "Paquetes de propuestas de Sertuin Events"
              : "Sertuin Events proposal packages",
      numberOfItems: offerItems.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: offerItems,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name:
            language === "pt"
              ? "Início"
              : language === "fr"
                ? "Accueil"
                : language === "es"
                  ? "Inicio"
                  : "Home",
          item: `${rootUrl}${languagePrefix}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name:
            language === "pt"
              ? "Pedidos de casamento"
              : language === "fr"
                ? "Demandes en mariage"
                : language === "es"
                  ? "Propuestas"
                  : "Proposals",
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
      inLanguage: schemaLanguage,
      mainEntity: faqEntities,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const buildProposalPackageSchema = ({
  siteUrl,
  pageUrl,
  proposalPageUrl,
  language,
  packageName,
  description,
  price,
  images = [],
  companyName,
  legalName,
  directorName,
  telephone,
  instagram,
  googleMapsUrl,
  faqs = [],
}) => {
  const rootUrl = siteUrl.replace(/\/$/, "");
  const languagePrefix =
    language === "es"
      ? "/es"
      : language === "pt"
        ? "/pt"
        : language === "fr"
          ? "/fr"
          : "";
  const schemaLanguage =
    language === "pt" ? "pt-BR" : language === "fr" ? "fr-FR" : language;
  const organizationId = `${rootUrl}/#organization`;
  const websiteId = `${rootUrl}/#website`;
  const proposalWebpageId = `${proposalPageUrl}#webpage`;
  const proposalServiceId = `${proposalPageUrl}#service`;
  const webpageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const imageObjects = buildImageObjects({
    images,
    pageUrl,
    language,
    packageName,
  });
  const imageReferences = imageObjects.map((image) => ({
    "@id": image["@id"],
  }));
  const faqEntities = faqs
    .filter((faq) => faq?.title && faq?.content?.content)
    .map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.content.content,
      },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization({
        rootUrl,
        language,
        organizationId,
        companyName,
        legalName,
        directorName,
        telephone,
        instagram,
        googleMapsUrl,
      }),
      buildWebsite({ rootUrl, websiteId, organizationId, companyName }),
      {
        "@type": "WebPage",
        "@id": proposalWebpageId,
        url: proposalPageUrl,
        name:
          language === "pt"
            ? "Pacotes de pedido de casamento em Punta Cana"
            : language === "fr"
              ? "Forfaits de demande en mariage à Punta Cana"
              : language === "es"
                ? "Paquetes de propuestas de matrimonio en Punta Cana"
                : "Marriage proposal packages in Punta Cana",
        inLanguage: schemaLanguage,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": proposalServiceId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,
        name: packageName,
        description,
        inLanguage: schemaLanguage,
        isPartOf: { "@id": proposalWebpageId },
        mainEntity: { "@id": serviceId },
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: imageReferences[0],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: packageName,
        description,
        url: pageUrl,
        serviceType:
          language === "pt"
            ? "Pacote de pedido de casamento em Punta Cana"
            : language === "fr"
              ? "Forfait de demande en mariage à Punta Cana"
              : language === "es"
                ? "Paquete de propuesta de matrimonio en Punta Cana"
                : "Punta Cana marriage proposal package",
        category:
          language === "pt"
            ? "Pedidos de casamento em Punta Cana"
            : language === "fr"
              ? "Demandes en mariage à Punta Cana"
              : language === "es"
                ? "Propuestas de matrimonio en Punta Cana"
                : "Marriage proposals in Punta Cana",
        provider: { "@id": organizationId },
        areaServed: [
          { "@type": "Place", name: "Punta Cana, Dominican Republic" },
          { "@type": "Place", name: "Uvero Alto, Dominican Republic" },
        ],
        isRelatedTo: { "@id": proposalServiceId },
        mainEntityOfPage: { "@id": webpageId },
        offers: { "@id": offerId },
        image: imageReferences,
      },
      {
        "@type": "Offer",
        "@id": offerId,
        name: packageName,
        url: pageUrl,
        price,
        priceCurrency: "USD",
        seller: { "@id": organizationId },
        itemOffered: { "@id": serviceId },
      },
      ...imageObjects,
      ...(faqEntities.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              url: pageUrl,
              inLanguage: schemaLanguage,
              mainEntity: faqEntities,
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name:
              language === "pt"
                ? "Início"
                : language === "fr"
                  ? "Accueil"
                  : language === "es"
                    ? "Inicio"
                    : "Home",
            item: `${rootUrl}${languagePrefix}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name:
              language === "pt"
                ? "Pedidos de casamento"
                : language === "fr"
                  ? "Demandes en mariage"
                  : language === "es"
                    ? "Propuestas de matrimonio"
                    : "Marriage proposals",
            item: proposalPageUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: packageName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
};
