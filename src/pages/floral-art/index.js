import { graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import RichText from "../../components/RichTextComponents/RichText";
import FloralItemCard from "../../components/FloralComponents/FloralItemCard";
import FloralItemSearch from "../../components/FloralComponents/FloralItemSearch";

const Index = ({ data }) => {
  const backendFloralList = data.allContentfulFloralItem.nodes;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [floralItemsList, setFloralItemsList] = useState(
    data.allContentfulFloralItem.nodes.sort(() => Math.random() - 0.5),
  );
  const allCategories = [
    "All",
    ...new Set(
      data.allContentfulFloralItem.nodes.flatMap((item) => item.category),
    ),
  ].sort();

  const setFilter = (e) => {
    setSelectedCategory(e.target.dataset.category);
    const filteredRentalList = backendFloralList.filter((item) => {
      if (e.target.innerText === "All") {
        return item;
      }
      const categoryList = item.category;
      return categoryList.includes(e.target.dataset.category);
    });
    setFloralItemsList(filteredRentalList.sort(() => Math.random() - 0.5));
  };

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <div>
        <nav className="flex flex-row items-center overflow-x-scroll xl:overflow-x-auto whitespace-nowrap mx-5 xl:justify-center">
          {/* <button onClick={()=>setFilter('All')}>All</button> */}
          {allCategories.map((category, index) => {
            let active = "";
            if (category === selectedCategory) {
              active = "font-extrabold";
            }
            return (
              <button
                key={index}
                data-category={category}
                onClick={setFilter}
                value={category}
                translate="no"
                className={`cursor-pointer no-underline flex items-center px-5 h-10 ${active} transition-all duration-300 translatedText `}
              >
                {category}
              </button>
            );
          })}
        </nav>

        <FloralItemSearch
          backendFloralList={backendFloralList}
          allCategories={allCategories}
          setSelectedCategory={setSelectedCategory}
          setFloralItemsList={setFloralItemsList}
        />

        <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto">
          {floralItemsList.map((item, index) => {
            return <FloralItemCard item={item} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/floral-art"}`;
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
      filter: { page: { eq: "Floral Art" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Floral Art" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        videoUrl
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
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
    allContentfulFloralItem(
      sort: { floralItem: ASC }
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        id
        floralItem
        category
        price
        description
        images {
          gatsbyImage(width: 450, placeholder: BLURRED, formats: WEBP)
          title
        }
        additions {
          price
          addition
        }
      }
    }
  }
`;
