import articleMedia from "./knowledgeArticleMedia.json";
const { languageIndex } = require("./knowledgeGraph");

// Stable editorial selection per article, shared by its translated versions.
// Descriptions describe the visible photograph, not claims about the service.
export const getKnowledgeMedia = (slug, language) => {
  const item = articleMedia[slug];
  return item ? { ...item, alt: item.alt[languageIndex(language)] } : null;
};
