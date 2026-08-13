/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
// import { useStaticQuery, graphql } from "gatsby";

function Seo({
  description,
  title,
  keywords,
  image,
  url,
  children,
  schemaMarkup,
  language = "en",
  robots,
  imageAlt,
  twitterCard = "summary",
  siteName,
  locale,
  alternateLocale,
}) {
  // const { site } = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //         siteUrl
  //       }
  //     }
  //   }
  // `);
  // const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      {/* <meta key="fb-app-id" property="fb:app_id" content="632127816093742" />, */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {locale && <meta property="og:locale" content={locale} />}
      {alternateLocale && (
        <meta property="og:locale:alternate" content={alternateLocale} />
      )}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      <meta name="twitter:description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="google-site-verification"
        content="dWi4LT0-LdddllQAsV3pCZeOOvRmN0C_h2KN6aurqWk"
      />
      <meta
        name="google-site-verification"
        content="76GIJb-wXrff86HmQyopeYrTRA40fGXnwBOOktUJky"
      />
      {children}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </>
  );
}

export default Seo;
