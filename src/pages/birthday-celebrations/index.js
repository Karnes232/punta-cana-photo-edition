import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import PhotoGrid from "../../components/PhotoGridComponent/PhotoGrid";
import RichText from "../../components/RichTextComponents/RichText";
import TextComponent from "../../components/TextComponent/TextComponent";
import OurPackages from "../../components/PackageComponents/OurPackages";
import ContentBlock from "../../components/ContentBlockComponent/ContentBlock";
import Faqs from "../../components/FaqsComponent/Faqs";
import FirebaseTestimonialsComponent from "../../components/TestimonialsComponent/FirebaseTestimonialsComponent";
import { useI18next } from "gatsby-plugin-react-i18next";
import HeroSwiperLocal from "../../components/HeroSwiper/HeroSwiperLocal";
import ContentBlockLocal from "../../components/ContentBlockComponent/ContentBlockLocal";
import PhotoGridLocal from "../../components/PhotoGridComponent/PhotoGridLocal";
import OurPackagesLocal from "../../components/PackageComponents/OurPackagesLocal";

const Index = ({ data }) => {
  let section1 = {};
  let section2 = {};
  let section3 = {};
  data.allContentfulPhotoGallery.nodes.forEach((photoList) => {
    if (photoList.section === "1") {
      section1 = photoList;
    }
    if (photoList.section === "2") {
      section2 = photoList;
    }
    if (photoList.section === "3") {
      section3 = photoList;
    }
  });

  // const uniqueByTitle = (objects) => {
  //   const seenTitles = new Set();

  //   return objects.filter((obj) => {
  //     // Check if we've seen this title before
  //     if (seenTitles.has(obj.title)) {
  //       // Already seen, so filter it out
  //       return false;
  //     } else {
  //       // New title, add to set and keep it
  //       seenTitles.add(obj.title);
  //       return true;
  //     }
  //   });
  // };

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      {" "}
      {/* <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} /> */}
      <HeroSwiperLocal heroInfo={data.allContentfulPageContent.nodes[0]} />
      <PhotoGridLocal photos={section1.images} page={section1.page} />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].heroHeading2}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph1} />
      <OurPackagesLocal
        title={data.allContentfulPageContent.nodes[0].sectionTitle2}
        photoPackages={data.allContentfulPackages.nodes}
      />
      <PhotoGridLocal photos={section2.images} page={section2.page} />
      <TextComponent
        title={data.allContentfulPageContent.nodes[0].sectionTitle}
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      {data.allContentfulPageContent.nodes[0].paragraph2 && (
        <RichText context={data?.allContentfulPageContent?.nodes[0].paragraph2} />
      )}
      {/* <ContentBlock content={data.allContentfulCardWithImage.nodes[0]} /> */}
      <ContentBlockLocal content={data.allContentfulCardWithImage.nodes[0]} />
      <PhotoGridLocal photos={section3.images} page={section3.page} />
      <Faqs faqs={data.allContentfulFaqsComponent.nodes} />
      <FirebaseTestimonialsComponent packagePage={"birthday-celebrations"} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en" ? `/${language === "es" ? "es" : language}` : "/birthday-celebrations/"}`;
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
        messengerLink
      }
    }
    allContentfulSeo(
      filter: {
        page: { eq: "Birthday Celebrations" }
        node_locale: { eq: $language }
      }
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
      filter: {
        page: { eq: "Birthday Celebrations" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        page
        heroImageList {
         # gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          localFile {
            childImageSharp {
              gatsbyImageData(width: 4000, placeholder: BLURRED, formats: WEBP)
            }
          }
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
        sectionTitle2
        paragraph1 {
          raw
        }
        paragraph2 {
          raw
        }
      }
    }
    allContentfulPhotoGallery(
      filter: { page: { eq: "Birthday Celebrations" } }
    ) {
      nodes {
        page
        title
        section
        images {
          #gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          localFile {
            childImageSharp {
              gatsbyImageData(width: 2000, placeholder: BLURRED, formats: WEBP)
            }
          }
          title
        }
      }
    }
    allContentfulPackages(
      filter: {
        page: { eq: "Birthday Celebrations" }
        node_locale: { eq: $language }
      }
      sort: { price: ASC }
    ) {
      nodes {
        page
        title
        link
        included
        price
        image {
          title
          #gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          localFile {
            childImageSharp {
              gatsbyImageData(width: 2000, placeholder: BLURRED, formats: WEBP)
            }
          }
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulCardWithImage(
      filter: {
        page: { eq: "Birthday Celebrations" }
        node_locale: { eq: $language }
      }
    ) {
      nodes {
        title
        paragraph
        buttonText
        linkUrl
        image {
          title
          #gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
          localFile {
            childImageSharp {
              gatsbyImageData(width: 2000, placeholder: BLURRED, formats: WEBP)
            }
          }
        }
      }
    }
    allContentfulFaqsComponent(
      filter: {
        page: { eq: "Birthday Celebrations" }
        node_locale: { eq: $language }
      }
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
