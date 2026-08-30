import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import RichText from "../../components/RichTextComponents/RichText";
import Form from "../../components/ContactForm/Form";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { useI18next } from "gatsby-plugin-react-i18next";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

const translateRichText = (field, translations) => {
  if (!field?.raw) return field;
  try {
    const document = JSON.parse(field.raw);
    let index = 0;
    const visit = (node) => {
      if (node?.nodeType === "text" && node.value.trim()) {
        node.value = translations[index] || node.value;
        index += 1;
      }
      if (Array.isArray(node?.content)) node.content.forEach(visit);
    };
    visit(document);
    return { ...field, raw: JSON.stringify(document) };
  } catch {
    return field;
  }
};

const Index = ({ data }) => {
  const { language } = useI18next();
  const sourcePage = data.allContentfulPageContent.nodes[0];
  const page =
    language === "pt"
      ? {
          ...sourcePage,
          heroHeading: "Fale Conosco",
          heroHeading2: "Vamos Planejar seu Evento em Punta Cana",
          paragraph1: translateRichText(sourcePage.paragraph1, [
            "Estamos aqui para entender o que você precisa",
            "Queremos conhecer seus planos e oferecer o apoio certo. Preencha o formulário abaixo e nossa equipe entrará em contato para conversar sobre seu evento em Punta Cana.",
          ]),
          paragraph2: translateRichText(sourcePage.paragraph2, [
            "Conte-nos sobre seu evento em Punta Cana. Fale com nossa equipe pelo WhatsApp +1 829 522 2900 ou pelo e-mail info@sertuinevents.com. Ajudaremos você a planejar a experiência adequada.",
          ]),
        }
      : sourcePage;
  return (
    <Layout
      generalInfo={data.allContentfulGeneralLayout.nodes[0]}
      overlayHeader
    >
      <HeroSwiper heroInfo={page} overlayHeader language={language} />
      <RichText context={page.paragraph1} />
      <div className="flex flex-col lg:flex-row lg:mx-10 xl:mx-auto max-w-5xl">
        <div className="basis-1/2 mx-5 lg:mx-0">
          <Form />
        </div>
        <div className="basis-1/2">
          <RichText context={page.paragraph2} />
        </div>
      </div>
      <GoogleMap language={language} />
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext.language || hookLanguage);
  const isPortuguese = language === "pt";
  const languageConfig = getLanguageConfig(language);
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/contact/", language);
  const schema = data?.allContentfulSeo?.nodes[0]?.schema?.internal?.content;

  let JsonSchema = {};
  if (schema) {
    JsonSchema = JSON.parse(schema);
  }
  return (
    <>
      <Seo
        title={
          isPortuguese
            ? "Contato Sertuin Events | Planejamento de Eventos em Punta Cana"
            : title
        }
        description={
          isPortuguese
            ? "Conte-nos sobre seu evento em Punta Cana e solicite uma proposta personalizada para casamentos, celebrações, pedidos e eventos corporativos."
            : description.description
        }
        keywords={(isPortuguese
          ? [
              "contato planejador de eventos Punta Cana",
              "cotação evento Punta Cana",
              "Sertuin Events contato",
            ]
          : keywords
        ).join(", ")}
        image={`https:${images?.file?.url}`}
        url={siteUrl}
        schemaMarkup={
          isPortuguese
            ? {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                name: "Contato Sertuin Events",
                url: siteUrl,
                inLanguage: "pt-BR",
                about: { "@id": `${rootUrl}/#organization` },
              }
            : JsonSchema
        }
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/contact/" />
    </>
  );
};

export const query = graphql`
  query MyQuery($language: String!, $contentLanguage: String!) {
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
      filter: { page: { eq: "Contact" }, node_locale: { eq: $contentLanguage } }
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
      filter: { page: { eq: "Contact" }, node_locale: { eq: $contentLanguage } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: NONE
            formats: WEBP
            quality: 65
          )
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
