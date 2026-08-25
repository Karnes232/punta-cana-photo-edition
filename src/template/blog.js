import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import BlogBody from "../components/BlogComponents/BlogBody";
import BlogGallery from "../components/BlogComponents/BlogGallery";
import LazySocialEmbeds from "../components/BlogComponents/LazySocialEmbeds";
import Seo from "../components/Layout/seo";
import { localizeSpanishProposalUrl } from "../utils/localizedLinks";

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
  const url = localizeSpanishProposalUrl(
    safeUrl(post.primaryCtaButtonUrl),
    language,
  );
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
    ? localizeSpanishProposalUrl(safeUrl(post.helpCustomLinkUrl), language)
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
  const post = normalizePost(rawPost);
  const language = pageContext.language === "es" ? "es" : "en-US";

  return (
    <Layout generalInfo={pageContext.layout}>
      <main className="universal-blog">
        <article>
          <header className="universal-blog__header">
            <h1>{post.title}</h1>
            {post.directAnswer && (
              <p className="universal-blog__answer">{post.directAnswer}</p>
            )}
          </header>
          <BlogCta post={post} language={language} />
          <BlogGallery images={post.galleryImages || []} />
          <BlogBody context={post.articleContent} language={language} />
          <LazySocialEmbeds
            embeds={post.socialEmbeds}
            language={pageContext.language}
          />
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
  const post = normalizePost(rawPost);

  const language = pageContext.language === "en-US" ? "en" : "es";
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const englishUrl = `${rootUrl}/blog/${post.slug.trim()}/`;
  const spanishUrl = `${rootUrl}/es/blog/${post.slug.trim()}/`;
  const siteUrl = language === "en" ? englishUrl : spanishUrl;
  const socialImage = post.galleryImages?.[0]?.image;
  const imageUrl = socialImage?.url;
  const imageAlt = post.galleryImages?.[0]?.altText || "";

  let customSchema;
  try {
    customSchema = post.schema?.internal?.content
      ? JSON.parse(post.schema.internal.content)
      : null;
  } catch {
    customSchema = null;
  }

  const schemaMarkup = customSchema || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.directAnswer,
    mainEntityOfPage: siteUrl,
    inLanguage: language,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(post.publishedDate ? { datePublished: post.publishedDate } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: { "@type": "Organization", name: "SERTUIN SRL" },
    publisher: {
      "@type": "Organization",
      name: "SERTUIN SRL",
      url: data.site.siteMetadata.siteUrl,
    },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.description || post.directAnswer}
        image={imageUrl}
        imageAlt={imageAlt}
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={language}
        siteName="Sertuin Events"
        locale={language === "en" ? "en_US" : "es_DO"}
        twitterCard={imageUrl ? "summary_large_image" : "summary"}
      />
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="es" href={spanishUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
    </>
  );
};

export const query = graphql`
  query UniversalBlogPost($id: String, $language: String!) {
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
      filter: { id: { eq: $id }, node_locale: { eq: $language } }
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
