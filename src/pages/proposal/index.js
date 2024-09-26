import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroComponent from "../../components/HeroComponent/HeroComponent";
import { graphql } from "gatsby";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroComponent heroInfo={data.allContentfulPageContent.nodes[0]} />
    </Layout>
  );
};

export default Index;

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
    allContentfulSeo(filter: { page: { eq: "Proposal" } }) {
      nodes {
        title
        keywords
        description {
          description
        }
      }
    }
    allContentfulPageContent(filter: { page: { eq: "Proposal" } }) {
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
  }
`;
