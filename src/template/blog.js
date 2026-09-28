import React from "react";
import {
  KnowledgeBreadcrumbs,
  KnowledgeToc,
  KnowledgeRelated,
  breadcrumbSchema,
} from "../components/BlogComponents/KnowledgeNavigation";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import StructuredBlogBody from "../components/BlogComponents/StructuredBlogBody";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { siteLink } from "../components/HomeComponents/siteLink";
import { guideSlug } from "../utils/blogGuides";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const column = "mx-auto w-[min(100%,56rem)]";
const box = `${column} border-l-[3px] border-l-primary-color bg-[#f7f6f3] p-[clamp(1.5rem,4vw,2.5rem)]`;
const boxTitle = "mb-3 mt-0 font-crimson text-[length:clamp(1.7rem,4vw,2.35rem)] font-medium";
const boxText = "mb-5 mt-0 font-montserrat leading-[1.7] text-[#4b5563]";
const boxButton = "inline-flex min-h-[2.75rem] items-center justify-center bg-[#03071a] px-5 py-3 font-montserrat text-[0.78rem] font-semibold tracking-[0.08em] text-white no-underline";

// A guide's page: its text in this language (Blog Post) and the shared parts
// (Blog Guide: address, photo, event type, related guides), both from Sanity.
const BlogCta = ({ post, language }) => {
  const url = siteLink(post.ctaButton?.url, language);
  const label = post.ctaButton?.label;
  if (!post.ctaTitle && !post.ctaText && !(label && url)) {
    return null;
  }

  return (
    <section className={`${box} mt-10`} aria-labelledby="blog-primary-cta">
      {post.ctaTitle && (
        <h2 id="blog-primary-cta" className={boxTitle}>
          {post.ctaTitle}
        </h2>
      )}
      {post.ctaText && <p className={boxText}>{post.ctaText}</p>}
      {label && url && (
        <a href={url} className={boxButton}>
          {label}
        </a>
      )}
    </section>
  );
};

const BlogHelp = ({ post, telephone }) => {
  const phone = String(telephone || "").replace(/\D/g, "");
  const whatsappUrl = post.helpWhatsApp && phone ? `https://wa.me/${phone}` : "";

  if (!post.helpTitle && !post.helpText && !whatsappUrl) return null;

  return (
    <aside className={`${box} mt-16`} aria-labelledby="blog-help-title">
      {post.helpTitle && (
        <h2 id="blog-help-title" className={boxTitle}>
          {post.helpTitle}
        </h2>
      )}
      {post.helpText && <p className={boxText}>{post.helpText}</p>}
      {whatsappUrl && (
        <div className="flex flex-wrap gap-3">
          <a href={whatsappUrl} className={boxButton}>
            WhatsApp
          </a>
        </div>
      )}
    </aside>
  );
};

// Each related guide's title and summary in this language, by guide id.
const textsByGuide = (data) =>
  Object.fromEntries(
    data.allSanityBlogPost.nodes.map((text) => [text.guide?._id, text]),
  );

const Blog = ({ pageContext, data }) => {
  const post = data.sanityBlogPost;
  const guide = post?.guide;
  if (!guide) return null;
  const language = normalizeLanguage(pageContext.language);
  const labels = data.sanityBlogPage || {};
  const photo = guide.heroImage?.asset;
  const photoSize = photo?.metadata?.dimensions;

  return (
    <Layout generalInfo={pageContext.layout}>
      <main className="mx-auto w-[min(100%_-_2rem,72rem)] py-[clamp(3rem,7vw,6rem)] text-[#111827]">
        <article>
          <KnowledgeBreadcrumbs
            title={post.title}
            guide={guide}
            labels={labels}
            language={language}
          />
          <header className={column}>
            <h1 className="m-0 max-w-[22ch] font-crimson text-[length:clamp(2.5rem,7vw,5rem)] font-medium leading-[0.98]">
              {post.title}
            </h1>
            <div className="my-[22px] flex flex-wrap gap-x-[18px] gap-y-[6px] font-montserrat text-[12px] leading-[1.8] text-[#4b5563]">
              <strong className="font-semibold">{post.authorName}</strong>
              {post.authorRole && <span>{post.authorRole}</span>}
              <span>{post.reviewNote}</span>
            </div>
            {post.directAnswer && (
              <p className="mt-6 max-w-[48rem] font-montserrat text-[length:clamp(1.05rem,2vw,1.3rem)] leading-[1.75] text-[#4b5563]">
                {post.directAnswer}
              </p>
            )}
          </header>
          <BlogCta post={post} language={language} />
          <KnowledgeToc sections={post.sections || []} labels={labels} />
          {photo?.url && (
            <figure className={`${column} my-8`}>
              <img
                src={photo.url}
                srcSet={
                  photoSize?.width
                    ? `${photo.url}?w=640 640w, ${photo.url} ${photoSize.width}w`
                    : undefined
                }
                sizes="(min-width: 1024px) 960px, 100vw"
                alt={post.heroAlt}
                width={photoSize?.width}
                height={photoSize?.height}
                loading="lazy"
                decoding="async"
                className="block max-h-[520px] w-full rounded-[3px] object-contain"
              />
              {guide.imageCredit && (
                <figcaption>{guide.imageCredit}</figcaption>
              )}
            </figure>
          )}
          <StructuredBlogBody post={post} language={language} />
          <KnowledgeRelated
            guide={guide}
            texts={textsByGuide(data)}
            labels={labels}
            language={language}
          />
          <BlogHelp post={post} telephone={pageContext.layout?.telephone} />
        </article>
      </main>
    </Layout>
  );
};

export default Blog;

export const Head = ({ pageContext, data }) => {
  const post = data.sanityBlogPost;
  const guide = post?.guide;
  if (!guide) return null;
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const articlePath = `/blog/${guideSlug(guide)}/`;
  const siteUrl = localizedUrl(rootUrl, articlePath, language);
  const photoUrl = guide.heroImage?.asset?.url;
  const imageUrl = shareImageUrl(photoUrl);
  const description = post.description || post.directAnswer;
  const company = pageContext.layout || {};

  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${siteUrl}#article`,
    headline: post.title,
    description,
    mainEntityOfPage: siteUrl,
    inLanguage: languageConfig.htmlLang,
    ...(photoUrl ? { image: photoUrl } : {}),
    ...(guide.updatedAt ? { dateModified: guide.updatedAt } : {}),
    author: {
      "@type": post.authorType || "Organization",
      name: post.authorName || "Sertuin Events",
      ...(post.authorType === "Person" && post.authorName?.includes("Grecia")
        ? {
            "@id": `${rootUrl}/puntacana-wedding-planner/#grecia-mejia`,
            url: `${rootUrl}/puntacana-wedding-planner/`,
          }
        : post.authorType === "Organization"
          ? { "@id": `${rootUrl}/#organization`, url: rootUrl }
          : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${rootUrl}/#organization`,
      // The same organization name as every other page's structured data;
      // General Layout stores the brand in capitals.
      name: "Sertuin Events",
      legalName: company.legalName || "SERTUIN SRL",
      url: data.site.siteMetadata.siteUrl,
    },
  };
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema,
      breadcrumbSchema({
        title: post.title,
        guide,
        labels: data.sanityBlogPage || {},
        language,
        rootUrl,
      }),
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": siteUrl + "#faq",
              inLanguage: languageConfig.htmlLang,
              mainEntity: post.faqs.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        ogType="article"
        description={description}
        image={imageUrl}
        imageAlt={post.heroAlt}
        url={siteUrl}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        twitterCard={imageUrl ? "summary_large_image" : "summary"}
        robots="index, follow, max-image-preview:large"
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
  query UniversalBlogPost($id: String!, $sanityLanguage: String!) {
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
    sanityBlogPost(_id: { eq: $id }) {
      title
      seoTitle
      description
      directAnswer
      heroAlt
      sections {
        heading
        intro
        paragraphs
        steps {
          label
          detail
        }
        bullets
        note
        sources {
          label
          url
        }
      }
      faqHeading
      faqs {
        question
        answer
      }
      authorName
      authorType
      authorRole
      reviewNote
      ctaTitle
      ctaText
      ctaButton {
        label
        url
      }
      helpTitle
      helpText
      helpWhatsApp
      guide {
        _id
        slug {
          current
        }
        updatedAt
        imageCredit
        heroImage {
          asset {
            url
            metadata {
              dimensions {
                width
                height
              }
            }
          }
        }
        category {
          key
          label {
            en
            es
            pt
            fr
          }
        }
        related {
          _id
          slug {
            current
          }
          category {
            label {
              en
              es
              pt
              fr
            }
          }
        }
        next {
          _id
        }
      }
    }
    sanityBlogPage(language: { eq: $sanityLanguage }) {
      homeLabel
      libraryLabel
      breadcrumbLabel
      tocLabel
      nextLabel
    }
    allSanityBlogPost(filter: { language: { eq: $sanityLanguage } }) {
      nodes {
        title
        description
        guide {
          _id
        }
      }
    }
  }
`;
