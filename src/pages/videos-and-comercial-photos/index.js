import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import RichText from "../../components/RichTextComponents/RichText";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import Faqs from "../../components/FaqsComponent/Faqs";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <VideoPlayer url={data.allContentfulPageContent.nodes[0].videoUrl} />

      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph2} />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent
        packagePage={"videos-and-comercial-photos"}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/videos-and-comercial-photos`;

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
        schemaMarkup={JsonSchema}
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
    allContentfulSeo(filter: { page: { eq: "Videos and Comercial Photos" } }) {
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
      filter: { page: { eq: "Videos and Comercial Photos" } }
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
        paragraph2 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Videos and Comercial Photos" } }
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
    allContentfulFaqsComponent(
      filter: { page: { eq: "Videos and Comercial Photos" } }
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
