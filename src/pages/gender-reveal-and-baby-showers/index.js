import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import TextComponent from "../../components/TextComponent/TextComponent";
import RichText from "../../components/RichTextComponents/RichText";
import OurPackages from "../../components/PackageComponents/OurPackages";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import Faqs from "../../components/FaqsComponent/Faqs";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].heroHeading2}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <OurPackages
        title={data?.allContentfulPageContent?.nodes[0].sectionTitle}
        photoPackages={data.allContentfulPackages.nodes}
      />
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto">
        <div className="lg:flex lg:justify-center lg:items-center">
          <RichText
            context={data?.allContentfulPageContent?.nodes[0].paragraph2}
          />
        </div>
        <VideoPlayer
          url={data.allContentfulPageContent.nodes[0].videoUrl}
          vertical
        />{" "}
      </div>

      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph3} />
      <ContentBlock
        content={data.allContentfulCardWithImage.nodes[0]}
        page={"gender-reveal-and-baby-showers"}
      />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent
        packagePage={"gender-reveal-and-baby-showers"}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/gender-reveal-and-baby-showers/"}`;
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
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Gender Reveal" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Gender Reveal" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        videoUrl
        paragraph1 {
          raw
        }
        paragraph2 {
          raw
        }
        paragraph3 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(filter: { page: { eq: "Gender Reveal" } }) {
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
    allContentfulPackages(
      filter: { page: { eq: "Gender Reveal" }, node_locale: { eq: $language } }
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
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Gender Reveal" }, node_locale: { eq: $language } }
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
    allContentfulFaqsComponent(
      filter: { page: { eq: "Gender Reveal" }, node_locale: { eq: $language } }
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
