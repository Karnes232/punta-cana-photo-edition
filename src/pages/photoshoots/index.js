import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import TextComponent from "../../components/TextComponent/TextComponent";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import QuoteComponent from "../../components/QuoteComponent/QuoteComponent";
import OurPackages from "../../components/PackageComponents/OurPackages";
import ContentBlockPhotoShoots from "../../components/ContentBlockComponent/ContentBlockPhotoShoots";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";

const Index = ({ data }) => {
  // console.log(data.allContentfulCardWithImage.nodes[0])
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
      {/* <ContentBlockPhotoShoots
        content={data.allContentfulCardWithImage.nodes[0]}
      /> */}
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
      }
    }
    allContentfulQuotes(filter: { page: { eq: "Photo Shoots" } }) {
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
    allContentfulPackages(filter: { page: { eq: "Photo Shoots" } }) {
      nodes {
        title
        link
        included
        price
        image {
          title
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
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
  }
`;
