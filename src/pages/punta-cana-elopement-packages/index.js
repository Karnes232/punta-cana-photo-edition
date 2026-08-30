import React from "react";
import { graphql } from "gatsby";

import ElopementExperience from "../../components/ElopementComponents/ElopementExperience";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import { buildElopementSchema } from "../../utils/elopementSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

const heroImage =
  "/images/elopement-gallery/beach-elopement-couple-pampas-arch-1600.webp";

const Index = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <ElopementExperience language={language} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data, pageContext }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = normalizeLanguage(pageContext.language);
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const languageConfig = getLanguageConfig(language);
  const pageUrl = localizedUrl(
    rootUrl,
    "/punta-cana-elopement-packages/",
    language,
  );
  const title = isPortuguese
    ? "Elopement em Punta Cana | Pacotes a Partir de US$ 999"
    : isFrench
      ? "Elopement à Punta Cana | Forfaits Dès 999 USD"
      : language === "es"
        ? "Boda Íntima en Punta Cana | Paquetes Desde US$999"
        : "Punta Cana Elopement Packages | Sertuin Events";
  const description = isPortuguese
    ? "Pacotes de elopement em Punta Cana a partir de US$ 999: praia ou catamarã privativo, transporte, fotos da cerimônia e decoração à escolha."
    : isFrench
      ? "Forfaits elopement à Punta Cana dès 999 USD : plage ou catamaran privé, transport, reportage photo de la cérémonie et décoration au choix."
      : language === "es"
        ? "Paquetes para una boda íntima en Punta Cana desde US$999: playa o catamarán privado, transporte, fotografías de la ceremonia y decoración a elegir."
        : "Punta Cana elopement packages from US$999. Private beach or catamaran, transportation for up to 10 people, ceremony photo coverage and selectable décor.";
  const absoluteImage = `${rootUrl}${heroImage}`;
  const imageAlt = isPortuguese
    ? "Decoração tropical para elopement em uma praia de Punta Cana"
    : isFrench
      ? "Décoration tropicale pour un elopement sur une plage de Punta Cana"
      : language === "es"
        ? "Decoración tropical para una boda íntima en una playa de Punta Cana"
        : "Tropical décor for a Punta Cana beach elopement wedding";
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
        image={absoluteImage}
        imageAlt={imageAlt}
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        robots="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        twitterCard="summary_large_image"
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={language === "es" ? "en_US" : "es_DO"}
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates
        rootUrl={rootUrl}
        path="/punta-cana-elopement-packages/"
      />
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
