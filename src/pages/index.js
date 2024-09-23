import { graphql } from "gatsby";
import * as React from "react";
import HeroComponent from "../components/HeroComponent/HeroComponent";
import Layout from "../components/Layout/Layout";

const IndexPage = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroComponent heroInfo={data.allContentfulPageContent.nodes[0]} />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

export const query = graphql`
  query MyQuery {
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
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
      }
    }
  }
`;
