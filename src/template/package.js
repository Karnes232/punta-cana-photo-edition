import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import RichText from "../components/RichTextComponents/RichText";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import TextComponent from "../components/RichTextComponents/TextComponent";
import VideoPlayer from "../components/VideoComponent/VideoPlayer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Faqs from "../components/FaqsComponent/Faqs";
import { graphql } from "gatsby";
import Seo from "../components/Layout/seo";
import PackageForm from "../components/PackageForm/PackageForm";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { reconcilePackageSchemaPrices } from "../utils/reconcilePackageSchema";
import { localizePackageFaqs } from "../utils/packageLocalization";
import { getProposalAdditions } from "../utils/proposalPackageRules";
import { getImageSeo } from "../utils/imageSeo";
import { getProposalPackageDetails } from "../data/proposalPackageDetails";
import { buildProposalPackageFaqs } from "../data/proposalPackageFaqs";
import ProposalPackageDetails from "../components/ProposalComponents/ProposalPackageDetails";
const PackagePage = ({ pageContext, data }) => {
  const { t } = useTranslation();
  const node = data.allContentfulPackagePageContent.nodes[0];
  const proposalDetails = getProposalPackageDetails(node, pageContext.language);
  const packageInformation = proposalDetails
    ? {
        ...node,
        heroHeading: proposalDetails.name,
        packages: node.packages?.length
          ? [
              {
                ...node.packages[0],
                price: proposalDetails.price,
              },
              ...node.packages.slice(1),
            ]
          : node.packages,
      }
    : node;
  const localizedFaqs = proposalDetails
    ? buildProposalPackageFaqs({
        language: pageContext.language,
        details: proposalDetails,
      })
    : localizePackageFaqs(node.faqs, pageContext.language);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
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
    price: packageInformation.packages[0]?.price || 0,
    packageName: packageInformation.heroHeading,
  });

  const image = getImage(packageInformation.images[0]);
  const featureImageSeo = getImageSeo(packageInformation.images[0], {
    language: pageContext.language,
    subject: packageInformation.heroHeading,
    context: "feature",
  });
  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId.id)
        ? prev.filter((id) => id !== addOnId.id)
        : [...prev, addOnId.id],
    );
  };

  return (
    <Layout generalInfo={pageContext.layout} overlayHeader>
      <HeroSwiper
        heroInfo={packageInformation}
        overlayHeader
        language={pageContext.language}
      />
      {proposalDetails ? (
        <ProposalPackageDetails
          details={proposalDetails}
          language={pageContext.language}
        />
      ) : (
        <div className="mb-10">
          <RichText context={packageInformation.packageInformation} />
        </div>
      )}
      <SwiperCarousel
        images={packageInformation.images}
        language={pageContext.language}
        subject={packageInformation.heroHeading}
      />

      <div className="w-full max-w-7xl mx-auto px-4 lg:mt-5 xl:mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {!proposalDetails && (
            <div className="lg:basis-1/2">
              {packageInformation.packages !== null ? (
                <>
                  {packageInformation.packages[0].included !== null ? (
                    <>
                      {" "}
                      <div className="my-5 mx-auto">
                        <TextComponent
                          title={t("Included")}
                          heading="h2"
                          className="my-5 text-center tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
                        />
                        <ul className="flex flex-col justify-center items-center gap-2">
                          {packageInformation.packages[0].included?.map(
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
                        paragraph={packageInformation.packages[0].paragraph}
                        pClassName="text-base lg:text-base capitalize lg:mt-0 mx-5 text-center"
                      />
                    </div>
                  )}{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          )}
          {packageInformation.videoUrl !== null ? (
            <>
              {/* Rendering ReactPlayer during hydration produced markup that
                  did not match the SSR output: six React #418 errors plus a
                  #423, which drops the whole root to client rendering.
                  VideoPlayer renders only a placeholder until the player
                  scrolls into view, which is why /proposal/ is clean. */}
              <VideoPlayer
                url={packageInformation.videoUrl}
                className={`w-full packagePageVideo ${
                  proposalDetails ? "lg:max-w-5xl lg:mx-auto" : "lg:basis-1/2"
                }`}
              />
            </>
          ) : (
            <>
              <div
                className={`w-full packagePageVideo ${
                  proposalDetails ? "lg:max-w-5xl lg:mx-auto" : "lg:basis-1/2"
                }`}
              >
                <GatsbyImage
                  image={image}
                  alt={featureImageSeo.alt}
                  title={featureImageSeo.title}
                  className={`w-full object-fill object-center packagePageVideo`}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {packageInformation.packages !== null ? (
        <>
          <PackageForm
            packageInformation={packageInformation}
            formData={formData}
            setFormData={setFormData}
            selectedAddOns={selectedAddOns}
            handleAddOnToggle={handleAddOnToggle}
            language={pageContext.language}
          />{" "}
        </>
      ) : (
        <></>
      )}
      {localizedFaqs?.length ? (
        <>
          <Faqs faqs={localizedFaqs} title={t("Frequently Asked Questions")} />
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default PackagePage;

export const Head = ({ pageContext, data }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = pageContext.language;
  const slug = data.allContentfulPackagePageContent.nodes[0].urlSlug;
  const siteUrl = `${rootUrl}${language === "es" ? "/es" : ""}/packages/${slug}/`;
  const { seoTitle, seoDescription, seoImage, seoKeywords } =
    data.allContentfulPackagePageContent.nodes[0];
  const seoImageUrl = seoImage?.file?.url
    ? `${seoImage.file.url.startsWith("//") ? "https:" : ""}${seoImage.file.url}`
    : undefined;

  const node = data?.allContentfulPackagePageContent?.nodes[0];
  const proposalDetails = getProposalPackageDetails(node, language);
  const resolvedSeoTitle = proposalDetails
    ? language === "es"
      ? `${proposalDetails.name} | Propuesta de matrimonio en Punta Cana | Sertuin Events`
      : `${proposalDetails.name} | Punta Cana Marriage Proposal | Sertuin Events`
    : seoTitle;
  const nodeWithCanonicalPrice = proposalDetails
    ? {
        ...node,
        packages: node.packages?.length
          ? [
              {
                ...node.packages[0],
                price: proposalDetails.price,
              },
              ...node.packages.slice(1),
            ]
          : node.packages,
      }
    : node;
  const schema = node?.schema?.internal?.content;

  // The schema blob and the page price are maintained separately in Contentful
  // and have drifted apart before. The page price wins; every correction is
  // logged so the drift is visible in the build output.
  let JsonSchema = {};
  if (schema) {
    try {
      const packageForSchema = nodeWithCanonicalPrice?.packages?.[0]
        ? {
            ...nodeWithCanonicalPrice.packages[0],
            // Contentful's schema field is shared between locales and authored
            // in English, so reconcile it against the canonical English add-on
            // names even while rendering the Spanish page.
            additions: getProposalAdditions(nodeWithCanonicalPrice, "en-US"),
          }
        : nodeWithCanonicalPrice?.packages?.[0];
      const { schema: reconciled, corrections } = reconcilePackageSchemaPrices(
        JSON.parse(schema),
        packageForSchema,
      );
      JsonSchema = reconciled;
      if (corrections.length) {
        console.warn(`[schema-price] ${slug}:`, corrections);
      }
    } catch (error) {
      console.error(
        `[schema-price] ${slug}: could not parse the Contentful schema field —`,
        error.message,
      );
    }
  }

  return (
    <>
      <Seo
        title={resolvedSeoTitle}
        description={
          proposalDetails?.content.summary || seoDescription?.seoDescription
        }
        keywords={seoKeywords?.join(", ")}
        image={seoImageUrl}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language} // Convert to standard HTML lang attribute
      />
      <link rel="canonical" href={siteUrl} />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${rootUrl}/packages/${slug}/`}
      />
      <link
        rel="alternate"
        hrefLang="es"
        href={`${rootUrl}/es/packages/${slug}/`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${rootUrl}/packages/${slug}/`}
      />
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
          page
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
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
          title
          description
        }
        packageInformation {
          raw
        }
        images {
          title
          description
          gatsbyImage(
            layout: CONSTRAINED
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
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
