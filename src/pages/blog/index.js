import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import KnowledgeCenter, {
  centerCopy,
} from "../../components/BlogComponents/KnowledgeCenter";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";
import "../../styles/knowledge-center.css";
const { nodes, languageIndex } = require("../../data/knowledgeGraph");
const { isPublishedBlogSlug } = require("../../data/publishedBlogSlugs");

const BlogIndex = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <KnowledgeCenter
        language={language}
        availableSlugs={data.allContentfulBlogPost.nodes
          .filter(({ slug }) => isPublishedBlogSlug(slug))
          .map((p) => p.slug.trim())}
      />
    </Layout>
  );
};
export default BlogIndex;
export const Head = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language),
    i = languageIndex(language);
  const config = getLanguageConfig(language),
    rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const url = localizedUrl(rootUrl, "/blog/", language);
  const active = new Set(
    data.allContentfulBlogPost.nodes
      .filter(({ slug }) => isPublishedBlogSlug(slug))
      .map((p) => p.slug.trim()),
  );
  const title = [
    "Punta Cana Event Planning Guides | Sertuin Events",
    "Guías de eventos en Punta Cana | Sertuin Events",
    "Guias de eventos em Punta Cana | Sertuin Events",
    "Guides d’événements à Punta Cana | Sertuin Events",
  ][i];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: title,
    description: centerCopy.intro[i],
    inLanguage: config.htmlLang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: nodes
        .filter((n) => active.has(n.slug))
        .map((n, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: getKnowledgeArticle(n.slug, language).title,
          url: localizedUrl(rootUrl, "/blog/" + n.slug + "/", language),
        })),
    },
  };
  return (
    <>
      <Seo
        title={title}
        image="https://images.ctfassets.net/vpskymlp6aa0/2fMiHeTtnc0r5vQS2MJrZD/6979df7dbe044b55c8c340869fe8256a/EBS_5068-2.jpg"
        imageAlt={["Wedding coordinated by our team in Punta Cana", "Boda coordinada por nuestro equipo en Punta Cana", "Casamento coordenado por nossa equipe em Punta Cana", "Mariage coordonné par notre équipe à Punta Cana"][i]}
        twitterCard="summary_large_image"
        description={centerCopy.intro[i]}
        url={url}
        language={config.htmlLang}
        siteName="Sertuin Events"
        locale={config.ogLocale}
      />
      <link rel="canonical" href={url} />
      <LocalizedAlternates rootUrl={rootUrl} path="/blog/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      {!active.size && <meta name="robots" content="noindex, follow" />}
    </>
  );
};

export const query = graphql`
  query BlogIndexQuery($contentLanguage: String = "en-US") {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout(
      filter: { node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
        messengerLink
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: $contentLanguage } }
      sort: { updatedAt: DESC }
    ) {
      nodes {
        id
        node_locale
        title
        slug
        description
        updatedAt
        galleryImages {
          altText
          image {
            url
            width
            height
          }
        }
      }
    }
  }
`;
