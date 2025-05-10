import { graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import RichText from "../../components/RichTextComponents/RichText";
import Seo from "../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import RentalItemCard from "../../components/RentalComponents/RentalItemCard";
import RentalItemsSearch from "../../components/RentalComponents/RentalItemsSearch";
import { ToastContainer, toast } from "react-toastify";
const Index = ({ data }) => {
  const backendRentalList = data.allContentfulRentalItems.nodes;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rentalItemsList, setRentalItemsList] = useState(
    data.allContentfulRentalItems.nodes.sort(() => Math.random() - 0.5),
  );
  const allCategories = [
    "All",
    ...new Set(
      data.allContentfulRentalItems.nodes.flatMap((item) => item.category),
    ),
  ].sort();

  // Search Functions

  const setFilter = (e) => {
    setSelectedCategory(e.target.dataset.category);
    const filteredRentalList = backendRentalList.filter((item) => {
      if (e.target.innerText === "All") {
        return item;
      }
      const categoryList = item.category;
      return categoryList.includes(e.target.dataset.category);
    });
    setRentalItemsList(filteredRentalList.sort(() => Math.random() - 0.5));
  };

  //Toast Functions

  const notifyAddedToCart = (item) =>
    toast.success(`${item.rentalItem} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const notifyCartFull = (item) =>
    toast.error(
      `You've reached the maximum available stock for this ${item.rentalItem}`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    );

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.rentalItem} removed from cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <ToastContainer />
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <div>
        <nav className="flex flex-row items-center justify-center overflow-x-scroll xl:overflow-x-auto whitespace-nowrap mx-5 xl:justify-center">
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
        <RentalItemsSearch
          backendRentalList={backendRentalList}
          allCategories={allCategories}
          setSelectedCategory={setSelectedCategory}
          setRentalItemsList={setRentalItemsList}
        />
        <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto">
          {rentalItemsList.map((item, index) => {
            return (
              <RentalItemCard
                key={index}
                item={item}
                notifyAddedToCart={notifyAddedToCart}
                notifyRemovedFromCart={notifyRemovedFromCart}
                notifyCartFull={notifyCartFull}
              />
            );
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
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/event-rentals"}`;
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
      filter: { page: { eq: "Event Rentals" }, node_locale: { eq: $language } }
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
      filter: { page: { eq: "Event Rentals" }, node_locale: { eq: $language } }
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
    allContentfulRentalItems(
      sort: { rentalItem: ASC }
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        id
        rentalItem
        category
        price
        description
        stock
        images {
          gatsbyImage(width: 450, placeholder: BLURRED, formats: WEBP)
          title
        }
      }
    }
  }
`;
