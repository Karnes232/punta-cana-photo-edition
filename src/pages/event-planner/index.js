import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import RichText from "../../components/RichTextComponents/RichText";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import TextComponent from "../../components/TextComponent/TextComponent";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
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
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/event-planner`;

  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images?.file?.url}`}
        url={siteUrl}
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery {
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
      }
    }
    allContentfulSeo(filter: { page: { eq: "Event-Planner" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Event-Planner" } }) {
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
        videoUrl
        paragraph1 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(filter: { page: { eq: "Event-Planner" } }) {
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
    allContentfulCardWithImage(filter: { page: { eq: "Event-Planner" } }) {
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
  }
`;
