import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import OurPackages from "../../components/PackageComponents/OurPackages";
import TextComponent from "../../components/TextComponent/TextComponent";
import RichText from "../../components/RichTextComponents/RichText";
import Faqs from "../../components/FaqsComponent/Faqs";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";

const Index = ({ data }) => {
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <PhotoGrid
        photos={data.allContentfulPhotoGallery.nodes[0].images}
        page={data.allContentfulPhotoGallery.nodes[0].page}
      />
      <TextComponent
        title={data.allContentfulPhotoGallery.nodes[0].title}
        heading="h2"
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />

      <OurPackages
        title={data?.allContentfulPageContent?.nodes[0].sectionTitle}
        photoPackages={data.allContentfulPackages.nodes}
      />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent
        packagePage={"punta-cana-bachelor-party"}
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${pageContext.language !== "en-US" ? `/${pageContext.language}` : ""}/punta-cana-bachelor-party/`;

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
        language={pageContext.language === "en-US" ? "en" : pageContext.language}
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
      filter: { page: { eq: "Bachelor Party" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Bachelor Party" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        paragraph1 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Bachelor Party" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        title
        section
        images {
          url
          width
          height
          #gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
      }
    }
    allContentfulPackages(
      filter: { page: { eq: "Bachelor Party" }, node_locale: { eq: $language } }
      sort: { price: ASC }
    ) {
      nodes {
        page
        title
        link
        included
        paragraph
        price
        image {
          title
          gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: NONE, formats: WEBP, quality: 75)
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulFaqsComponent(
      filter: { page: { eq: "Bachelor Party" }, node_locale: { eq: $language } }
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
