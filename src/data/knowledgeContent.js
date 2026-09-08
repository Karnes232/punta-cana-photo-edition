import articles from "./knowledgeArticles.json";
import { normalizeLanguage } from "../utils/siteLocales";

// The amount is maintained once, with provenance in the private editorial register.
export const editorialFacts = {
  proposalGuestFee: {
    amount: 20,
    currency: "USD",
    verifiedAt: "2026-09-07",
    reviewDue: "2026-12-07",
  },
};
const substitute = (value, language) => {
  if (typeof value === "string") {
    const amount = editorialFacts.proposalGuestFee.amount;
    const formatted =
      language === "fr"
        ? `${amount} $ US`
        : language === "pt"
          ? `US$ ${amount}`
          : `US$${amount}`;
    return value.replaceAll("{{proposal_guest_fee}}", formatted);
  }
  if (Array.isArray(value))
    return value.map((item) => substitute(item, language));
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        substitute(item, language),
      ]),
    );
  return value;
};
export const getKnowledgeArticle = (slug, language) => {
  const normalized = String(slug || "").trim();
  const lang = normalizeLanguage(language);
  const article = articles[normalized]?.[lang];
  if (!article) return null;
  return substitute(article, lang);
};
