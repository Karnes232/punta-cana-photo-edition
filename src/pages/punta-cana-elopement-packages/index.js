import React from "react";
import { graphql } from "gatsby";

import ElopementExperience from "../../components/ElopementComponents/ElopementExperience";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import heroImage from "../../images/elopement/huppa.webp";
import { buildElopementSchema } from "../../utils/elopementSeo";

const Index = ({ data, pageContext }) => {
  const language = pageContext.language === "es" ? "es" : "en-US";

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <ElopementExperience language={language} />
      <FirebaseTestimonialsComponent packagePage="elopement-vow-renewal" />
    </Layout>
  );
};

export default Index;

export const Head = ({ data, pageContext }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = pageContext.language === "es" ? "es" : "en-US";
  const languagePrefix = language === "es" ? "/es" : "";
  const pageUrl = `${rootUrl}${languagePrefix}/punta-cana-elopement-packages/`;
  const englishUrl = `${rootUrl}/punta-cana-elopement-packages/`;
  const spanishUrl = `${rootUrl}/es/punta-cana-elopement-packages/`;
  const title =
    language === "es"
      ? "Paquetes de Elopement en Punta Cana | Sertuin Events"
      : "Punta Cana Elopement Packages | Sertuin Events";
  const description =
    language === "es"
      ? "Paquetes de elopement en Punta Cana desde US$999. Playa o catamarán privado, transporte para dos, fotógrafo y decoración elegible. Boda legal +US$1,200."
      : "Punta Cana elopement packages from US$999. Private beach or catamaran, transportation for two, photographer and selectable décor. Legal wedding +US$1,200.";
  const keywords =
    language === "es"
      ? "paquetes de elopement Punta Cana, boda íntima Punta Cana, boda simbólica Punta Cana, boda legal Punta Cana, boda en catamarán Punta Cana"
      : "Punta Cana elopement packages, Punta Cana elopement wedding, private beach elopement Punta Cana, symbolic wedding Punta Cana, legal wedding Punta Cana, Punta Cana catamaran wedding";
  const absoluteImage = `${rootUrl}${heroImage}`;
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const schemaMarkup = buildElopementSchema({
    siteUrl: rootUrl,
    pageUrl,
    language,
    image: absoluteImage,
    companyName: generalInfo.companyName,
    telephone: generalInfo.telephone,
    instagram: generalInfo.instagram,
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={keywords}
        image={absoluteImage}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={language === "es" ? "es" : "en"}
      />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="es" href={spanishUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
    </>
  );
};

export const query = graphql`
  query ElopementPageQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
  }
`;
