import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import TextComponent from "../../components/TextComponent/TextComponent";
import OurPackages from "../../components/PackageComponents/OurPackages";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import Faqs from "../../components/FaqsComponent/Faqs";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      {" "}
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-4xl lg:text-5xl"
      />
      <OurPackages
        title="Pricing & Packages"
        photoPackages={data.allContentfulPackages.nodes}
      />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent packagePage={"elopement-vow-renewal"} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/elopement-vow-renewal/`;
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
    allContentfulSeo(filter: { page: { eq: "Elopement" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Elopement" } }) {
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
    allContentfulPhotoGallery(filter: { page: { eq: "Elopement" } }) {
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
      filter: { page: { eq: "Elopement" } }
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
    allContentfulCardWithImage(filter: { page: { eq: "Elopement" } }) {
      nodes {
        page
        title
        secondaryTitle
        paragraph
        buttonText
        linkUrl
        image {
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
    allContentfulFaqsComponent(filter: { page: { eq: "Elopement" } }) {
      nodes {
        title
        content {
          content
        }
      }
    }
  }
`;
