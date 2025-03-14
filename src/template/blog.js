import React from "react";
import Layout from "../components/Layout/Layout";
import HeroImage from "../components/BlogComponents/HeroImage";
import { graphql } from "gatsby";
import BlogBody from "../components/BlogComponents/BlogBody";
import Recommendations from "../components/BlogComponents/Recommendations";
import { useTranslation } from "gatsby-plugin-react-i18next";

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
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          url
        }
        body {
          raw
          references {
            ... on ContentfulAsset {
              id
              contentful_id
              __typename
              title
              file {
                url
              }
              gatsbyImage(placeholder: BLURRED, formats: WEBP, width: 2000)
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
          gatsbyImage(width: 1000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
  }
`;
