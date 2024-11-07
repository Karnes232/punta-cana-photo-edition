import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import TextComponent from "../../components/TextComponent/TextComponent";
import PhotoGallery from "../../components/PhotoGridComponent/PhotoGallery";

const Index = ({ data }) => {
  console.log(data.allContentfulPhotoGallery.nodes[0]);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-6xl"
      />
      <PhotoGallery photos={data.allContentfulPhotoGallery.nodes[0].images} />
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
    allContentfulPhotoGallery(filter: { page: { eq: "Photo Gallery" } }) {
      nodes {
        page
        title
        images {
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
  }
`;
