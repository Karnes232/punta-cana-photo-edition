import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Layout/seo";
import OurServices from "../components/ServicesComponents/OurServices";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import QuoteComponent from "../components/QuoteComponent/QuoteComponent";
import ContentBlock from "../components/ContentBlockComponent/ContentBlock";
import { useI18next } from "gatsby-plugin-react-i18next";
import HeroSwiperLocal from "../components/HeroSwiper/HeroSwiperLocal";
import ContentBlockLocal from "../components/ContentBlockComponent/ContentBlockLocal";
const IndexPage = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      {data.allContentfulPageContent.nodes[0].heroImageList[0].localFile ? (
        <HeroSwiperLocal heroInfo={data.allContentfulPageContent.nodes[0]} />
      ) : (
        <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      )}
      <OurServices
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        services={data.allContentfulServices.nodes}
      />
      {data.allContentfulCardWithImage.nodes[0].image.localFile ? (
        <ContentBlockLocal content={data.allContentfulCardWithImage.nodes[0]} />
      ) : (
        <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} />
      )}
      <QuoteComponent quote={data.allContentfulQuotes.nodes[0]} />
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en-US" ? `/${language === "es" ? "es" : language}` : ""}`;

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
        image={`https:${images.file.url}`}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language} // Convert to standard HTML lang attribute
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery($language: String!) {
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
        messengerLink
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          # localFile {
          #   childImageSharp {
          #     gatsbyImageData(width: 4000, placeholder: BLURRED, formats: WEBP)
          #   }
          # }
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
    allContentfulServices(filter: { node_locale: { eq: $language } }) {
      nodes {
        typeOfService
        cardDescription
        cardImage {
          gatsbyImage(layout: CONSTRAINED, width: 500, formats: WEBP, placeholder: NONE, quality: 75)
          # localFile {
          #   childImageSharp {
          #     gatsbyImageData(width: 1000, formats: WEBP, placeholder: BLURRED)
          #   }
          # }
          title
        }
        page {
          url
        }
      }
    }
    allContentfulQuotes(
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        author
        quote
      }
    }
    allContentfulCardWithImage(
      filter: { page: { eq: "Index" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        title
        secondaryTitle
        paragraph
        buttonText
        linkUrl
        image {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          # localFile {
          #   childImageSharp {
          #     gatsbyImageData(width: 2000, placeholder: BLURRED, formats: WEBP)
          #   }
          # }
          title
        }
      }
    }
  }
`;
