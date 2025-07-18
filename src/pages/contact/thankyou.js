import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

const ThankYou = ({ data }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setName(searchParams.get("name"));
  }, []);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
      <main className="">
        <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[50vh]">
          <div className="">
            <div className="flex flex-col justify-center items-center text-slate-600 ">
              <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
                {t("Thank you")} {name},{" "}
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
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/contact/thankyou/"}`;
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
    allContentfulSeo(
      filter: { page: { eq: "Contact" }, node_locale: { eq: $language } }
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
    allContentfulGeneralLayout(filter: { node_locale: { eq: $language } }) {
      nodes {
        companyName
        facebook
        email
        instagram
        messengerLink
        x
        telephone
        heroImageList {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
        fullSize
        heroHeading
      }
    }
  }
`;
