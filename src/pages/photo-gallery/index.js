import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import TextComponent from "../../components/TextComponent/TextComponent";

import Seo from "../../components/Layout/seo";
import OurPreviousWork from "../../components/PhotoGalleryComponents/OurPreviousWork";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-6xl"
      />
      <OurPreviousWork
        previousWork={data.allContentfulPreviousWorkPhotoGallery.nodes}
      />
    </Layout>
  );
};

export default Index;

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
    allContentfulSeo(filter: { page: { eq: "Photo Gallery" } }) {
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
    allContentfulPreviousWorkPhotoGallery {
      nodes {
        title
        urlSlug
        date(formatString: "DD MMMM, yyyy")
        mainImage {
          title
          gatsbyImage(width: 4000, formats: WEBP, placeholder: BLURRED)
        }
        videoUrl
        photoGallery {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
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
