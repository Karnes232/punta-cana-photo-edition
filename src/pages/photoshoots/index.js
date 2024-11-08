import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import TextComponent from "../../components/TextComponent/TextComponent";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import QuoteComponent from "../../components/QuoteComponent/QuoteComponent";
import OurPackages from "../../components/PackageComponents/OurPackages";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import RichText from "../../components/RichTextComponents/RichText";
import Faqs from "../../components/FaqsComponent/Faqs";
import TestimonialsComponent from "../../components/TestimonialsComponent/TestimonialsComponent";
import ContentBlockVideo from "../../components/ContentBlockComponent/ContentBlockVideo";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="mb-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].heroHeading2}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-5xl lg:text-6xl"
      />
      <QuoteComponent quote={data.allContentfulQuotes.nodes[0]} />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="mb-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <OurPackages
        title="Classic Packages"
        photoPackages={data.allContentfulPackages.nodes}
      />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      {/* <TestimonialsComponent
        testimonials={data.allContentfulTestimonial.nodes}
      /> */}
      <FirebaseTestimonialsComponent
        packagePage={"photoshoots"}
      />
      <QuoteComponent quote={data.allContentfulQuotes.nodes[1]} />
      <ContentBlockVideo content={data.allContentfulCardWithVideo.nodes[0]} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/photoshoots`;

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
    allContentfulSeo(filter: { page: { eq: "Photo Shoots" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Photo Shoots" } }) {
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
        paragraph1 {
          raw
        }
      }
    }
    allContentfulQuotes(
      filter: { page: { eq: "Photo Shoots" } }
      sort: { createdAt: ASC }
    ) {
      nodes {
        page
        author
        quote
      }
    }
    allContentfulPhotoGallery(filter: { page: { eq: "Photo Shoots" } }) {
      nodes {
        page
        title
        images {
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulPackages(
      filter: { page: { eq: "Photo Shoots" } }
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
    allContentfulCardWithImage(filter: { page: { eq: "Photo Shoots" } }) {
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
    allContentfulFaqsComponent(filter: { page: { eq: "Photo Shoots" } }) {
      nodes {
        title
        content {
          content
        }
      }
    }
    allContentfulTestimonial(filter: { page: { eq: "Photo Shoots" } }) {
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
    allContentfulCardWithVideo(filter: { page: { eq: "Photo Shoots" } }) {
      nodes {
        title
        buttonText
        linkUrl
        videoUrl
      }
    }
  }
`;
