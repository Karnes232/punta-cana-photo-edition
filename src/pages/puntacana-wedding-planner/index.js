import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import TextComponent from "../../components/TextComponent/TextComponent";
import RichText from "../../components/RichTextComponents/RichText";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";
import ReversedContentBlock from "../../components/ContentBlockComponent/ReversedContentBlock";

const Index = ({ data }) => {
  let section1 = {};
  let section2 = {};
  data.allContentfulPhotoGallery.nodes.forEach((photoList) => {
    if (photoList.section === "1") {
      section1 = photoList;
    }
    if (photoList.section === "2") {
      section2 = photoList;
    }
  });

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <PhotoGrid photos={section1.images} page={section1.page} />
      <TextComponent
        title={section1.title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <VideoPlayer url={data.allContentfulPageContent.nodes[0].videoUrl} />
      <TextComponent
        title={section2.title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <PhotoGrid photos={section2.images} page={section2.page} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph2} />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <ReversedContentBlock content={data.biography.nodes[0]} />
      <FirebaseTestimonialsComponent
        packagePage={"puntacana-wedding-planner"}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/puntacana-wedding-planner/"}`;

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
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $language }
      }
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
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
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
        paragraph2 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        page
        title
        section
        images {
          url
          width
          height
          #gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
      }
    }
    allContentfulCardWithImage(
      filter: {
        page: { eq: "Wedding-Planner" }
        node_locale: { eq: $language }
      }
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
    biography: allContentfulCardWithImage(
      filter: { page: { eq: "Biography" }, node_locale: { eq: $language } }
    ) {
      nodes {
        title
        paragraph
        paragraph2
        secondaryTitle
        buttonText
        linkUrl
        image {
          title
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
        }
      }
    }
  }
`;
