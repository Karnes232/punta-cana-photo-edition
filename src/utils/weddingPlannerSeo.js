export const buildWeddingPlannerSchema = ({
  pageUrl,
  language,
  title,
  description,
  image,
  packages,
  faqs,
}) => {
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const organizationId = "https://sertuinevents.com/#organization";
  const serviceId = `${pageUrl}#service`;
  const normalizedPackages = (packages || []).filter(
    (item) => item?.title && Number.isFinite(Number(item?.price)),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Sertuin Events",
        legalName: "SERTUIN SRL",
        taxID: "132199652",
        url: "https://sertuinevents.com/",
        email: "info@sertuinevents.com",
        telephone: "+18295222900",
        sameAs: ["https://www.instagram.com/sertuinevents/"],
        areaServed: [
          { "@type": "City", name: "Punta Cana" },
          { "@type": "Country", name: "Dominican Republic" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+18295222900",
          email: "info@sertuinevents.com",
          availableLanguage: ["English", "Spanish", "Portuguese", "French"],
          hoursAvailable: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${pageUrl}#grecia-mejia`,
        name: "Grecia Mejía",
        jobTitle: isPortuguese
          ? "Wedding planner principal"
          : isFrench
            ? "Wedding planner principale"
            : isSpanish
              ? "Planificadora de bodas principal"
              : "Lead Wedding Planner",
        worksFor: { "@id": organizationId },
        description: isPortuguese
          ? "Wedding planner em Punta Cana com 10 anos de experiência em casamentos de destino, multiculturais e sul-asiáticos."
          : isFrench
            ? "Wedding planner à Punta Cana avec 10 ans d’expérience en mariages de destination, multiculturels et sud-asiatiques."
            : isSpanish
              ? "Planificadora de bodas en Punta Cana con 10 años de experiencia en bodas de destino, multiculturales y del sur de Asia."
              : "Punta Cana wedding planner with 10 years of experience in destination, multicultural and South Asian weddings.",
        knowsAbout: isPortuguese
          ? [
              "Planejamento de casamentos de destino",
              "Casamentos sul-asiáticos",
              "Casamentos multiculturais",
              "Venues para casamento em Punta Cana",
              "Coordenação de fornecedores para casamento",
            ]
          : isFrench
            ? [
                "Organisation de mariages de destination",
                "Mariages sud-asiatiques",
                "Mariages multiculturels",
                "Lieux de mariage à Punta Cana",
                "Coordination des prestataires de mariage",
              ]
            : isSpanish
              ? [
                  "Planificación de bodas de destino",
                  "Bodas del sur de Asia",
                  "Bodas multiculturales",
                  "Locaciones para bodas en Punta Cana",
                  "Coordinación de proveedores para bodas",
                ]
              : [
                  "Destination wedding planning",
                  "South Asian weddings",
                  "Multicultural weddings",
                  "Punta Cana wedding venues",
                  "Wedding vendor coordination",
                ],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: isPortuguese
          ? "Planejamento de casamentos em Punta Cana"
          : isFrench
            ? "Organisation de mariages à Punta Cana"
            : isSpanish
              ? "Planificación de bodas en Punta Cana"
              : "Punta Cana Wedding Planning",
        serviceType: isPortuguese
          ? [
              "Planejamento de casamento de destino",
              "Planejamento de casamento sul-asiático",
              "Planejamento de casamento multicultural",
              "Coordenação do dia do casamento",
            ]
          : isFrench
            ? [
                "Organisation de mariage de destination",
                "Organisation de mariage sud-asiatique",
                "Organisation de mariage multiculturel",
                "Coordination du jour J",
              ]
            : isSpanish
              ? [
                  "Planificación de bodas de destino",
                  "Planificación de bodas del sur de Asia",
                  "Planificación de bodas multiculturales",
                  "Coordinación del día de la boda",
                ]
              : [
                  "Destination wedding planning",
                  "South Asian wedding planning",
                  "Multicultural wedding planning",
                  "Wedding day coordination",
                ],
        url: pageUrl,
        description,
        image,
        areaServed: {
          "@type": "City",
          name: "Punta Cana",
          containedInPlace: { "@type": "Country", name: "Dominican Republic" },
        },
        provider: { "@id": organizationId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isPortuguese
            ? "Pacotes de planejamento de casamento"
            : isFrench
              ? "Forfaits d’organisation de mariage"
              : isSpanish
                ? "Paquetes de planificación de bodas"
                : "Wedding planning packages",
          itemListElement: normalizedPackages.map((item) => ({
            "@type": "Offer",
            name: item.title,
            price: Number(item.price),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.description,
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: isSpanish
          ? "es-DO"
          : isPortuguese
            ? "pt-BR"
            : isFrench
              ? "fr-FR"
              : "en-US",
        about: { "@id": serviceId },
        primaryImageOfPage: image
          ? { "@type": "ImageObject", url: image }
          : undefined,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: (faqs || []).map((faq) => ({
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
            item: isPortuguese
              ? "https://sertuinevents.com/pt/"
              : isFrench
                ? "https://sertuinevents.com/fr/"
                : isSpanish
                  ? "https://sertuinevents.com/es/"
                  : "https://sertuinevents.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isPortuguese
              ? "Wedding Planner em Punta Cana"
              : isFrench
                ? "Wedding Planner à Punta Cana"
                : isSpanish
                  ? "Planificación de Bodas en Punta Cana"
                  : "Punta Cana Wedding Planner",
            item: pageUrl,
          },
        ],
      },
    ],
  };
};
