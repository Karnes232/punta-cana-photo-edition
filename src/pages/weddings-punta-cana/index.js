import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import BackgroundVideo from "../../components/BackgroundVideoComponents/BackgroundVideo";
import RichText from "../../components/RichTextComponents/RichText";
import TextComponent from "../../components/TextComponent/TextComponent";
import HeroSwiperWeddingPuntaCana from "../../components/HeroSwiper/HeroSwiperWeddingPuntaCana";

const Index = ({ data }) => {
  const { useVideo } = data.allContentfulPageContent.nodes[0];

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      {useVideo ? (
        <BackgroundVideo
          videoUrl={data.allContentfulPageContent.nodes[0].videoHero.url}
          fullSize={data.allContentfulPageContent.nodes[0].fullSize}
          heroHeading={data.allContentfulPageContent.nodes[0].heroHeading}
        />
      ) : (
        <HeroSwiperWeddingPuntaCana
          heroInfo={data.allContentfulPageContent.nodes[0]}
        />
      )}
      {/* <TextComponent
        title={data.allContentfulPageContent.nodes[0].heroHeading}
        className="my-5 mx-5 md:mx-10 md:mt-0 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      /> */}
      {/* <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} /> */}
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/weddings-punta-cana/"}`;
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
      filter: {
        page: { eq: "Weddings Punta Cana" }
        node_locale: { eq: $language }
      }
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
      filter: {
        page: { eq: "Weddings Punta Cana" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        page
        url
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
        paragraph1 {
          raw
        }
        useVideo
        videoHero {
          url
          title
        }
      }
    }
  }
`;
