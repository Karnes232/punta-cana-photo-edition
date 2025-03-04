import React from "react";
import Layout from "../components/Layout/Layout";
import HeroImage from "../components/BlogComponents/HeroImage";
import { graphql } from "gatsby";
import BlogBody from "../components/BlogComponents/BlogBody";

const blog = ({ pageContext, data }) => {
  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroImage
        backgroundImages={data?.allContentfulBlogPost?.nodes[0].backgroundImage}
      />
      <BlogBody context={data?.allContentfulBlogPost?.nodes[0].body} />
    </Layout>
  );
};

export default blog;

export const query = graphql`
  query MyQuery($id: String) {
    allContentfulBlogPost(filter: { id: { eq: $id } }) {
      nodes {
        slug
        id
        title
        tags
        publishedDate(formatString: "MMMM do, YYYY")
        description
        category
        backgroundImage {
          title
          gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          url
        }
        body {
          raw
          references {
            contentful_id
            __typename
            title
            file {
              url
            }
            gatsbyImage(placeholder: BLURRED, formats: WEBP, width: 2000)
          }
        }
        blogCategory {
          blogCategory
        }
      }
    }
  }
`;
