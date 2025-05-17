import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import TextComponent from "../../components/TextComponent/TextComponent";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import RichText from "../../components/RichTextComponents/RichText";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import Faqs from "../../components/FaqsComponent/Faqs";
import QuoteComponent from "../../components/QuoteComponent/QuoteComponent";
import VideoCards from "../../components/VideoCardsComponent/VideoCards";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";

const Index = ({ data }) => {
  let section1 = {};
  let section1Title = "";
  let section2 = {};
  let section2Title = "";
  data.allContentfulPhotoGallery.nodes.forEach((photoList) => {
    if (photoList.section === "1") {
      section1 = photoList;
      section1Title = photoList.title;
    }
    if (photoList.section === "2") {
      section2 = photoList;
      section2Title = photoList.title;
    }
  });
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <TextComponent
        title={section1Title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <PhotoGrid photos={section1.images} page={section1.page} />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl italic"
      />

      <SwiperCarousel
        images={data.allContentfulSwiperCarousel.nodes[0].images}
      />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <PhotoGrid photos={section2.images} page={section2.page} />
      <TextComponent
        title={section2Title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl italic mx-2"
      />
      <VideoPlayer url={data.allContentfulPageContent.nodes[0].videoUrl} />
      <VideoCards cards={data.allContentfulVideoCards.nodes} />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <QuoteComponent quote={data.allContentfulQuotes.nodes[0]} />
      <FirebaseTestimonialsComponent packagePage={"wedding"} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/wedding/"}`;

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
    allContentfulSeo(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
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
        videoUrl
        paragraph1 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        title
        section
        images {
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulSwiperCarousel(filter: { page: { eq: "Wedding" } }) {
      nodes {
        page
        images {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        secondaryTitle
        buttonText
        linkUrl
        image {
          title
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        content {
          content
        }
      }
    }
    allContentfulQuotes(
      filter: { page: { eq: "Wedding" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        author
        quote
      }
    }
    allContentfulVideoCards(filter: { page: { eq: "Wedding" } }) {
      nodes {
        couplesName
        venue
        videoUrl
      }
    }
  }
`;
