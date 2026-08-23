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
          availableLanguage: ["English", "Spanish"],
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
        jobTitle: isSpanish
          ? "Wedding planner principal"
          : "Lead Wedding Planner",
        worksFor: { "@id": organizationId },
        description: isSpanish
          ? "Wedding planner en Punta Cana con 10 años de experiencia en bodas de destino, multiculturales y del sur de Asia."
          : "Punta Cana wedding planner with 10 years of experience in destination, multicultural and South Asian weddings.",
        knowsAbout: [
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
        name: isSpanish
          ? "Wedding planning en Punta Cana"
          : "Punta Cana Wedding Planning",
        serviceType: [
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
          name: isSpanish
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
        inLanguage: isSpanish ? "es-DO" : "en-US",
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
            name: isSpanish ? "Inicio" : "Home",
            item: isSpanish
              ? "https://sertuinevents.com/es/"
              : "https://sertuinevents.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isSpanish
              ? "Wedding Planner en Punta Cana"
              : "Punta Cana Wedding Planner",
            item: pageUrl,
          },
        ],
      },
    ],
  };
};
