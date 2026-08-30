import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import RichText from "../components/RichTextComponents/RichText";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import TextComponent from "../components/RichTextComponents/TextComponent";
import VideoPlayer from "../components/VideoComponent/VideoPlayer";
import Faqs from "../components/FaqsComponent/Faqs";
import { graphql } from "gatsby";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import PackageForm from "../components/PackageForm/PackageForm";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { reconcilePackageSchemaPrices } from "../utils/reconcilePackageSchema";
import { localizePackageFaqs } from "../utils/packageLocalization";
import { getProposalAdditions } from "../utils/proposalPackageRules";
import { getImageSeo } from "../utils/imageSeo";
import { getProposalPackageDetails } from "../data/proposalPackageDetails";
import { buildProposalPackageFaqs } from "../data/proposalPackageFaqs";
import ProposalPackageDetails from "../components/ProposalComponents/ProposalPackageDetails";
import ContentfulResponsiveImage from "../components/ContentfulResponsiveImage";
import { buildProposalPackageSchema } from "../utils/proposalSeo";
import { GOOGLE_MAPS_URL } from "../components/ProposalComponents/ProposalExperience";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";
const PackagePage = ({ pageContext, data }) => {
  const { t } = useTranslation();
  const node = data.allContentfulPackagePageContent.nodes[0];
  const proposalDetails = getProposalPackageDetails(node, pageContext.language);
  const packageInformation = proposalDetails
    ? {
        ...node,
        heroHeading: proposalDetails.name,
        heroHeading2:
          pageContext.language === "pt"
            ? proposalDetails.content.summary
            : node.heroHeading2,
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
  const proposalBookingMedia = proposalDetails ? (
    packageInformation.videoUrl !== null ? (
      <VideoPlayer
        url={packageInformation.videoUrl}
        className="h-full w-full overflow-hidden"
      />
    ) : (
      <ContentfulResponsiveImage
        asset={packageInformation.images[0]}
        alt={featureImageSeo.alt}
        title={featureImageSeo.title}
        className="h-full w-full overflow-hidden"
        imgClassName="h-full w-full object-cover object-center"
        sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, calc(100vw - 2rem)"
        widths={[480, 720, 960, 1200]}
      />
    )
  ) : null;

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

      {!proposalDetails && (
        <div className="w-full max-w-7xl mx-auto px-4 lg:mt-5 xl:mt-10">
          <div className="flex flex-col lg:flex-row gap-8">
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
            {packageInformation.videoUrl !== null ? (
              <>
                {/* Rendering ReactPlayer during hydration produced markup that
                    did not match the SSR output: six React #418 errors plus a
                    #423, which drops the whole root to client rendering.
                    VideoPlayer renders only a placeholder until the player
                    scrolls into view, which is why /proposal/ is clean. */}
                <VideoPlayer
                  url={packageInformation.videoUrl}
                  className="w-full packagePageVideo lg:basis-1/2"
                />
              </>
            ) : (
              <>
                <div className="w-full packagePageVideo lg:basis-1/2">
                  <ContentfulResponsiveImage
                    asset={packageInformation.images[0]}
                    alt={featureImageSeo.alt}
                    title={featureImageSeo.title}
                    className="w-full overflow-hidden packagePageVideo"
                    imgClassName="h-full w-full object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    widths={[480, 960, 1400]}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {packageInformation.packages !== null ? (
        <>
          <PackageForm
            packageInformation={packageInformation}
            formData={formData}
            setFormData={setFormData}
            selectedAddOns={selectedAddOns}
            handleAddOnToggle={handleAddOnToggle}
            language={pageContext.language}
            sideMedia={proposalBookingMedia}
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
  const language = normalizeLanguage(pageContext.language);
  const isPortuguese = language === "pt";
  const languageConfig = getLanguageConfig(language);
  const slug = data.allContentfulPackagePageContent.nodes[0].urlSlug;
  const packagePath = `/packages/${slug}/`;
  const siteUrl = localizedUrl(rootUrl, packagePath, language);
  const { seoTitle, seoDescription, seoImage, seoKeywords } =
    data.allContentfulPackagePageContent.nodes[0];
  const seoImageUrl = seoImage?.file?.url
    ? `${seoImage.file.url.startsWith("//") ? "https:" : ""}${seoImage.file.url}`
    : undefined;

  const node = data?.allContentfulPackagePageContent?.nodes[0];
  const proposalDetails = getProposalPackageDetails(node, language);
  const resolvedSeoTitle = proposalDetails
    ? isPortuguese
      ? `${proposalDetails.name} | Pedido de Casamento em Punta Cana | Sertuin`
      : language === "es"
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
  const resolvedDescription =
    proposalDetails?.content.summary || seoDescription?.seoDescription;
  const localizedFaqs = proposalDetails
    ? buildProposalPackageFaqs({ language, details: proposalDetails })
    : localizePackageFaqs(node.faqs, language);

  // The schema blob and the page price are maintained separately in Contentful
  // and have drifted apart before. The page price wins; every correction is
  // logged so the drift is visible in the build output.
  let JsonSchema = {};
  if (proposalDetails) {
    const proposalPageUrl = localizedUrl(rootUrl, "/proposal/", language);
    const instagramUrl = /^https?:\/\//i.test(
      pageContext.layout?.instagram || "",
    )
      ? pageContext.layout.instagram
      : "https://www.instagram.com/sertuinevents/";
    const schemaImages = [
      seoImageUrl
        ? {
            url: seoImageUrl,
            title: proposalDetails.name,
            description: resolvedDescription,
          }
        : null,
      ...(node.heroImageList || []),
      ...(node.images || []),
    ].filter(Boolean);

    JsonSchema = buildProposalPackageSchema({
      siteUrl: rootUrl,
      pageUrl: siteUrl,
      proposalPageUrl,
      language,
      packageName: proposalDetails.name,
      description: resolvedDescription,
      price: proposalDetails.price,
      images: schemaImages,
      companyName: pageContext.layout?.companyName,
      legalName: "Sertuin SRL",
      directorName: "Grecia Mejía",
      telephone: pageContext.layout?.telephone,
      instagram: instagramUrl,
      googleMapsUrl: GOOGLE_MAPS_URL,
      faqs: localizedFaqs,
    });
  } else if (schema) {
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
        description={resolvedDescription}
        keywords={(isPortuguese
          ? [
              `${proposalDetails?.name || "pacote"} Punta Cana`,
              "pedido de casamento Punta Cana",
              "pacote romântico Punta Cana",
              "pedido de casamento na praia",
            ]
          : seoKeywords || []
        ).join(", ")}
        image={seoImageUrl}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path={packagePath} />
    </>
  );
};

export const query = graphql`
  query MyQuery($id: String, $contentLanguage: String = "en-US") {
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
      filter: { id: { eq: $id }, node_locale: { eq: $contentLanguage } }
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
          url
          width
          height
          title
          description
          file {
            url
          }
        }
        packageInformation {
          raw
        }
        images {
          title
          description
          file {
            url
          }
          url
          width
          height
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
