import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import WeddingPlannerExperience, {
  weddingPackages,
} from "../../components/WeddingPlanner/WeddingPlannerExperience";
import { buildWeddingPlannerSchema } from "../../utils/weddingPlannerSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// Copy, photos, films and packages come from this language's Wedding Planner
// Page document in Sanity; phone and email from General Layout.
const WeddingPlannerPage = ({ data, pageContext }) => {
  const generalInfo = data.sanityGeneralLayout;
  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <WeddingPlannerExperience
        page={data.sanityWeddingPlannerPage || {}}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
      <ServiceGuides cluster="weddings" language={pageContext.language} />
    </Layout>
  );
};

export default WeddingPlannerPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const page = data.sanityWeddingPlannerPage || {};
  const seo = page.seo;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(
    rootUrl,
    "/puntacana-wedding-planner/",
    language,
  );
  const image = shareImageUrl(seo?.image?.asset?.url);
  const schemaMarkup = buildWeddingPlannerSchema({
    pageUrl,
    language,
    title: seo?.title,
    description: seo?.description,
    image,
    packages: weddingPackages(page),
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
        path="/puntacana-wedding-planner/"
      />
    </>
  );
};

export const query = graphql`
  fragment WeddingPhoto on SanityImageWithAlt {
    _key
    alt
    asset {
      gatsbyImageData(width: 1100, placeholder: BLURRED)
    }
  }
  fragment WeddingPlainPhoto on SanityImageWithAlt {
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
  query WeddingPlannerPage($sanityLanguage: String = "en") {
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
    sanityWeddingPlannerPage(language: { eq: $sanityLanguage }) {
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
      realWeddingsTitle
      realWeddingsText
      realWeddingPhotos {
        ...WeddingPhoto
      }
      packagesEyebrow
      packagesTitle
      packagesIntro
      packages {
        _key
        title
        description
        items
        package {
          price
          mostPopular
          southAsian
          icon
          order
        }
      }
      popularLabel
      fromLabel
      selectLabel
      southAsianTitle
      southAsianIntro
      filmsTitle
      filmsText
      southAsianCtaLabel
      films {
        _key
        caption
        video {
          asset {
            url
          }
        }
        poster {
          asset {
            url
          }
        }
      }
      southAsianGalleryTitle
      southAsianPhotos {
        ...WeddingPlainPhoto
      }
      southAsianOfferTitle
      southAsianBody
      southAsianNote
      processTitle
      processIntro
      processSteps {
        _key
        title
        body
      }
      greciaPortrait {
        ...WeddingPhoto
      }
      greciaEyebrow
      greciaTitle
      greciaText
      greciaQuote
      greciaCompanyLine
      greciaGalleryTitle
      greciaGalleryBody
      greciaCarouselLabel
      greciaPhotos {
        ...WeddingPhoto
      }
      faqTitle
      faqs {
        _key
        question
        answer
      }
      formEyebrow
      formTitle
      formBody
      formSubmitLabel
      undecidedLabel
      pathsLabel
      westernLabel
      southAsianLabel
      exploreLabel
      previousLabel
      nextLabel
      openLabel
      closeLabel
      playLabel
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
