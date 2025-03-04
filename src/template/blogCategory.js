import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql } from "gatsby";
import HeroBlogCategoryComponent from "../components/BlogComponents/HeroBlogCategoryComponent";
import BlogBody from "../components/BlogComponents/BlogBody";
import PostList from "../components/BlogComponents/PostList";

const blogCategory = ({ pageContext, data }) => {
  //   console.log(data.allContentfulBlogCategories.nodes[0].blog_post)
  // console.log(pageContext)
  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroBlogCategoryComponent
        image={data.allContentfulBlogCategories.nodes[0].heroImage}
        title={data.allContentfulBlogCategories.nodes[0].blogCategory}
      />
      <div className="mt-5 md:mt-0"></div>
      <BlogBody
        context={data?.allContentfulBlogCategories?.nodes[0].paragraph}
      />
      <PostList list={data.allContentfulBlogCategories.nodes[0].blog_post} />
    </Layout>
  );
};

export default blogCategory;

export const query = graphql`
  query MyQuery($id: String) {
    allContentfulBlogCategories(filter: { id: { eq: $id } }) {
      nodes {
        blogCategory
        blogImage {
          gatsbyImage(width: 400, placeholder: BLURRED, formats: WEBP)
          title
        }
        heroImage {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
        paragraph {
          raw
        }
        blog_post {
          id
          title
          slug
          description
          backgroundImage {
            gatsbyImage(width: 400, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
    }
  }
`;
