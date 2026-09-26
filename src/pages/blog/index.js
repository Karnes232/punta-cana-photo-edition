import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import KnowledgeCenter from "../../components/BlogComponents/KnowledgeCenter";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";
import "../../styles/knowledge-center.css";
const { nodes } = require("../../data/knowledgeGraph");
const { isPublishedBlogSlug } = require("../../data/publishedBlogSlugs");

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

const BlogIndex = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);
  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <KnowledgeCenter
        copy={data.sanityBlogPage || {}}
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
  const language = normalizeLanguage(pageContext.language);
  const seo = data.sanityBlogPage?.seo;
  const config = getLanguageConfig(language),
    rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const url = localizedUrl(rootUrl, "/blog/", language);
  const active = new Set(
    data.allContentfulBlogPost.nodes
      .filter(({ slug }) => isPublishedBlogSlug(slug))
      .map((p) => p.slug.trim()),
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: seo?.title,
    description: seo?.description,
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
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ")}
        image={shareImageUrl(seo?.image?.asset?.url)}
        imageAlt={seo?.image?.alt}
        twitterCard="summary_large_image"
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
  query BlogIndexQuery(
    $contentLanguage: String = "en-US"
    $sanityLanguage: String = "en"
  ) {
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
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      facebook
      instagram
      x
      telephone
      messengerLink
    }
    # Which guides exist; their copy comes from the repo until the articles move.
    allContentfulBlogPost(filter: { node_locale: { eq: $contentLanguage } }) {
      nodes {
        slug
      }
    }
    sanityBlogPage(language: { eq: $sanityLanguage }) {
      eyebrow
      title
      intro
      topicsTitle
      readLabel
      serviceLabel
      intimateEyebrow
      intimateTitle
      intimateText
      intimateLink {
        label
        url
      }
      seo {
        title
        description
        keywords
        image {
          alt
          asset {
            url
          }
        }
      }
    }
  }
`;
