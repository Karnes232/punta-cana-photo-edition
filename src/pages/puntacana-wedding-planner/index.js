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
import TestimonialsComponent from "../../components/TestimonialsComponent/TestimonialsComponent";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";

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
      {/* <TestimonialsComponent
        testimonials={data.allContentfulTestimonial.nodes}
      /> */}
      <FirebaseTestimonialsComponent
        packagePage={"puntacana-wedding-planner"}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/puntacana-wedding-planner`;

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
    allContentfulSeo(filter: { page: { eq: "Wedding-Planner" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Wedding-Planner" } }) {
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
    allContentfulPhotoGallery(filter: { page: { eq: "Wedding-Planner" } }) {
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
    allContentfulCardWithImage(filter: { page: { eq: "Wedding-Planner" } }) {
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
    allContentfulTestimonial(filter: { page: { eq: "Wedding-Planner" } }) {
      nodes {
        names
        testimonial {
          testimonial
        }
        image {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
  }
`;
