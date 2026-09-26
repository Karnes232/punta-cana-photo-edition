import { graphql } from "gatsby";
import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import HomeExperience from "../components/HomeComponents/HomeExperience";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import { buildHomeSchema } from "../utils/homeSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

const IndexPage = ({ data }) => {
  const { language } = useI18next();
  const generalInfo = data.sanityGeneralLayout;

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <HomeExperience
        home={data.sanityHomePage}
        generalInfo={generalInfo}
        language={language}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const home = data.sanityHomePage;
  const seo = home?.seo;
  const generalInfo = data.sanityGeneralLayout;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(rootUrl, "/", language);
  const imageUrl = shareImageUrl(seo?.image?.asset?.url);
  const schemaMarkup = buildHomeSchema({
    generalInfo,
    language,
    pageUrl,
    pageTitle: seo?.title,
    pageDescription: seo?.description,
    imageUrl,
  });

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ")}
        image={imageUrl}
        imageAlt={seo?.image?.alt}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={language === "en-US" ? "es_DO" : "en_US"}
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/" />
      <meta name="theme-color" content="#000000" />
      <meta name="author" content={generalInfo?.legalName || "SERTUIN SRL"} />
      <meta name="contact" content={generalInfo?.email} />
      <meta name="subject" content={home?.heroEyebrow} />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery($sanityLanguage: String = "en") {
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
      legalName
      rnc
      email
      facebook
      instagram
      x
      telephone
      messengerLink
      logo {
        alt
        asset {
          url
        }
      }
    }
    sanityHomePage(language: { eq: $sanityLanguage }) {
      heroImage {
        alt
        asset {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      heroEyebrow
      heroHeading
      heroIntro
      primaryCta {
        label
        url
      }
      secondaryCta {
        label
        url
      }
      availability
      highlights
      eventsEyebrow
      eventsTitle
      eventsIntro
      eventCardLinkLabel
      eventCards {
        _key
        title
        description
        link
        image {
          alt
          # Cards sit in a sm:grid-cols-2 lg:grid-cols-4 grid, so they are
          # ~320px wide on desktop and ~364px on mobile. The matching sizes
          # value is applied in ServiceCard.
          asset {
            gatsbyImageData(width: 460, height: 537, placeholder: BLURRED)
          }
        }
      }
      whatEyebrow
      whatTitle
      whatParagraphs
      whatItems
      processEyebrow
      processTitle
      processIntro
      processSteps {
        _key
        title
        body
      }
      commitmentImage {
        alt
        asset {
          gatsbyImageData(width: 1200, height: 1300, placeholder: BLURRED)
        }
      }
      commitmentEyebrow
      commitmentTitle
      commitmentBody
      commitmentCta {
        label
        url
      }
      contactEyebrow
      contactTitle
      contactBody
      whatsappLabel
      callLabel
      emailLabel
      whatsappMessage
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
