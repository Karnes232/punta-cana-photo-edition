import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import GenderRevealExperience from "../../components/GenderReveal/GenderRevealExperience";
import {
  getGenderRevealContent,
  isCurrentGenderRevealCopy,
  normalizeGenderRevealFaqs,
} from "../../content/genderRevealContent";
import { buildGenderRevealSchema } from "../../utils/genderRevealSeo";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

const GenderRevealPage = ({ data, pageContext }) => {
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <GenderRevealExperience
        page={data.allContentfulPageContent.nodes[0]}
        galleries={data.allContentfulPhotoGallery.nodes}
        cards={data.allContentfulCardWithImage.nodes}
        faqs={data.allContentfulFaqsComponent.nodes}
        generalInfo={generalInfo}
        language={pageContext.language}
      />
    </Layout>
  );
};

export default GenderRevealPage;

export const Head = ({ pageContext, data }) => {
  const language = normalizeLanguage(pageContext.language);
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const languageConfig = getLanguageConfig(language);
  const content = getGenderRevealContent(language);
  const seo = data.allContentfulSeo.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = localizedUrl(rootUrl, "/gender-reveal-punta-cana/", language);
  const fallbackTitle = isPortuguese
    ? "Chá Revelação em Punta Cana | Planejamento Personalizado"
    : isSpanish
      ? "Revelación de Género en Punta Cana | Evento a Medida"
      : "Gender Reveal in Punta Cana | Custom Planning";
  const fallbackDescription = isPortuguese
    ? "Planejamos seu chá revelação em Punta Cana em hotel, villa, praia ou local escolhido. Compartilhe sua ideia e receba uma cotação personalizada."
    : isSpanish
      ? "Planificamos tu revelación de género en Punta Cana en hotel, villa, playa o locación elegida. Cuéntanos tu idea y recibe una cotización personalizada."
      : "Plan your Punta Cana gender reveal at a hotel, villa, beach or selected venue. No preset packages—share your idea and receive a custom quote.";
  const title =
    !isSpanish && !isPortuguese && isCurrentGenderRevealCopy(seo?.title)
      ? seo.title
      : fallbackTitle;
  const description =
    !isSpanish &&
    !isPortuguese &&
    isCurrentGenderRevealCopy(seo?.description?.description)
      ? seo.description.description
      : fallbackDescription;
  const image = `${rootUrl}/images/punta-cana-gender-reveal-planning.webp`;
  const keywords = (seo?.keywords || []).filter((keyword) =>
    isCurrentGenderRevealCopy(keyword),
  );
  const fallbackKeywords = isPortuguese
    ? [
        "chá revelação Punta Cana",
        "organização de chá revelação Punta Cana",
        "chá revelação em villa Punta Cana",
        "chá revelação em hotel Punta Cana",
      ]
    : isSpanish
      ? [
          "revelación de género Punta Cana",
          "organización de revelación de género Punta Cana",
          "revelación de género en villa Punta Cana",
          "revelación de género en hotel Punta Cana",
        ]
      : [
          "gender reveal Punta Cana",
          "Punta Cana gender reveal planner",
          "custom gender reveal Punta Cana",
          "villa gender reveal Punta Cana",
          "hotel gender reveal Punta Cana",
        ];
  const faqs = normalizeGenderRevealFaqs(
    data.allContentfulFaqsComponent.nodes,
    language,
  );
  const schemaMarkup = buildGenderRevealSchema({
    pageUrl,
    language,
    title,
    description,
    image,
    faqs,
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(!isSpanish && !isPortuguese && keywords.length > 0
          ? keywords
          : fallbackKeywords
        ).join(", ")}
        image={image}
        imageAlt={
          isPortuguese
            ? "Chá revelação personalizado em uma praia de Punta Cana"
            : isSpanish
              ? "Revelación de género personalizada en una playa de Punta Cana"
              : "Custom gender reveal celebration on a Punta Cana beach"
        }
        url={pageUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        siteName="Sertuin Events"
        locale={languageConfig.ogLocale}
        alternateLocale={isSpanish ? "en_US" : "es_DO"}
        twitterCard="summary_large_image"
      />
      <link rel="canonical" href={pageUrl} />
      <LocalizedAlternates
        rootUrl={rootUrl}
        path="/gender-reveal-punta-cana/"
      />
    </>
  );
};

export const query = graphql`
  query GenderRevealPage($language: String!, $contentLanguage: String!) {
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
    allContentfulGeneralLayout(
      filter: { node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        companyName
        email
        facebook
        instagram
        messengerLink
        telephone
        x
      }
    }
    allContentfulSeo(
      filter: {
        page: { eq: "Gender Reveal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        title
        keywords
        description {
          description
        }
      }
    }
    allContentfulPageContent(
      filter: {
        page: { eq: "Gender Reveal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        page
        heroHeading
        heroHeading2
        heroEyebrow
        sectionTitle
        sectionTitle2
        primaryCtaLabel
        secondaryCtaLabel
        contactEyebrow
        contactHeading
        contactBody
        paragraph1 {
          raw
        }
        paragraph2 {
          raw
        }
        paragraph3 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: {
        page: { eq: "Gender Reveal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        page
        title
        section
        images {
          url
          width
          height
          title
          gatsbyImage(
            layout: CONSTRAINED
            width: 1600
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 80
          )
        }
      }
    }
    allContentfulCardWithImage(
      filter: {
        page: { eq: "Gender Reveal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        title
        paragraph
        paragraph2
      }
    }
    allContentfulFaqsComponent(
      filter: {
        page: { eq: "Gender Reveal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        title
        content {
          content
        }
      }
    }
  }
`;
