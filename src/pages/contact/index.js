import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import ContactExperience from "../../components/ContactForm/ContactExperience";
import { useI18next } from "gatsby-plugin-react-i18next";
import { getLanguageConfig, localizedUrl, normalizeLanguage } from "../../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) => url && `${url}?w=1200&h=630&fit=crop&auto=format`;

const Index = ({ data, pageContext }) => (
  <Layout generalInfo={data.sanityGeneralLayout} overlayHeader>
    <ContactExperience
      page={data.sanityContactPage}
      generalInfo={data.sanityGeneralLayout}
      language={pageContext.language}
    />
  </Layout>
);
export default Index;

export const Head = ({ pageContext, data }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext.language || hookLanguage);
  const languageConfig = getLanguageConfig(language);
  const seo = data.sanityContactPage?.seo;
  const title = seo?.title;
  const description = seo?.description;
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/contact/", language);
  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={(seo?.keywords || []).join(", ")}
        image={shareImageUrl(seo?.image?.asset?.url)}
        imageAlt={seo?.image?.alt}
        url={siteUrl}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": siteUrl + "#webpage",
          name: title,
          description,
          url: siteUrl,
          inLanguage: languageConfig.htmlLang,
          about: { "@id": rootUrl + "/#organization" },
          isPartOf: { "@id": rootUrl + "/#website" },
        }}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/contact/" />
    </>
  );
};

export const query = graphql`
  query ContactPageQuery($sanityLanguage: String = "en") {
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
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      email
      facebook
      instagram
      x
      telephone
      messengerLink
    }
    sanityContactPage(language: { eq: $sanityLanguage }) {
      heroEyebrow
      heroTitle
      heroIntro
      welcome
      directLabel
      whatsappLabel
      emailLabel
      phoneLabel
      formEyebrow
      formTitle
      formIntro
      nextEyebrow
      nextTitle
      nextSteps {
        _key
        title
        body
      }
      location
      seo {
        title
        description
        keywords
        image {
          alt
          asset {
            url
          }
        }
      }
    }
  }
`;
