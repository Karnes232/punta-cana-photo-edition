import React from "react";
import Layout from "../components/Layout/Layout";
import HeroImage from "../components/BlogComponents/HeroImage";
import { graphql } from "gatsby";
import BlogBody from "../components/BlogComponents/BlogBody";
import Recommendations from "../components/BlogComponents/Recommendations";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import Seo from "../components/Layout/seo";

const Blog = ({ pageContext, data }) => {
  const { t } = useTranslation();
  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroImage
        backgroundImages={data?.allContentfulBlogPost?.nodes[0].backgroundImage}
      />
      <BlogBody context={data?.allContentfulBlogPost?.nodes[0].body} />

      <Recommendations
        list={data.relatedPosts.nodes}
        title={t("You Might Also Like")}
      />
    </Layout>
  );
};

export default Blog;

export const Head = ({ pageContext, data }) => {
  const { language } = useI18next();
  const siteUrl = `${data.site.siteMetadata.siteUrl}/blog/${data.allContentfulBlogPost.nodes[0].slug.trim()}/`;

  const schema =
    data?.allContentfulBlogPost?.nodes[0]?.schema?.internal?.content;

  let JsonSchema = {};
  if (schema) {
    JsonSchema = JSON.parse(schema);
  }
  return (
    <>
      <Seo
        title={data.allContentfulBlogPost.nodes[0].title}
        description={data.allContentfulBlogPost.nodes[0].description}
        keywords={data.allContentfulBlogPost.nodes[0].tags?.join(", ")}
        image={data.allContentfulBlogPost.nodes[0].backgroundImage[0].url}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language} // Convert to standard HTML lang attribute
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery($id: String, $category: String, $language: String!) {
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
    allContentfulBlogPost(
      filter: { id: { eq: $id }, node_locale: { eq: $language } }
    ) {
      nodes {
        slug
        id
        title
        tags
        publishedDate(formatString: "MMMM do, YYYY")
        description
        backgroundImage {
          title
          # gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP, quality: 50)
          url
          width
          height
        }
        schema {
          internal {
            content
          }
        }
        body {
          raw
          references {
            ... on ContentfulAsset {
              id
              contentful_id
              __typename
              title
              url
              width
              height
              file {
                url
              }
              # gatsbyImage(placeholder: BLURRED, formats: WEBP, width: 2000, quality: 50)
            }
            ... on ContentfulSocialMediaEmbed {
              id
              contentful_id
              platform
              title
              embedId
              caption
              sys {
                contentType {
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
        blogCategory {
          blogCategory
        }
      }
    }
    relatedPosts: allContentfulBlogPost(
      filter: {
        blogCategory: { blogCategory: { eq: $category } }
        id: { ne: $id }
      }
      sort: { publishedDate: DESC }
    ) {
      nodes {
        slug
        id
        title
        publishedDate(formatString: "MMMM do, YYYY")
        description
        backgroundImage {
          title
         # gatsbyImage(width: 1000, placeholder: BLURRED, formats: WEBP, quality: 50)
          url
          width
          height
        }
      }
    }
  }
`;
