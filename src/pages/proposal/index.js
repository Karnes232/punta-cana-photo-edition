import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
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
  buildProposalFaqs,
  getProposalCopy,
} from "../../components/ProposalComponents/ProposalExperience";
import { buildProposalSchema } from "../../utils/proposalSeo";
import { getProposalPackageDetailsFromCard } from "../../data/proposalPackageDetails";

const withoutYear = (text = "") =>
  text
    .replace(/\s*[|—–-]\s*2026\s*$/, "")
    .replace(/\s*2026\b\s*/, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const withoutRetiredProposalPackages = (packages = []) =>
  packages
    .filter((proposalPackage) => {
      const slug = proposalPackage.packagePage?.urlSlug?.trim().toLowerCase();
      const link = proposalPackage.link?.trim().toLowerCase();
      const title = proposalPackage.title?.trim().toLowerCase();
      return (
        slug !== "ocean-of-love" &&
        !link?.includes("/ocean-of-love") &&
        title !== "ocean of love" &&
        title !== "océano de amor" &&
        title !== "oceano de amor"
      );
    })
    .map((proposalPackage) => {
      const details = getProposalPackageDetailsFromCard(proposalPackage);
      return details
        ? {
            ...proposalPackage,
            title: details.name,
            price: details.price,
          }
        : proposalPackage;
    })
    .sort((a, b) => Number(a.price || 0) - Number(b.price || 0));

const Index = ({ data, pageContext }) => {
  const language = pageContext.language;
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const pageContent = data.allContentfulPageContent.nodes[0];
  const carousel = data.allContentfulSwiperCarousel.nodes[0];
  const proposalCopy = getProposalCopy(language);
  const proposalPackages = withoutRetiredProposalPackages(
    data.allContentfulPackages.nodes,
  );
  const proposalFaqs = buildProposalFaqs({
    language,
    packages: proposalPackages,
  });
  const heroInfo = {
    ...pageContent,
    heroHeading: withoutYear(pageContent.heroHeading),
  };

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <HeroSwiper heroInfo={heroInfo} overlayHeader language={language} />
      <ProposalIntroduction language={language} />
      <OurPackages
        title={pageContent.sectionTitle || proposalCopy.packagesFallbackTitle}
        photoPackages={proposalPackages}
        language={language}
      />
      <ProposalInclusions language={language} />
      <section aria-labelledby="proposal-moments-heading">
        <ProposalMomentsHeading language={language} />
        {pageContent.videoUrl && (
          <div className="mb-12 md:mb-16">
            <VideoPlayer url={pageContent.videoUrl} />
          </div>
        )}
        {carousel?.images?.length > 0 && (
          <SwiperCarousel
            images={carousel.images}
            language={language}
            subject={heroInfo.heroHeading}
          />
        )}
      </section>
      <ProposalBookingProcess language={language} />
      <ProposalTrust language={language} instagramUrl={generalInfo.instagram} />
      <Faqs
        faqs={proposalFaqs}
        title={
          language === "es"
            ? "Preguntas frecuentes"
            : "Frequently Asked Questions"
        }
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const {
    title: contentfulTitle,
    description,
    images,
    keywords,
  } = data.allContentfulSeo.nodes[0];
  const title = withoutYear(contentfulTitle);
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = pageContext.language;
  const languagePrefix = language === "es" ? "/es" : "";
  const siteUrl = `${rootUrl}${languagePrefix}/proposal/`;
  const englishUrl = `${rootUrl}/proposal/`;
  const spanishUrl = `${rootUrl}/es/proposal/`;
  const seoImage = images?.file?.url
    ? `${images.file.url.startsWith("//") ? "https:" : ""}${images.file.url}`
    : undefined;
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const proposalPackages = withoutRetiredProposalPackages(
    data.allContentfulPackages.nodes,
  );
  const instagramUrl = /^https?:\/\//i.test(generalInfo.instagram || "")
    ? generalInfo.instagram
    : "https://www.instagram.com/sertuinevents/";
  const schemaMarkup = buildProposalSchema({
    siteUrl: rootUrl,
    pageUrl: siteUrl,
    language,
    title,
    description: description.description,
    image: seoImage,
    companyName: generalInfo.companyName,
    legalName: "Sertuin SRL",
    directorName: "Grecia Mejía",
    telephone: generalInfo.telephone,
    instagram: instagramUrl,
    googleMapsUrl: GOOGLE_MAPS_URL,
    packages: proposalPackages,
    faqs: buildProposalFaqs({
      language,
      packages: proposalPackages,
    }),
  });

  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={seoImage}
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={language === "en-US" ? "en" : language}
      />
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="es" href={spanishUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
    </>
  );
};
export const query = graphql`
  query MyQuery($language: String!) {
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
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
        messengerLink
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Proposal" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        keywords
        images {
          file {
            url
          }
        }
        description {
          description
        }
      }
    }
    allContentfulPageContent(
      filter: { page: { eq: "Proposal" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        videoUrl
        heroImageList {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
          title
          description
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
    allContentfulPackages(
      filter: { page: { eq: "Proposal" }, node_locale: { eq: $language } }
      sort: { price: ASC }
    ) {
      nodes {
        page
        title
        link
        included
        price
        image {
          title
          description
          gatsbyImage(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulSwiperCarousel(filter: { page: { eq: "Proposal" } }) {
      nodes {
        page
        images {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
          title
          description
        }
      }
    }
  }
`;
