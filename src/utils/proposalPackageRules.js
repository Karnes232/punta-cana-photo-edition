import { getProposalPackageDetails } from "../data/proposalPackageDetails";

const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const ADD_ON_TYPES = [
  {
    key: "videographer",
    price: 399,
    en: "Professional video with drone",
    es: "Video profesional con dron",
    pt: "Vídeo profissional com drone",
    fr: "Vidéo professionnelle avec drone",
    patterns: [
      /videograph/,
      /videograf/,
      /professional video/,
      /video profesional/,
      /cinematic video/,
      /video cinematografico/,
      /cameraman/,
      /camera operator/,
      /drone/,
    ],
  },
  {
    key: "violin",
    price: 399,
    en: "Live violinist",
    es: "Violinista en vivo",
    pt: "Violinista ao vivo",
    fr: "Violoniste en direct",
    patterns: [/violin/],
  },
  {
    key: "saxophone",
    price: 399,
    en: "Live saxophonist",
    es: "Saxofonista en vivo",
    pt: "Saxofonista ao vivo",
    fr: "Saxophoniste en direct",
    patterns: [/sax/],
  },
  {
    key: "dinner",
    price: 299,
    en: "Romantic dinner for two",
    es: "Cena romántica para dos",
    pt: "Jantar romântico para dois",
    fr: "Dîner romantique pour deux",
    patterns: [/dinner/, /cena/],
  },
  {
    key: "cold-sparks",
    price: 150,
    en: "Two cold-spark machines",
    es: "Dos máquinas de chispas frías",
    pt: "Duas máquinas de faíscas frias",
    fr: "Deux machines à étincelles froides",
    patterns: [/cold.?spark/, /chispa.*fria/],
  },
];

const KNOWN_PROPOSAL_NAMES = [
  "infinity love",
  "amor infinito",
  "golden whisper",
  "amour essence",
  "sign of love",
  "amour by the sea",
  "coral passion",
  "romantic hoopa",
  "white serenity",
  "romantic dinner marriage proposal",
  "cozy love",
  "eternal passion",
];

const categoryFor = (value) => {
  const normalized = normalize(value);
  return ADD_ON_TYPES.find((type) =>
    type.patterns.some((pattern) => pattern.test(normalized)),
  );
};

export const isProposalPackage = (packageInformation) => {
  const packageData = packageInformation?.packages?.[0] || {};
  const page = normalize(packageData.page);
  const title = normalize(packageInformation?.heroHeading);
  const slug = normalize(packageInformation?.urlSlug).replace(/\s+/g, "-");

  return (
    page === "proposal" ||
    KNOWN_PROPOSAL_NAMES.includes(title) ||
    KNOWN_PROPOSAL_NAMES.some((name) =>
      slug.includes(name.replace(/\s+/g, "-")),
    )
  );
};

const includedCategories = (packageInformation) => {
  const packageData = packageInformation?.packages?.[0] || {};
  const details = getProposalPackageDetails(packageInformation, "en-US");
  const includedText = Array.isArray(packageData.included)
    ? packageData.included.join(" | ")
    : "";
  const categories = new Set();

  ADD_ON_TYPES.forEach((type) => {
    if (
      type.patterns.some((pattern) => pattern.test(normalize(includedText)))
    ) {
      categories.add(type.key);
    }
  });

  // The verified local package record is authoritative even while legacy
  // Contentful inclusion lists are being replaced in both locales.
  if (details?.dinnerIncluded) categories.add("dinner");
  if (details?.violinIncluded) categories.add("violin");

  return categories;
};

/**
 * Applies the official proposal add-on prices, removes services already
 * included in a package, and fills in any standard option missing from the
 * legacy Contentful relation. Unknown/custom additions are preserved.
 */
export const getProposalAdditions = (packageInformation, language) => {
  const packageData = packageInformation?.packages?.[0] || {};
  const source = Array.isArray(packageData.additions)
    ? packageData.additions.filter(Boolean)
    : [];

  if (!isProposalPackage(packageInformation)) return source;

  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const included = includedCategories(packageInformation);
  const details = getProposalPackageDetails(packageInformation, language);
  const unavailable = new Set(included);

  // The natural palm-roof gazebo cannot safely use cold sparks.
  if (details && !details.coldSparks) {
    unavailable.add("cold-sparks");
  }

  const seen = new Set();
  const reconciled = [];

  source.forEach((addition, index) => {
    const type = categoryFor(addition.addition);
    if (type && unavailable.has(type.key)) return;
    if (type && seen.has(type.key)) return;

    if (type) seen.add(type.key);
    reconciled.push({
      ...addition,
      id: addition.id || `proposal-addon-${type?.key || index}`,
      addition: type
        ? isPortuguese
          ? type.pt
          : isFrench
            ? type.fr
            : isSpanish
              ? type.es
              : type.en
        : addition.addition,
      price: type ? type.price : addition.price,
    });
  });

  ADD_ON_TYPES.forEach((type) => {
    if (seen.has(type.key) || unavailable.has(type.key)) return;
    reconciled.push({
      id: `proposal-addon-${type.key}`,
      addition: isPortuguese
        ? type.pt
        : isFrench
          ? type.fr
          : isSpanish
            ? type.es
            : type.en,
      price: type.price,
    });
  });

  return reconciled;
};

export const proposalAddOnType = categoryFor;
