const compact = (values) => values.filter(Boolean);

const organizationNode = ({ image, generalInfo }) => ({
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://sertuinevents.com/#organization",
  name: "Sertuin Events",
  url: "https://sertuinevents.com/",
  image,
  logo: image,
  description:
    "Full-service event planning, design, décor, rentals and coordination for romantic, private and corporate events in Punta Cana.",
  telephone: generalInfo?.telephone || "+1 829 522 2900",
  email: "info@sertuinevents.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Punta Cana",
    addressRegion: "La Altagracia",
    addressCountry: "DO",
  },
  areaServed: ["Punta Cana", "Bávaro", "Cap Cana", "Uvero Alto", "Miches"],
  sameAs: compact([
    generalInfo?.facebook,
    generalInfo?.instagram,
    generalInfo?.x,
  ]),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: generalInfo?.telephone || "+1 829 522 2900",
    email: "info@sertuinevents.com",
    contactType: "sales",
    availableLanguage: ["en", "es"],
  },
});

export const buildHomeSchema = ({ image, generalInfo }) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationNode({ image, generalInfo }),
    {
      "@type": "WebSite",
      "@id": "https://sertuinevents.com/#website",
      url: "https://sertuinevents.com/",
      name: "Sertuin Events",
      publisher: { "@id": "https://sertuinevents.com/#organization" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "Service",
      "@id": "https://sertuinevents.com/#event-planning",
      name: "Event Planning in Punta Cana",
      serviceType: "Full-service event planning and production",
      provider: { "@id": "https://sertuinevents.com/#organization" },
      areaServed: "Punta Cana, Dominican Republic",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Event services",
        itemListElement: [
          "Marriage proposals and elopements",
          "Wedding planning",
          "Private celebrations",
          "Corporate events and MICE",
          "Event design, décor, floristry and rentals",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
});

export const buildEventPlannerSchema = ({ image, generalInfo, url }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${url}#service`,
  name: "Corporate Event Planning in Punta Cana",
  description:
    "Venue sourcing, transportation, décor, rentals, audiovisual production, entertainment and on-site coordination for corporate events in Punta Cana.",
  url,
  image,
  provider: organizationNode({ image, generalInfo }),
  areaServed: "Punta Cana, Dominican Republic",
  serviceType: "Corporate event planning and production",
});
