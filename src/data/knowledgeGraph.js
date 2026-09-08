// One conceptual node per intent; the current four language URLs stay intact.
const node = (id, slug, cluster, type, topics, related, next = null) => ({
  id,
  translationGroup: id,
  slug,
  cluster,
  type,
  topics,
  related,
  next,
  parent: cluster,
  editorialStatus: "pending-owner-review",
});
const nodes = [
  node(
    "proposal-timeline",
    "how-to-prepare-for-a-marriage-proposal-in-punta-cana",
    "proposals",
    "guide",
    ["logistics", "photography"],
    ["proposal-location", "proposal-weather", "wedding-guests"],
    "proposal-location",
  ),
  node(
    "proposal-location",
    "punta-cana-resort-proposal-permits-fees-privacy",
    "proposals",
    "comparison",
    ["venues", "logistics"],
    ["proposal-timeline", "proposal-weather", "wedding-venue"],
    "proposal-weather",
  ),
  node(
    "proposal-weather",
    "punta-cana-proposal-rain-weather-policy",
    "proposals",
    "guide",
    ["weather", "photography"],
    [
      "proposal-timeline",
      "proposal-location",
      "wedding-weather",
      "reveal-weather",
    ],
  ),
  node(
    "wedding-first-meeting",
    "first-meeting-punta-cana-wedding-planner-checklist",
    "weddings",
    "checklist",
    ["budget", "logistics"],
    ["wedding-venue", "wedding-culture", "south-asian-logistics"],
    "wedding-venue",
  ),
  node(
    "wedding-venue",
    "punta-cana-wedding-all-inclusive-resort-vs-private-venue",
    "weddings",
    "comparison",
    ["venues", "budget"],
    [
      "wedding-first-meeting",
      "wedding-weather",
      "wedding-guests",
      "proposal-location",
    ],
    "wedding-weather",
  ),
  node(
    "wedding-weather",
    "punta-cana-wedding-rain-plan",
    "weddings",
    "guide",
    ["weather", "venues"],
    ["wedding-venue", "wedding-guests", "proposal-weather", "corporate-venue"],
    "wedding-guests",
  ),
  node(
    "wedding-guests",
    "punta-cana-destination-wedding-guest-travel-guide",
    "weddings",
    "guide",
    ["logistics"],
    [
      "wedding-venue",
      "wedding-weather",
      "corporate-timeline",
      "proposal-timeline",
    ],
  ),
  node(
    "wedding-culture",
    "plan-multicultural-wedding-punta-cana-family-traditions",
    "weddings",
    "guide",
    ["culture", "logistics"],
    ["wedding-first-meeting", "south-asian-logistics", "wedding-guests"],
    "south-asian-logistics",
  ),
  node(
    "south-asian-logistics",
    "south-asian-wedding-punta-cana-venue-logistics-checklist",
    "weddings",
    "guide",
    ["culture", "venues", "logistics"],
    [
      "wedding-culture",
      "wedding-first-meeting",
      "wedding-venue",
      "wedding-weather",
    ],
  ),
  node(
    "reveal-location",
    "best-location-gender-reveal-punta-cana-villa-hotel-beach",
    "reveals",
    "comparison",
    ["venues", "logistics"],
    ["reveal-weather", "reveal-privacy", "proposal-location"],
    "reveal-weather",
  ),
  node(
    "reveal-weather",
    "punta-cana-gender-reveal-rain-wind-weather-plan",
    "reveals",
    "guide",
    ["weather", "logistics"],
    ["reveal-location", "reveal-privacy", "proposal-weather"],
    "reveal-privacy",
  ),
  node(
    "reveal-privacy",
    "keep-gender-reveal-result-secret-punta-cana",
    "reveals",
    "guide",
    ["logistics"],
    ["reveal-location", "reveal-weather"],
  ),
  node(
    "corporate-brief",
    "punta-cana-corporate-event-quote-checklist",
    "corporate",
    "checklist",
    ["budget", "logistics"],
    ["corporate-venue", "corporate-timeline"],
    "corporate-venue",
  ),
  node(
    "corporate-venue",
    "punta-cana-corporate-event-ballroom-beach-private-venue",
    "corporate",
    "comparison",
    ["venues", "weather"],
    ["corporate-brief", "corporate-timeline", "wedding-weather"],
    "corporate-timeline",
  ),
  node(
    "corporate-timeline",
    "punta-cana-corporate-event-transport-setup-timeline",
    "corporate",
    "guide",
    ["logistics"],
    ["corporate-brief", "corporate-venue", "wedding-guests"],
  ),
];
const clusters = [
  {
    id: "proposals",
    service: "/proposal/",
    labels: [
      "Marriage proposals",
      "Propuestas de matrimonio",
      "Pedidos de casamento",
      "Demandes en mariage",
    ],
  },
  {
    id: "weddings",
    service: "/puntacana-wedding-planner/",
    labels: [
      "Destination & multicultural weddings",
      "Bodas de destino y multiculturales",
      "Destination weddings e casamentos multiculturais",
      "Mariages à destination et multiculturels",
    ],
  },
  {
    id: "reveals",
    service: "/gender-reveal-punta-cana/",
    labels: [
      "Gender reveals",
      "Gender reveals",
      "Chás revelação",
      "Révélations du sexe du bébé",
    ],
  },
  {
    id: "corporate",
    service: "/event-planner/",
    labels: [
      "Corporate events",
      "Eventos corporativos",
      "Eventos corporativos",
      "Événements d’entreprise",
    ],
  },
];
const topics = [
  {
    id: "weather",
    labels: [
      "Weather & alternatives",
      "Clima y alternativas",
      "Clima e alternativas",
      "Météo et solutions de repli",
    ],
  },
  {
    id: "venues",
    labels: [
      "Venues & resort access",
      "Lugares y accesos a resorts",
      "Espaços e acesso aos resorts",
      "Lieux et accès aux resorts",
    ],
  },
  {
    id: "logistics",
    labels: [
      "Timing & logistics",
      "Tiempos y logística",
      "Cronograma e logística",
      "Horaires et logistique",
    ],
  },
  {
    id: "culture",
    labels: [
      "Culture & ceremonies",
      "Cultura y ceremonias",
      "Cultura e cerimônias",
      "Culture et cérémonies",
    ],
  },
  {
    id: "budget",
    labels: [
      "Budgets & decisions",
      "Presupuestos y decisiones",
      "Orçamentos e decisões",
      "Budgets et décisions",
    ],
  },
  {
    id: "photography",
    labels: [
      "Photography & light",
      "Fotografía y luz",
      "Fotografia e luz",
      "Photographie et lumière",
    ],
  },
];
const languageIndex = (language) => ({ es: 1, pt: 2, fr: 3 })[language] || 0;
const label = (entity, language) => entity.labels[languageIndex(language)];
const findNode = (slug) =>
  nodes.find((n) => n.slug === String(slug || "").trim());
const relatedNodes = (current) =>
  current.related.map((id) => nodes.find((n) => n.id === id)).filter(Boolean);
module.exports = {
  nodes,
  clusters,
  topics,
  languageIndex,
  label,
  findNode,
  relatedNodes,
};
