import { useStaticQuery, graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import { localizedPath } from "../../utils/siteLocales";
import { safeLink } from "../../utils/reviewPolicy";
export default function useSharedContent() {
  const { language } = useI18next();
  const data = useStaticQuery(graphql`
    query SharedWebsiteContentQuery {
      sharedSiteContent {
        contentJson
      }
    }
  `);
  const content = JSON.parse(data.sharedSiteContent.contentJson);
  const lang = language === "en-US" ? "en" : language;
  const text = (value) => value?.[lang] || value?.en || "";
  const t = (key) =>
    text(content.labels.find((item) => item.key === key)?.text);
  const path = (url) =>
    safeLink(url, true) && url.startsWith("/")
      ? localizedPath(url, language)
      : undefined;
  return { content, t, text, path, language };
}
