import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import RichText from "../components/RichTextComponents/RichText";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import TextComponent from "../components/RichTextComponents/TextComponent";
import ReactPlayer from "react-player";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Faqs from "../components/FaqsComponent/Faqs";
// import Button from "../components/PackageForm/Button";
import Form from "../components/PackageComponents/Form";
import { graphql } from "gatsby";
import Seo from "../components/Layout/seo";
import PackageForm from "../components/PackageForm/PackageForm";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
const PackagePage = ({ pageContext, data }) => {
  const { t } = useTranslation();
  const [host, setHost] = useState("");
  // const [isSticky, setIsSticky] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    hotel: "",
    message: "",
    addOn1: "",
    addOn2: "",
    addOn3: "",
    addOn4: "",
    addOn5: "",
    addOn6: "",
    price: data.allContentfulPackagePageContent.nodes[0].packages[0]?.price || 0,
    packageName: data.allContentfulPackagePageContent.nodes[0].heroHeading,
  });

  const image = getImage(
    data.allContentfulPackagePageContent.nodes[0].images[0],
  );
  useEffect(() => {
    setHost(window.location.origin);
    // const handleScroll = () => {
    //   const scrollY = window.scrollY; // Get current scroll position

    //   // Define the scroll position at which the button should become sticky
    //   const triggerPosition = 500; // Adjust this value based on your page layout

    //   // Set the sticky state based on scroll position
    //   if (scrollY > triggerPosition) {
    //     setIsSticky(true);
    //   } else {
    //     setIsSticky(false);
    //   }
    // };

    // // Add the scroll event listener
    // window.addEventListener("scroll", handleScroll);

    // // Clean up the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [host]);

  useEffect(() => {
    if (isSubmitting) {
      // Handle your form submission here

      const redirectHref = `${host}/contact/thankyou/?name=${formData.name}`;
      const form = document.getElementById("packageForm");
      const newFormData = new FormData(form);
      const formDataObj = {};
      newFormData.forEach((value, key) => (formDataObj[key] = value));
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(newFormData).toString(),
      }).then(() => {
        window.location.href = redirectHref;
      });

      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, host]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalPrice =
      data.allContentfulPackagePageContent.nodes[0].packages[0].price;

    const updatedData = selectedAddOns.reduce((acc, addOnId, index) => {
      const result =
        data.allContentfulPackagePageContent.nodes[0].packages[0].additions.filter(
          (addOn) => addOn.id.includes(addOnId),
        );

      totalPrice += result[0].price;

      return {
        ...acc,
        [`addOn${index + 1}`]: `${result[0].addition} - $${result[0].price}`,
      };
    }, {});

    setFormData((prev) => ({
      ...prev,
      ...updatedData,
      totalPrice: totalPrice,
    }));

    setIsSubmitting(true);
  };

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId.id)
        ? prev.filter((id) => id !== addOnId.id)
        : [...prev, addOnId.id],
    );
  };

  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroSwiper heroInfo={data.allContentfulPackagePageContent.nodes[0]} />
      <div className="w-full max-w-5xl mx-auto relative">
        {/* <Button
          text="Contact Us"
          customClass=""
          sticky={isSticky}
          packageInformation={data.allContentfulPackagePageContent.nodes[0]}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          selectedAddOns={selectedAddOns}
          setSelectedAddOns={setSelectedAddOns}
          handleAddOnToggle={handleAddOnToggle}
        /> */}
        <Form formData={formData} />
      </div>
      <div className="mb-10">
        <RichText
          context={
            data.allContentfulPackagePageContent.nodes[0].packageInformation
          }
        />
      </div>
      <SwiperCarousel
        images={data.allContentfulPackagePageContent.nodes[0].images}
      />

      <div className="w-full max-w-7xl mx-auto px-4 lg:mt-5 xl:mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className=" lg:basis-1/2">
            {data.allContentfulPackagePageContent.nodes[0].packages !== null ? (
              <>
                {data.allContentfulPackagePageContent.nodes[0].packages[0]
                  .included !== null ? (
                  <>
                    {" "}
                    <div className="my-5 mx-auto">
                      <TextComponent
                        title={t("Included")}
                        className="my-5 text-center tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
                      />
                      <ul className="flex flex-col justify-center items-center gap-2">
                        {data.allContentfulPackagePageContent.nodes[0].packages[0].included?.map(
                          (item, index) => {
                            return (
                              <li
                                key={index}
                                className="list-disc text-sm xl:text-lg capitalize"
                              >
                                {item}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <TextComponent
                      paragraph={
                        data.allContentfulPackagePageContent.nodes[0]
                          .packages[0].paragraph
                      }
                      pClassName="text-base lg:text-base capitalize lg:mt-0 mx-5 text-center"
                    />
                  </div>
                )}{" "}
              </>
            ) : (
              <></>
            )}
          </div>
          {data.allContentfulPackagePageContent.nodes[0].videoUrl !== null ? (
            <>
              <div className="w-full lg:basis-1/2 packagePageVideo">
                <ReactPlayer
                  url={data.allContentfulPackagePageContent.nodes[0].videoUrl}
                  muted
                  controls
                  playing={true}
                  loop
                  width="100%"
                  height="100%"
                  pip
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-full lg:basis-1/2 packagePageVideo ">
                <GatsbyImage
                  image={image}
                  alt={
                    data.allContentfulPackagePageContent.nodes[0].images[0]
                      .title
                  }
                  className={`w-full object-fill object-center packagePageVideo`}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {data.allContentfulPackagePageContent.nodes[0].packages !== null ? (
        <>
          <PackageForm
            packageInformation={data.allContentfulPackagePageContent.nodes[0]}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
            handleAddOnToggle={handleAddOnToggle}
          />{" "}
        </>
      ) : (
        <></>
      )}
      {data.allContentfulPackagePageContent.nodes[0].faqs !== null ? (
        <>
          <Faqs faqs={data.allContentfulPackagePageContent.nodes[0].faqs} />
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default PackagePage;

export const Head = ({ pageContext, data }) => {
  const { language } = useI18next();
  const siteUrl = `${data.site.siteMetadata.siteUrl}/packages/${data.allContentfulPackagePageContent.nodes[0].urlSlug}/`;
  const { seoTitle, seoDescription, seoImage, seoKeywords } =
    data.allContentfulPackagePageContent.nodes[0];

  const schema =
    data?.allContentfulPackagePageContent?.nodes[0]?.schema?.internal?.content;

  let JsonSchema = {};
  if (schema) {
    JsonSchema = JSON.parse(schema);
  }

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription?.seoDescription}
        keywords={seoKeywords?.join(", ")}
        image={`https:${seoImage?.file?.url}`}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language} // Convert to standard HTML lang attribute
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery($id: String, $language: String!) {
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
    allContentfulPackagePageContent(
      filter: { id: { eq: $id }, node_locale: { eq: $language } }
    ) {
      nodes {
        id
        urlSlug
        heroHeading
        fullSize
        packages {
          price
          included
          paragraph
          additions {
            addition
            price
            id
          }
        }
        videoUrl
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        packageInformation {
          raw
        }
        images {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
        faqs {
          title
          content {
            content
          }
        }
        seoTitle
        seoKeywords
        seoDescription {
          seoDescription
        }
        seoImage {
          file {
            url
          }
        }
        schema {
          internal {
            content
          }
        }
      }
    }
  }
`;
