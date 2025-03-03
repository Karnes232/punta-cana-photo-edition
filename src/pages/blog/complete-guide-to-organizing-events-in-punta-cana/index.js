import { graphql } from "gatsby";
import React from "react";
import Seo from "../../../components/Layout/seo";
import Layout from "../../../components/Layout/Layout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import RichText from "../../../components/RichTextComponents/RichText";
import BlogCategory from "../../../components/BlogComponents/BlogCategory";
const Index = ({ data }) => {
  const categories = data.allContentfulBlogCategories.nodes;
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <div className="mt-5 md:mt-0"></div>
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <div className="flex flex-col xl:mt-5 md:flex-row md:flex-wrap md:justify-evenly  max-w-5xl xl:max-w-6xl mx-auto md:gap-5">
        {categories.map((category, index) => {
          console.log(category);
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
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/blog`;
  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images.file.url}`}
        url={siteUrl}
        //   schemaMarkup={schema}
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery {
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
    allContentfulSeo(filter: { page: { eq: "Blog" } }) {
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
      }
    }
    allContentfulPageContent(filter: { page: { eq: "Blog" } }) {
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
    allContentfulBlogCategories {
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
