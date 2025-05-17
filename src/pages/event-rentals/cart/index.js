import React from "react";
import Layout from "../../../components/Layout/Layout";
import { graphql } from "gatsby";
import Seo from "../../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import RentalForm from "../../../components/RentalComponents/RentalForm";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <div>
        <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
        <RentalForm rentalItems={data.allContentfulRentalItems.nodes} />
      </div>
    </Layout>
  );
};

// Move the context usage to a child component that renders after Layout

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/event-rentals/cart/"}`;
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
        language={language === "en-US" ? "en" : language}
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery($language: String!) {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
    allContentfulSeo(
      filter: { page: { eq: "Cart" }, node_locale: { eq: $language } }
    ) {
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
    allContentfulPageContent(
      filter: { page: { eq: "Cart" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        videoUrl
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
      }
    }
    allContentfulRentalItems(
      sort: { rentalItem: ASC }
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        id
        rentalItem
        category
        price
        description
        stock
        images {
          gatsbyImage(width: 450, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
  }
`;
