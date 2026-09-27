import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
import React from "react";
import { graphql } from "gatsby";

import ElopementExperience, {
  elopementChoices,
} from "../../components/ElopementComponents/ElopementExperience";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import { buildElopementSchema } from "../../utils/elopementSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// Copy, photos and prices come from this language's Elopement Page document in
// Sanity; phone and email from General Layout.
const Index = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);

  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <ElopementExperience
        page={data.sanityElopementPage || {}}
        language={language}
      />
      <ServiceGuides cluster="weddings" language={language} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data, pageContext }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const pageUrl = localizedUrl(
    rootUrl,
    "/punta-cana-elopement-packages/",
    language,
  );
  const page = data.sanityElopementPage || {};
  const seo = page.seo;
  const image = shareImageUrl(seo?.image?.asset?.url);
  const generalInfo = data.sanityGeneralLayout;
  const schemaMarkup = buildElopementSchema({
    siteUrl: rootUrl,
    pageUrl,
    language,
    image,
    page,
    choices: elopementChoices(page),
    companyName: generalInfo.companyName,
    telephone: generalInfo.telephone,
    instagram: generalInfo.instagram,
  });

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ") || undefined}
        image={image}
        imageAlt={seo?.image?.alt}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        robots="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={language === "es" ? "en_US" : "es_DO"}
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates
        rootUrl={rootUrl}
        path="/punta-cana-elopement-packages/"
      />
    </>
  );
};

export const query = graphql`
  fragment ElopementPhoto on SanityImageWithAlt {
    _key
    alt
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
  query ElopementPageQuery($language: String!, $sanityLanguage: String = "en") {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
    sanityElopementPage(language: { eq: $sanityLanguage }) {
      heroImage {
        ...ElopementPhoto
      }
      heroTitle
      builderEyebrow
      builderTitle
      builderIntro
      formula
      stepOne
      experiences {
        _key
        title
        eyebrow
        summary
        option {
          setting
          price
        }
      }
      fromLabel
      guestsLabel
      guestsHelp
      stepTwo
      decorations {
        _key
        name
        description
        photos {
          ...ElopementPhoto
        }
        option {
          price
          catamaranAllowed
        }
      }
      realTouchLabel
      beachAndCatamaranLabel
      beachOnlyLabel
      unavailableCatamaran
      previousPhotoLabel
      nextPhotoLabel
      selectLabel
      selectedLabel
      stepThree
      symbolicTitle
      symbolicIncluded
      symbolicChoiceText
      symbolicText
      legalUpgrade {
        title
        choiceText
        text
        caution
        option {
          price
        }
      }
      estimateTitle
      experienceLine
      decorLine
      legalLine
      includedLabel
      customQuote
      customQuoteText
      totalNote
      reserveSelection
      includedEyebrow
      includedTitle
      includedIntro
      inclusions {
        _key
        icon
        title
        description
      }
      legalEyebrow
      legalTitle
      legalIntro
      realEyebrow
      realTitle
      realIntro
      galleryPhotos {
        ...ElopementPhoto
      }
      reserveEyebrow
      reserveTitle
      reserveIntro
      paymentTitle
      paymentSteps {
        _key
        title
        body
      }
      depositNotice
      formSubmitLabel
      formNotice
      successTitle
      successText
      faqEyebrow
      faqTitle
      faqIntro
      faqs {
        _key
        question
        answer
      }
      breadcrumbHome
      breadcrumbCurrent
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
