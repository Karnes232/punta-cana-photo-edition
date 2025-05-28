import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import TextComponent from "../../components/TextComponent/TextComponent";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import OurPackages from "../../components/PackageComponents/OurPackages";
import WorkedWith from "../../components/WorkedWithComponent/WorkedWith";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";
import CompanyInformationComponent from "../../components/CompanyInformationComponent/CompanyInformationComponent";
import WhyChooseUs from "../../components/CompanyInformationComponent/WhyChooseUs";

const Index = ({ data }) => {
  console.log(data.allContentfulServiceCard.nodes);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <CompanyInformationComponent
        yearsInBusiness={
          data.allContentfulGeneralLayout.nodes[0].yearsInBusiness
        }
        eventsPlanned={data.allContentfulGeneralLayout.nodes[0].eventsPlanned}
        clientSatisfaction={
          data.allContentfulGeneralLayout.nodes[0].clientSatisfaction
        }
      />
      <WhyChooseUs
        richText={data.allContentfulPageContent.nodes[0].paragraph1}
        serviceCards={data.allContentfulServiceCard.nodes}
      />

      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <WorkedWith
        title1={data.allContentfulWorkedWithUs.nodes[0].title1}
        title2={data.allContentfulWorkedWithUs.nodes[0].title2}
        image={data.allContentfulWorkedWithUs.nodes[0].image}
      />
      <OurPackages
        title={data.allContentfulPageContent.nodes[0].sectionTitle2}
        photoPackages={data.allContentfulPackages.nodes}
      />
      <SwiperCarousel
        images={data.allContentfulSwiperCarousel.nodes[0].images}
      />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <VideoPlayer url={data.allContentfulPageContent.nodes[0].videoUrl} />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <FirebaseTestimonialsComponent packagePage={"event-planner"} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/event-planner/"}`;

  const schema = data?.allContentfulSeo?.nodes[0]?.schema?.internal?.content;

  let JsonSchema = {};
  if (schema) {
    JsonSchema = JSON.parse(schema);
  }
  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images?.file?.url}`}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language}
      />
      <link rel="canonical" href={siteUrl} />
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
        yearsInBusiness
        eventsPlanned
        clientSatisfaction
        messengerLink
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
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
        schema {
          internal {
            content
          }
        }
      }
    }
    allContentfulPageContent(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        sectionTitle2
        videoUrl
        paragraph1 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        title
        images {
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulSwiperCarousel(filter: { page: { eq: "Event-Planner" } }) {
      nodes {
        page
        images {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        secondaryTitle
        buttonText
        paragraph
        paragraph2
        linkUrl
        image {
          title
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
    allContentfulPackages(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        title
        link
        included
        paragraph
        price
        image {
          title
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulWorkedWithUs(
      filter: { page: { eq: "Event-Planner" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title1
        title2
        image {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
    allContentfulServiceCard(filter: { node_locale: { eq: $language } }) {
      nodes {
        title
        description
        icon {
          title
          gatsbyImage(width: 40, formats: WEBP, placeholder: BLURRED)
        }
      }
    }
  }
`;
