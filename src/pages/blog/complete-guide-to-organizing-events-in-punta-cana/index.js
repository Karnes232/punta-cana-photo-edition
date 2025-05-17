import { graphql } from "gatsby";
import React from "react";
import Seo from "../../../components/Layout/seo";
import Layout from "../../../components/Layout/Layout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import RichText from "../../../components/RichTextComponents/RichText";
import BlogCategory from "../../../components/BlogComponents/BlogCategory";
import { useI18next } from "gatsby-plugin-react-i18next";
const Index = ({ data }) => {
  const categories = data.allContentfulBlogCategories.nodes;
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <div className="mt-5 md:mt-0"></div>
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <div className="flex flex-col xl:mt-5 md:flex-row md:flex-wrap md:justify-evenly  max-w-5xl xl:max-w-6xl mx-auto md:gap-5">
        {categories.map((category, index) => {
          return (
            <BlogCategory
              key={index}
              title={category.blogCategory}
              gImage={category.blogImage}
              url={category.url}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/blog/complete-guide-to-organizing-events-in-punta-cana/"}`;
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
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Blog" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Blog" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
        paragraph1 {
          raw
        }
      }
    }
    allContentfulBlogCategories(filter: { node_locale: { eq: $language } }) {
      nodes {
        blogCategory
        url
        blogImage {
          gatsbyImage(width: 400, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
  }
`;
