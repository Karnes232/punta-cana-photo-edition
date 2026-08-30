import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

const ThankYou = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [name, setName] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setName(searchParams.get("name") || "");
  }, []);
  return (
    <Layout
      generalInfo={data.allContentfulGeneralLayout.nodes[0]}
      overlayHeader
    >
      <HeroSwiper
        heroInfo={data.allContentfulGeneralLayout.nodes[0]}
        overlayHeader
        language={language}
      />
      <main className="">
        <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[50vh]">
          <div className="">
            <div className="flex flex-col justify-center items-center text-slate-600 ">
              <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
                {t("Thank you")}
                {name ? ` ${name}` : ""}.{" "}
                {t("our team will reach out to you shortly!")}
              </div>

              <div className="text-center text-sm xl:text-base mt-2 xl:mt-6">
                {t("Please feel free to")}{" "}
                <a
                  href={`mailto:${data.allContentfulGeneralLayout.nodes[0].email}`}
                  aria-label="Gmail"
                  rel="noreferrer"
                  className="underline"
                >
                  {t("contact us")}
                </a>{" "}
                {t("with any questions or concerns.")}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ThankYou;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const languagePrefix = isPortuguese ? "/pt" : isSpanish ? "/es" : "";
  const contactUrl = `${data.site.siteMetadata.siteUrl}${languagePrefix}/contact/`;
  const title = isPortuguese
    ? "Obrigado por entrar em contato | Sertuin Events"
    : isSpanish
      ? "Gracias por contactarnos | Sertuin Events"
      : "Thank You for Contacting Us | Sertuin Events";
  const description = isPortuguese
    ? "Recebemos sua solicitação de evento. A equipe da Sertuin Events entrará em contato em breve."
    : isSpanish
      ? "Recibimos tu solicitud de evento. El equipo de Sertuin Events se pondrá en contacto contigo muy pronto."
      : "We received your event inquiry. The Sertuin Events team will contact you shortly.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={contactUrl}
        language={isPortuguese ? "pt-BR" : isSpanish ? "es" : "en"}
        robots="noindex, follow"
      />
      <link rel="canonical" href={contactUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery($contentLanguage: String = "en-US") {
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
        facebook
        email
        instagram
        messengerLink
        x
        telephone
        heroImageList {
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: NONE
            formats: WEBP
            quality: 75
          )
          title
        }
        fullSize
        heroHeading
      }
    }
  }
`;
