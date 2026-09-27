import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { getLanguageConfig, localizedPath, localizedUrl } from "../utils/siteLocales";
import "../styles/knowledge-center.css";
import "../styles/wedding-guides.css";

const indexLabel = { "en-US": "Wedding planning guides", es: "Guías para planificar tu boda", pt: "Guias de planejamento de casamento", fr: "Guides pour organiser votre mariage" };
const WeddingGuide = ({ pageContext: { post, language, layout } }) => (
  <Layout generalInfo={layout}>
    <main className="universal-blog">
      <article lang={getLanguageConfig(language).htmlLang}>
        <nav className="knowledge-breadcrumbs" aria-label={indexLabel[language]}>
          <ol><li><a href={localizedPath("/blog/", language)}>{indexLabel[language]}</a></li><li aria-current="page">{post.title}</li></ol>
        </nav>
        <header className="universal-blog__header">
          <h1>{post.title}</h1>
          <div className="knowledge-byline"><strong>{post.author}</strong></div>
        </header>
        <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  </Layout>
);
export default WeddingGuide;

export const Head = ({ pageContext: { post, language, slug } }) => {
  const rootUrl = "https://sertuinevents.com";
  const config = getLanguageConfig(language);
  const path = `/blog/${slug}/`;
  const url = localizedUrl(rootUrl, path, language);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": url + "#article", headline: post.title, description: post.description,
      mainEntityOfPage: url, url, inLanguage: config.htmlLang,
      datePublished: post.reviewedAt, dateModified: post.reviewedAt,
      author: { "@type": "Organization", name: post.author, url: rootUrl },
      publisher: { "@type": "Organization", "@id": rootUrl + "/#organization", name: "Sertuin Events", url: rootUrl } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: indexLabel[language], item: localizedUrl(rootUrl, "/blog/", language) },
      { "@type": "ListItem", position: 2, name: post.title, item: url }
    ] }
  ] };
  return <>
    <Seo title={post.seoTitle} description={post.description} url={url} language={config.htmlLang}
      locale={config.ogLocale} siteName="Sertuin Events" ogType="article" robots="index, follow, max-image-preview:large" />
    <link rel="canonical" href={url} />
    <LocalizedAlternates rootUrl={rootUrl} path={path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </>;
};

export const query = graphql`
  query WeddingGuideLocales {
    locales: allLocale { edges { node { ns data language } } }
  }
`;
