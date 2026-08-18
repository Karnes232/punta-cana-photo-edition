const ORGANIZATION_ID = "https://sertuinevents.com/#organization";

export const buildGenderRevealSchema = ({
  pageUrl,
  language,
  title,
  description,
  image,
  faqs,
}) => {
  const isSpanish = language === "es";
  const homeUrl = `https://sertuinevents.com${isSpanish ? "/es/" : "/"}`;
  const serviceName = isSpanish
    ? "Planificación de gender reveal en Punta Cana"
    : "Punta Cana gender reveal planning";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sertuin Events",
        legalName: "SERTUIN SRL",
        taxID: "132199652",
        url: "https://sertuinevents.com/",
        telephone: "+1-829-522-2900",
        email: "info@sertuinevents.com",
        logo: {
          "@type": "ImageObject",
          url: "https://sertuinevents.com/icons/icon-512x512.png",
        },
        areaServed: {
          "@type": "Place",
          name: "Punta Cana, Dominican Republic",
        },
        knowsLanguage: ["English", "Spanish"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+1-829-522-2900",
          email: "info@sertuinevents.com",
          availableLanguage: ["English", "Spanish"],
        },
        openingHoursSpecification: {
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
        sameAs: [
          "https://www.facebook.com/sertuinevents",
          "https://www.instagram.com/sertuinevents/",
          "https://x.com/sertuinevents",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: isSpanish ? "es-DO" : "en-US",
        about: { "@id": `${pageUrl}#service` },
        primaryImageOfPage: image
          ? { "@type": "ImageObject", url: image }
          : undefined,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        serviceType: serviceName,
        url: pageUrl,
        description,
        image,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: {
          "@type": "Place",
          name: "Punta Cana, Dominican Republic",
        },
        audience: {
          "@type": "Audience",
          audienceType: isSpanish
            ? "Familias que planifican una revelación de género"
            : "Families planning a gender reveal",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          servicePhone: {
            "@type": "ContactPoint",
            telephone: "+1-829-522-2900",
            email: "info@sertuinevents.com",
            availableLanguage: ["English", "Spanish"],
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isSpanish ? "Inicio" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: serviceName,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: (faqs || []).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ].map((item) =>
      Object.fromEntries(
        Object.entries(item).filter(([, value]) => value !== undefined),
      ),
    ),
  };
};
