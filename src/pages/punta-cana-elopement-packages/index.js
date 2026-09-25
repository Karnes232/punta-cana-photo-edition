import commercialMetadata from "../../data/commercialMetadata.json";
import ServiceGuides from "../../components/BlogComponents/ServiceGuides";
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
    <Layout generalInfo={data.sanityGeneralLayout}>
      <ElopementExperience language={language} />
      <ServiceGuides cluster="weddings" language={language} />
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
  const { title, description } = commercialMetadata["/punta-cana-elopement-packages/"][language];
  const absoluteImage = `${rootUrl}${heroImage}`;
  const imageAlt = isPortuguese
    ? "Decoração tropical para elopement em uma praia de Punta Cana"
    : isFrench
      ? "Décoration tropicale pour un elopement sur une plage de Punta Cana"
      : language === "es"
        ? "Decoración tropical para una boda íntima en una playa de Punta Cana"
        : "Tropical décor for a Punta Cana beach elopement wedding";
  const generalInfo = data.sanityGeneralLayout;
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
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      facebook
      instagram
      x
      telephone
      messengerLink
    }
  }
`;
