import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import KnowledgeCenter from "../../components/BlogComponents/KnowledgeCenter";
import { byLibraryOrder, guideSlug } from "../../utils/blogGuides";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";
import "../../styles/knowledge-center.css";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// This language's guide texts whose Blog Guide is published, in library order.
const libraryPosts = (data) =>
  data.allSanityBlogPost.nodes.filter((post) => post.guide).sort(byLibraryOrder);

const BlogIndex = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);
  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <KnowledgeCenter
        copy={data.sanityBlogPage || {}}
        categories={data.allSanityBlogCategory.nodes}
        topics={data.allSanityBlogTopic.nodes}
        posts={libraryPosts(data)}
        language={language}
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
  const posts = libraryPosts(data);
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
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: localizedUrl(rootUrl, `/blog/${guideSlug(post.guide)}/`, language),
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
      {!posts.length && <meta name="robots" content="noindex, follow" />}
    </>
  );
};

export const query = graphql`
  query BlogIndexQuery($sanityLanguage: String = "en") {
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
    allSanityBlogCategory(sort: { order: ASC }) {
      nodes {
        key
        servicePage
        label {
          en
          es
          pt
          fr
        }
      }
    }
    allSanityBlogTopic(sort: { order: ASC }) {
      nodes {
        key
        label {
          en
          es
          pt
          fr
        }
      }
    }
    allSanityBlogPost(filter: { language: { eq: $sanityLanguage } }) {
      nodes {
        title
        description
        guide {
          _id
          order
          slug {
            current
          }
          category {
            key
            order
          }
          topics {
            key
          }
        }
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
