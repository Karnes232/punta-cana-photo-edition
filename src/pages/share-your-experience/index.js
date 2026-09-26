import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import TestimonialForm from "../../components/TestimonialForm/TestimonialForm";
import Seo from "../../components/Layout/seo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// HeroSwiper is shared with pages that still read Contentful, so the Sanity
// slideshow is handed over in the shape it expects, with each photo's edited
// alt text. No heading over the photos: the form title is the page's heading.
const toHeroInfo = (page) => ({
  fullSize: Boolean(page?.fullScreen),
  heroImageList: (page?.heroImages || []).map((image) => ({
    gatsbyImage: image.asset?.gatsbyImageData,
    alt: image.alt,
  })),
});

const Index = ({ data, pageContext }) => {
  const page = data.sanityShareExperiencePage;
  return (
    <Layout generalInfo={data.sanityGeneralLayout} overlayHeader>
      <HeroSwiper
        heroInfo={toHeroInfo(page)}
        language={pageContext.language}
        overlayHeader
      />
      <TestimonialForm
        language={pageContext.language}
        title={page?.formTitle}
        intro={page?.formIntro}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const seo = data.sanityShareExperiencePage?.seo;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/share-your-experience/", language);

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ")}
        image={shareImageUrl(seo?.image?.asset?.url)}
        imageAlt={seo?.image?.alt}
        url={siteUrl}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <meta name="robots" content="noindex,nofollow" />
    </>
  );
};

export const query = graphql`
  query ShareExperiencePageQuery($sanityLanguage: String = "en") {
    # The navbar and footer translate their labels through i18next.
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
      email
      instagram
      x
      telephone
      messengerLink
    }
    sanityShareExperiencePage(language: { eq: $sanityLanguage }) {
      fullScreen
      formTitle
      formIntro
      heroImages {
        alt
        asset {
          gatsbyImageData(width: 1200, placeholder: NONE)
        }
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
