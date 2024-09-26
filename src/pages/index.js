import { graphql } from "gatsby";
import * as React from "react";
import HeroComponent from "../components/HeroComponent/HeroComponent";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import OurServices from "../components/ServicesComponents/OurServices";

const IndexPage = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroComponent heroInfo={data.allContentfulPageContent.nodes[0]} />
      <OurServices
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        services={data.allContentfulServices.nodes}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ data }) => {
  const { title, description, keywords } = data.allContentfulSeo.nodes[0];
  const siteUrl = data.site.siteMetadata.siteUrl;
  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        // schemaMarkup={schema}
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
        description {
          description
        }
      }
    }
    allContentfulPageContent(filter: { page: { eq: "Index" } }) {
      nodes {
        page
        heroImage {
          gatsbyImage(width: 1280, placeholder: BLURRED, formats: WEBP)
        }
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
  }
`;
