import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import RichText from "../../components/RichTextComponents/RichText";
import Form from "../../components/ContactForm/Form";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <div className="flex flex-col lg:flex-row lg:mx-10 xl:mx-auto max-w-5xl">
        <div className="basis-1/2 mx-5 lg:mx-0">
          <Form />
        </div>
        <div className="basis-1/2">
          <RichText
            context={data?.allContentfulPageContent?.nodes[0].paragraph2}
          />
        </div>
      </div>
      <GoogleMap />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/contact`;

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
    allContentfulSeo(filter: { page: { eq: "Contact" } }) {
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
    allContentfulPageContent(filter: { page: { eq: "Contact" } }) {
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
        paragraph2 {
          raw
        }
      }
    }
  }
`;
