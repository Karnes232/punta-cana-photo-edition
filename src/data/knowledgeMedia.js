import revealImage from "../images/gender-reveal/punta-cana-gender-reveal-beach.webp";
const { findNode, languageIndex } = require("./knowledgeGraph");
// Real service imagery already published by Sertuin; no stock or generated assets.
const media = {
  weddings: {
    url: "https://images.ctfassets.net/vpskymlp6aa0/2fMiHeTtnc0r5vQS2MJrZD/6979df7dbe044b55c8c340869fe8256a/EBS_5068-2.jpg",
    width: 750,
    height: 501,
    alt: [
      "Destination wedding ceremony planned by Sertuin Events in Punta Cana",
      "Ceremonia de boda de destino planificada por Sertuin Events en Punta Cana",
      "Cerimônia de destination wedding planejada pela Sertuin Events em Punta Cana",
      "Cérémonie de mariage à destination organisée par Sertuin Events à Punta Cana",
    ],
    source: "/puntacana-wedding-planner/",
  },
  corporate: {
    url: "https://images.ctfassets.net/vpskymlp6aa0/6ikO8VF2nPzg5pOoLvgRan/ceadcc2de42b696507754f186d12502f/WhatsAppImage2024-08-16at9.59.48AM-8c192c4e-2500.jpeg",
    width: 750,
    height: 1000,
    alt: [
      "Corporate event production coordinated by Sertuin Events in Punta Cana",
      "Producción de un evento corporativo coordinado por Sertuin Events en Punta Cana",
      "Produção de evento corporativo coordenado pela Sertuin Events em Punta Cana",
      "Production d’un événement d’entreprise coordonné par Sertuin Events à Punta Cana",
    ],
    source: "/event-planner/",
  },
  reveals: {
    url: revealImage,
    width: 2200,
    height: 1467,
    alt: [
      "Blue smoke gender reveal on a Punta Cana beach",
      "Gender reveal con humo azul en una playa de Punta Cana",
      "Chá revelação com fumaça azul em uma praia de Punta Cana",
      "Révélation avec fumée bleue sur une plage de Punta Cana",
    ],
    source: "/gender-reveal-punta-cana/",
  },
};
export const getKnowledgeMedia = (slug, language) => {
  const item = media[findNode(slug)?.cluster];
  if (!item) return null;
  return { ...item, alt: item.alt[languageIndex(language)] };
};
