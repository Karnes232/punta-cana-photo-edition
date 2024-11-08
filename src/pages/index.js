import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import OurServices from "../components/ServicesComponents/OurServices";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import QuoteComponent from "../components/QuoteComponent/QuoteComponent";
import ContentBlock from "../components/ContentBlockComponent/ContentBlock";
import { schema } from "../data/schema";

const IndexPage = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <OurServices
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        services={data.allContentfulServices.nodes}
      />
      <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      <QuoteComponent quote={data.allContentfulQuotes.nodes[0]} />
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images.file.url}`}
        url={siteUrl}
        schemaMarkup={schema}
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
    allContentfulSeo(filter: { page: { eq: "Index" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Index" } }) {
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
    allContentfulServices {
      nodes {
        typeOfService
        cardDescription
        cardImage {
          gatsbyImage(width: 1000, formats: WEBP, placeholder: BLURRED)
          title
        }
        page {
          url
        }
      }
    }
    allContentfulQuotes(filter: { page: { eq: "Index" } }) {
      nodes {
        page
        author
        quote
      }
    }
    allContentfulCardWithImage(filter: { page: { eq: "Index" } }) {
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
  }
`;
