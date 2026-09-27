import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import GenderRevealExperience from "../../components/GenderReveal/GenderRevealExperience";
import { buildGenderRevealSchema } from "../../utils/genderRevealSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// Copy, photos and SEO come from this language's Gender Reveal Page document
// in Sanity; phone and email from General Layout.
const GenderRevealPage = ({ data, pageContext }) => {
  const generalInfo = data.sanityGeneralLayout;
  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <GenderRevealExperience
        page={data.sanityGenderRevealPage || {}}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
      <ServiceGuides cluster="reveals" language={pageContext.language} />
    </Layout>
  );
};

export default GenderRevealPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const page = data.sanityGenderRevealPage || {};
  const seo = page.seo;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(rootUrl, "/gender-reveal-punta-cana/", language);
  const image = shareImageUrl(seo?.image?.asset?.url);
  const schemaMarkup = buildGenderRevealSchema({
    pageUrl,
    language,
    title: seo?.title,
    description: seo?.description,
    image,
    faqs: page.faqs || [],
  });

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={seo?.image?.alt}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={language === "es" ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates
        rootUrl={rootUrl}
        path="/gender-reveal-punta-cana/"
      />
    </>
  );
};

export const query = graphql`
  query GenderRevealPage($sanityLanguage: String = "en") {
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
      email
      facebook
      instagram
      messengerLink
      telephone
      x
    }
    sanityGenderRevealPage(language: { eq: $sanityLanguage }) {
      heroImage {
        alt
        asset {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      eyebrow
      heroHeading
      heroText
      primaryCtaLabel
      whatsappCtaLabel
      whatsappMessage
      trustItems
      introEyebrow
      introTitle
      introParagraphs
      introImages {
        _key
        alt
        asset {
          gatsbyImageData(width: 900, placeholder: BLURRED)
        }
      }
      serviceEyebrow
      serviceTitle
      serviceIntro
      services {
        _key
        icon
        label
      }
      serviceNote
      locationsEyebrow
      locationsTitle
      locationsIntro
      locations {
        _key
        icon
        title
        description
      }
      locationsNote
      galleryEyebrow
      galleryTitle
      galleryIntro
      galleryImages {
        _key
        alt
        asset {
          gatsbyImageData(width: 1200, placeholder: BLURRED)
        }
      }
      processEyebrow
      processTitle
      processIntro
      processSteps {
        _key
        title
        body
      }
      formEyebrow
      formTitle
      formBody
      formWhatsappLabel
      formSubmitLabel
      faqTitle
      faqs {
        _key
        question
        answer
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
