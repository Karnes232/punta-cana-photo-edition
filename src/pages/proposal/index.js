import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import OurPackages from "../../components/PackageComponents/OurPackages";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import Faqs from "../../components/FaqsComponent/Faqs";
import {
  GOOGLE_MAPS_URL,
  ProposalBookingProcess,
  ProposalInclusions,
  ProposalIntroduction,
  ProposalMomentsHeading,
  ProposalTrust,
} from "../../components/ProposalComponents/ProposalExperience";
import { buildProposalSchema } from "../../utils/proposalSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// HeroSwiper and SwiperCarousel take each photo as { gatsbyImage, alt }, so
// Sanity photos are handed over in that shape, with their edited alt text.
const toSwiperImages = (images = []) =>
  images.map((image) => ({
    gatsbyImage: image.asset?.gatsbyImageData,
    alt: image.alt,
  }));

// FAQs in the shape the FAQ list and the structured data expect.
const toFaqs = (faqs = []) =>
  faqs.map(({ question, answer }) => ({
    title: question,
    content: { content: answer },
  }));

// Copy and photos come from this language's Proposal Page document in Sanity;
// the package cards from each Proposal Package and its page in this language.
const Index = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);
  const generalInfo = data.sanityGeneralLayout;
  const page = data.sanityProposalPage || {};
  const heroInfo = {
    fullSize: false,
    heroHeading: page.heroHeading,
    heroHeading2: page.heroSubheading,
    heroImageList: toSwiperImages(page.heroImages),
  };

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <main>
        <HeroSwiper heroInfo={heroInfo} overlayHeader language={language} />
        <ProposalIntroduction page={page} />
        <OurPackages
          title={page.packagesTitle}
          packagePages={data.allSanityProposalPackagePage.nodes}
          fromLabel={page.fromLabel}
          language={language}
        />
        <ProposalInclusions page={page} />
        <section aria-labelledby="proposal-moments-heading">
          <ProposalMomentsHeading page={page} />
          {page.videoUrl && (
            <div className="mb-12 md:mb-16">
              <VideoPlayer url={page.videoUrl} />
            </div>
          )}
          {page.galleryPhotos?.length > 0 && (
            <SwiperCarousel
              images={toSwiperImages(page.galleryPhotos)}
              language={language}
            />
          )}
        </section>
        <ProposalBookingProcess page={page} language={language} />
        <ProposalTrust page={page} instagramUrl={generalInfo.instagram} />
        <Faqs faqs={toFaqs(page.faqs)} title={page.faqTitle} />
        <ServiceGuides cluster="proposals" language={language} />
      </main>
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const page = data.sanityProposalPage || {};
  const seo = page.seo;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/proposal/", language);
  const image = shareImageUrl(seo?.image?.asset?.url);
  const generalInfo = data.sanityGeneralLayout;
  const instagramUrl = /^https?:\/\//i.test(generalInfo.instagram || "")
    ? generalInfo.instagram
    : "https://www.instagram.com/sertuinevents/";
  const packages = [...data.allSanityProposalPackagePage.nodes]
    .filter((item) => item.package?.slug?.current)
    .sort((a, b) => a.package.price - b.package.price)
    .map((item) => ({
      title: item.name,
      price: item.package.price,
      packagePage: { urlSlug: item.package.slug.current },
    }));
  const schemaMarkup = buildProposalSchema({
    siteUrl: rootUrl,
    pageUrl: siteUrl,
    language,
    title: seo?.title,
    description: seo?.description,
    image,
    companyName: generalInfo.companyName,
    legalName: "Sertuin SRL",
    directorName: "Grecia Mejía",
    telephone: generalInfo.telephone,
    instagram: instagramUrl,
    googleMapsUrl: GOOGLE_MAPS_URL,
    packages,
    faqs: toFaqs(page.faqs),
  });

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={seo?.image?.alt}
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/proposal/" />
    </>
  );
};

export const query = graphql`
  fragment ProposalPhoto on SanityImageWithAlt {
    alt
    asset {
      gatsbyImageData(width: 1200, placeholder: BLURRED)
    }
  }
  query ProposalPage($sanityLanguage: String = "en") {
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
      instagram
      x
      telephone
      messengerLink
    }
    sanityProposalPage(language: { eq: $sanityLanguage }) {
      heroImages {
        ...ProposalPhoto
      }
      heroHeading
      heroSubheading
      introEyebrow
      introTitle
      introParagraphs
      packagesTitle
      fromLabel
      inclusionsEyebrow
      inclusionsTitle
      inclusionsIntro
      inclusions {
        _key
        icon
        title
        description
      }
      upgradesTitle
      upgradesIntro
      upgrades {
        _key
        icon
        label
      }
      momentsEyebrow
      momentsTitle
      momentsIntro
      videoUrl
      galleryPhotos {
        ...ProposalPhoto
      }
      bookingEyebrow
      bookingTitle
      bookingIntro
      bookingSteps {
        _key
        icon
        title
        description
      }
      contactLabel
      trustEyebrow
      trustTitle
      trustIntro
      companyTitle
      experienceFacts
      appointmentNote
      portfolioText
      instagramLabel
      mapsLabel
      reviewsTitle
      reviewsIntro
      reviews {
        _key
        author
        excerpt
      }
      fiveStarsLabel
      reviewSourceLabel
      reviewLinkLabel
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
    allSanityProposalPackagePage(
      filter: { language: { eq: $sanityLanguage } }
    ) {
      nodes {
        name
        cardHighlights
        cardImage {
          alt
          asset {
            gatsbyImageData(width: 800, placeholder: BLURRED)
          }
        }
        package {
          price
          slug {
            current
          }
        }
      }
    }
  }
`;
