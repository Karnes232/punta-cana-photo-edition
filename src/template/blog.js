import React from "react";
import { getKnowledgeArticle } from "../data/knowledgeContent";
import { getKnowledgeMedia } from "../data/knowledgeMedia";
import {
  KnowledgeBreadcrumbs,
  KnowledgeToc,
  KnowledgeRelated,
  breadcrumbSchema,
} from "../components/BlogComponents/KnowledgeNavigation";
import "../styles/knowledge-center.css";
const { findNode } = require("../data/knowledgeGraph");
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import BlogBody from "../components/BlogComponents/BlogBody";
import PortugueseBlogBody from "../components/BlogComponents/PortugueseBlogBody";
import FrenchBlogBody from "../components/BlogComponents/FrenchBlogBody";
import StructuredBlogBody from "../components/BlogComponents/StructuredBlogBody";
import BlogGallery from "../components/BlogComponents/BlogGallery";
import LazySocialEmbeds from "../components/BlogComponents/LazySocialEmbeds";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { localizeProposalUrl } from "../utils/localizedLinks";
import { getPortugueseBlogContent } from "../data/portugueseBlogContent";
import { getFrenchBlogContent } from "../data/frenchBlogContent";
import { getFeaturedProposalGuide } from "../data/featuredProposalGuide";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";

const safeUrl = (value) => {
  if (typeof value !== "string") return "";
  const url = value.trim();
  return /^(https?:\/\/|\/|mailto:|tel:)/i.test(url) ? url : "";
};

const textValue = (value, fieldName) =>
  typeof value === "string" ? value : value?.[fieldName] || "";

const normalizePost = (post) => ({
  ...post,
  directAnswer: textValue(post.directAnswer, "directAnswer"),
  primaryCtaText: textValue(post.primaryCtaText, "primaryCtaText"),
  helpText: textValue(post.helpText, "helpText"),
});

const BlogCta = ({ post, language }) => {
  const url = localizeProposalUrl(safeUrl(post.primaryCtaButtonUrl), language);
  if (
    !post.primaryCtaTitle &&
    !post.primaryCtaText &&
    !(post.primaryCtaButtonText && url)
  ) {
    return null;
  }

  return (
    <section className="blog-cta" aria-labelledby="blog-primary-cta">
      {post.primaryCtaTitle && (
        <h2 id="blog-primary-cta">{post.primaryCtaTitle}</h2>
      )}
      {post.primaryCtaText && <p>{post.primaryCtaText}</p>}
      {post.primaryCtaButtonText && url && (
        <a href={url}>{post.primaryCtaButtonText}</a>
      )}
    </section>
  );
};

const BlogHelp = ({ post, language }) => {
  const whatsappUrl = post.helpWhatsAppEnabled
    ? safeUrl(post.helpWhatsAppUrl)
    : "";
  const email = post.helpEmailEnabled
    ? String(post.helpEmailAddress || "").trim()
    : "";
  const customUrl = post.helpCustomLinkEnabled
    ? localizeProposalUrl(safeUrl(post.helpCustomLinkUrl), language)
    : "";
  const hasLinks =
    whatsappUrl || email || (customUrl && post.helpCustomLinkText);

  if (!post.helpTitle && !post.helpText && !hasLinks) return null;

  return (
    <aside className="blog-help" aria-labelledby="blog-help-title">
      {post.helpTitle && <h2 id="blog-help-title">{post.helpTitle}</h2>}
      {post.helpText && <p>{post.helpText}</p>}
      {hasLinks && (
        <div className="blog-help__links">
          {whatsappUrl && <a href={whatsappUrl}>WhatsApp</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {customUrl && post.helpCustomLinkText && (
            <a href={customUrl}>{post.helpCustomLinkText}</a>
          )}
        </div>
      )}
    </aside>
  );
};

const Blog = ({ pageContext, data }) => {
  const rawPost = data?.allContentfulBlogPost?.nodes?.[0];
  if (!rawPost) return null;
  const language = normalizeLanguage(pageContext.language);
  const featured =
    getKnowledgeArticle(rawPost.slug, language) ||
    getFeaturedProposalGuide(rawPost.slug, language);
  const portuguese =
    language === "pt" && !featured
      ? getPortugueseBlogContent(rawPost.slug)
      : null;
  const french =
    language === "fr" && !featured ? getFrenchBlogContent(rawPost.slug) : null;
  const post = normalizePost(
    featured
      ? { ...rawPost, ...featured }
      : portuguese
        ? { ...rawPost, ...portuguese }
        : french
          ? { ...rawPost, ...french }
          : rawPost,
  );
  const articleMedia = getKnowledgeMedia(post.slug, language);
  const galleryImages = (
    findNode(post.slug)?.cluster === "proposals" ? post.galleryImages || [] : []
  ).map((item, index) => ({
    ...item,
    altText: featured?.galleryAltTexts?.[index] || item.altText,
    localizedAltText: featured?.galleryAltTexts?.[index] || "",
    localizedCaption: featured?.galleryCaptions?.[index] || "",
    caption: featured?.galleryCaptions?.[index] || item.caption,
  }));
  if (portuguese && post.helpCustomLinkEnabled) {
    post.helpCustomLinkText = "Saiba mais";
  }
  if (french && post.helpCustomLinkEnabled) {
    post.helpCustomLinkText = "En savoir plus";
  }

  return (
    <Layout generalInfo={pageContext.layout}>
      <main className="universal-blog">
        <article>
          <KnowledgeBreadcrumbs slug={post.slug} language={language} />
          <header className="universal-blog__header">
            <h1>{post.title}</h1>
            {featured && (
              <div className="knowledge-byline">
                <strong>{featured.author}</strong>
                {featured.authorRole && <span>{featured.authorRole}</span>}
                <span>{featured.reviewNote}</span>
              </div>
            )}
            {post.directAnswer && (
              <p className="universal-blog__answer">{post.directAnswer}</p>
            )}
          </header>
          <BlogCta post={post} language={language} />
          {featured && <KnowledgeToc article={featured} language={language} />}
          {articleMedia && (
            <figure className="knowledge-article-image">
              <img
                src={articleMedia.url}
                alt={articleMedia.alt}
                width={articleMedia.width}
                height={articleMedia.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}
          <BlogGallery
            images={galleryImages}
            language={language}
            articleTitle={post.title}
          />
          {featured ? (
            <StructuredBlogBody article={featured} language={language} />
          ) : portuguese ? (
            <PortugueseBlogBody article={portuguese} />
          ) : french ? (
            <FrenchBlogBody article={french} />
          ) : (
            <BlogBody context={post.articleContent} language={language} />
          )}
          <LazySocialEmbeds
            embeds={post.socialEmbeds}
            language={pageContext.language}
          />
          <KnowledgeRelated slug={post.slug} language={language} />
          <BlogHelp post={post} language={language} />
        </article>
      </main>
    </Layout>
  );
};

export default Blog;

export const Head = ({ pageContext, data }) => {
  const rawPost = data?.allContentfulBlogPost?.nodes?.[0];
  if (!rawPost) return null;
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const featured =
    getKnowledgeArticle(rawPost.slug, language) ||
    getFeaturedProposalGuide(rawPost.slug, language);
  const portuguese =
    language === "pt" && !featured
      ? getPortugueseBlogContent(rawPost.slug)
      : null;
  const french =
    language === "fr" && !featured ? getFrenchBlogContent(rawPost.slug) : null;
  const post = normalizePost(
    featured
      ? { ...rawPost, ...featured }
      : portuguese
        ? { ...rawPost, ...portuguese }
        : french
          ? { ...rawPost, ...french }
          : rawPost,
  );
  const seoTitle =
    featured?.seoTitle ||
    portuguese?.seoTitle ||
    french?.seoTitle ||
    post.title;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const articlePath = `/blog/${post.slug.trim()}/`;
  const siteUrl = localizedUrl(rootUrl, articlePath, language);
  const socialImage =
    findNode(post.slug)?.cluster === "proposals"
      ? post.galleryImages?.[0]?.image
      : null;
  const knowledgeMedia = getKnowledgeMedia(post.slug, language);
  const imageSource = socialImage?.url || knowledgeMedia?.url;
  const imageUrl = imageSource ? new URL(imageSource, rootUrl).href : undefined;
  const imageAlt =
    knowledgeMedia?.alt ||
    (featured?.galleryAltTexts?.[0]
      ? featured.galleryAltTexts[0]
      : language === "pt"
        ? `${post.title} em Punta Cana`
        : language === "fr"
          ? `${post.title} à Punta Cana`
          : post.galleryImages?.[0]?.altText || "");

  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${siteUrl}#article`,
    headline: post.title,
    description: post.description || post.directAnswer,
    mainEntityOfPage: siteUrl,
    inLanguage: languageConfig.htmlLang,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(post.publishedDate ? { datePublished: post.publishedDate } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: {
      "@type": featured?.authorType || "Organization",
      name: featured?.author || "Sertuin Events",
    },
    publisher: {
      "@type": "Organization",
      name: "SERTUIN SRL",
      url: data.site.siteMetadata.siteUrl,
    },
  };
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema,
      breadcrumbSchema(post.slug, language, rootUrl),
      ...(featured?.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": siteUrl + "#faq",
              inLanguage: languageConfig.htmlLang,
              mainEntity: featured.faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ]
        : []),
    ].filter(Boolean),
  };

  return (
    <>
      <Seo
        title={seoTitle}
        description={post.description || post.directAnswer}
        image={imageUrl}
        imageAlt={imageAlt}
        url={siteUrl}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        twitterCard={imageUrl ? "summary_large_image" : "summary"}
      />
      <link rel="canonical" href={siteUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
        }}
      />
      <LocalizedAlternates rootUrl={rootUrl} path={articlePath} />
    </>
  );
};

export const query = graphql`
  query UniversalBlogPost($id: String, $contentLanguage: String = "en-US") {
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
    allContentfulBlogPost(
      filter: { id: { eq: $id }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        id
        title
        slug
        description
        directAnswer {
          directAnswer
        }
        publishedDate
        updatedAt
        primaryCtaTitle
        primaryCtaText {
          primaryCtaText
        }
        primaryCtaButtonText
        primaryCtaButtonUrl
        galleryImages {
          contentful_id
          altText
          caption
          image {
            url
            width
            height
          }
        }
        articleContent {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              url
              width
              height
              description
            }
          }
        }
        socialEmbeds {
          contentful_id
          platform
          url
        }
        helpTitle
        helpText {
          helpText
        }
        helpWhatsAppEnabled
        helpWhatsAppUrl
        helpEmailEnabled
        helpEmailAddress
        helpCustomLinkEnabled
        helpCustomLinkText
        helpCustomLinkUrl
        schema {
          internal {
            content
          }
        }
      }
    }
  }
`;
