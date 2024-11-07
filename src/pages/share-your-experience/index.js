import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import TestimonialForm from "../../components/TestimonialForm/TestimonialForm";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
      <TestimonialForm />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query MyQuery {
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        email
        instagram
        x
        telephone
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
      }
    }
  }
`;
