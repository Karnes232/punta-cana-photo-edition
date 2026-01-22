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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust this number as needed

  const [floralItemsList, setFloralItemsList] = useState(
    data.allContentfulFloralItem.nodes.sort(() => Math.random() - 0.5),
  );

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = floralItemsList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of the floral items section
    window.scrollTo({
      top: document.querySelector(".floral-items-section").offsetTop,
      behavior: "smooth",
    });
  };

  const allCategories = [
    "All",
    ...new Set(
      data.allContentfulFloralItem.nodes.flatMap((item) => item.category),
    ),
  ].sort();

  const setFilter = (e) => {
    setCurrentPage(1); // Reset to first page when filtering
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
      <div className="floral-items-section">
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

        <div className="flex justify-evenly items-center flex-row flex-wrap md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto">
          {currentItems.map((item, index) => {
            return <FloralItemCard item={item} key={index} />;
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-8">
          {(() => {
            const totalPages = Math.ceil(floralItemsList.length / itemsPerPage);
            let buttons = [];

            // Always show first page
            buttons.push(
              <button
                key={1}
                onClick={() => paginate(1)}
                className={`mx-1 px-4 py-2 border rounded ${
                  currentPage === 1 ? "bg-gray-200" : "bg-white"
                }`}
              >
                1
              </button>,
            );

            // Calculate range of visible page buttons
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // If we're at the start, show more pages after
            if (currentPage <= 2) {
              endPage = Math.min(totalPages - 1, 3);
            }

            // If we're at the end, show more pages before
            if (currentPage >= totalPages - 1) {
              startPage = Math.max(2, totalPages - 2);
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
              buttons.push(
                <span key="ellipsis1" className="mx-2">
                  ...
                </span>,
              );
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
              buttons.push(
                <button
                  key={i}
                  onClick={() => paginate(i)}
                  className={`mx-1 px-4 py-2 border rounded ${
                    currentPage === i ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {i}
                </button>,
              );
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
              buttons.push(
                <span key="ellipsis2" className="mx-2">
                  ...
                </span>,
              );
            }

            // Always show last page if there's more than one page
            if (totalPages > 1) {
              buttons.push(
                <button
                  key={totalPages}
                  onClick={() => paginate(totalPages)}
                  className={`mx-1 px-4 py-2 border rounded ${
                    currentPage === totalPages ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {totalPages}
                </button>,
              );
            }

            return buttons;
          })()}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${pageContext.language !== "en-US" ? `/${pageContext.language}` : ""}/floral-art/`;
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
          gatsbyImage(layout: CONSTRAINED, width: 450, placeholder: BLURRED, formats: WEBP, quality: 75)
          title
        }
        additions {
          ... on ContentfulPackageAdditions {
            price
            addition
          }
        }
      }
    }
  }
`;
