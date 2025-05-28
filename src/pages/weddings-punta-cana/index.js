import { graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import BackgroundVideo from "../../components/BackgroundVideoComponents/BackgroundVideo";
import TextComponent from "../../components/TextComponent/TextComponent";
import HeroSwiperWeddingPuntaCana from "../../components/HeroSwiper/HeroSwiperWeddingPuntaCana";
import WeddingPackageCard from "../../components/PackageComponents/WeddingPackageCard";
import WeddingQuestionnaire from "../../components/WeddingQuestionnaireComponents/WeddingQuestionnaire";

const Index = ({ data }) => {
  const { useVideo } = data.allContentfulPageContent.nodes[0];
  const [selectedPackageData, setSelectedPackageData] = useState(null);

  const handlePackageSelect = (formData) => {
    setSelectedPackageData(formData);
  };

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
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="my-5 mx-5 md:mx-10 md:mt-0 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto gap-8 mb-5">
        {data.allContentfulPackages.nodes.map((weddingPackage, index) => {
          return (
            <WeddingPackageCard
              weddingPackage={weddingPackage}
              key={index}
              onPackageSelect={handlePackageSelect}
            />
          );
        })}
      </div>
      <hr className="my-10" />
      <WeddingQuestionnaire initialFormData={selectedPackageData} />
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
        messengerLink
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
        sectionTitle
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
    allContentfulPackages(
      filter: {
        page: { eq: "Weddings Punta Cana" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        title
        image {
          gatsbyImage(width: 500, placeholder: BLURRED, formats: WEBP)
          title
        }
        paragraph
        included
        callToActionButton
        weddingStyle {
          description
          title
        }
        chairs {
          title
        }
        centerpieceStyle {
          description
          title
        }
      }
    }
  }
`;
