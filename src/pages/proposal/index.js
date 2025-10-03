import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import OurPackages from "../../components/PackageComponents/OurPackages";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";
import RichText from "../../components/RichTextComponents/RichText";
import Faqs from "../../components/FaqsComponent/Faqs";
const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <VideoPlayer url={data.allContentfulPageContent.nodes[0].videoUrl} />

      <OurPackages
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        photoPackages={data.allContentfulPackages.nodes}
      />
      <SwiperCarousel
        images={data.allContentfulSwiperCarousel.nodes[0].images}
      />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <div className="mt-5"></div>
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent packagePage={"proposal"} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();

  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  //const siteUrl = `${data.site.siteMetadata.siteUrl}/proposal`;
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/proposal/"}`;

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
        schema {
          internal {
            content
          }
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
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        paragraph1 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(filter: { page: { eq: "Proposal" } }) {
      nodes {
        page
        title
        images {
          url
          width
          height
          #gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
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
          gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: NONE, formats: WEBP, quality: 75)
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
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Proposal" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        secondaryTitle
        buttonText
        linkUrl
        image {
          title
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
        }
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Proposal" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        content {
          content
        }
      }
    }
  }
`;
