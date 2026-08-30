import React from "react";
import Layout from "../../components/Layout/Layout";
import { graphql } from "gatsby";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";
import LocalizedAlternates from "../../components/Layout/LocalizedAlternates";
import VideoPlayer from "../../components/VideoComponent/VideoPlayer";
import OurPackages from "../../components/PackageComponents/OurPackages";
import SwiperCarousel from "../../components/SwiperCarouselComponent/SwiperCarousel";
import Faqs from "../../components/FaqsComponent/Faqs";
import {
  GOOGLE_MAPS_URL,
  ProposalBookingProcess,
  ProposalInclusions,
  ProposalIntroduction,
  ProposalMomentsHeading,
  ProposalTrust,
  buildProposalFaqs,
  getProposalCopy,
} from "../../components/ProposalComponents/ProposalExperience";
import { buildProposalSchema } from "../../utils/proposalSeo";
import { getProposalPackageDetailsFromCard } from "../../data/proposalPackageDetails";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../../utils/siteLocales";

const withoutYear = (text = "") =>
  text
    .replace(/\s*[|—–-]\s*2026\s*$/, "")
    .replace(/\s*2026\b\s*/, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const getConciseProposalInclusions = (details, language) => {
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const labels = isPortuguese
    ? {
        transportation: "Transporte privativo para o casal",
        photography: "Mais de 70 fotografias editadas",
        bouquetWine: "Buquê natural e vinho espumante",
        duration: "De 90 a 120 minutos na praia",
        charcuterie: "Tábua de frios para dois",
        dinner: "Jantar privativo de três tempos para dois",
        dinnerDrinks: "Espumante e vinho tinto ou branco",
        violin: "Violinista ao vivo por 45 minutos",
      }
    : isSpanish
      ? {
          transportation: "Transporte privado para la pareja",
          photography: "Más de 70 fotografías editadas",
          bouquetWine: "Bouquet natural y vino espumante",
          duration: "De 90 a 120 minutos en la playa",
          charcuterie: "Charcutería para dos",
          dinner: "Cena privada de tres tiempos para dos",
          dinnerDrinks: "Vino espumante y vino tinto o blanco",
          violin: "Violinista en vivo durante 45 minutos",
        }
      : {
          transportation: "Private transportation for the couple",
          photography: "More than 70 edited photographs",
          bouquetWine: "Natural bouquet and sparkling wine",
          duration: "90 to 120 minutes on the beach",
          charcuterie: "Charcuterie for two",
          dinner: "Private three-course dinner for two",
          dinnerDrinks: "Sparkling wine plus red or white wine",
          violin: "Live violinist for 45 minutes",
        };

  if (details.dinnerIncluded) {
    return [
      labels.transportation,
      labels.photography,
      labels.dinner,
      details.violinIncluded ? labels.violin : labels.dinnerDrinks,
    ];
  }

  if (details.charcuterieIncluded) {
    return [
      labels.transportation,
      labels.photography,
      labels.charcuterie,
      labels.bouquetWine,
    ];
  }

  if (details.violinIncluded) {
    return [
      labels.transportation,
      labels.photography,
      labels.violin,
      labels.bouquetWine,
    ];
  }

  return [
    labels.transportation,
    labels.photography,
    labels.bouquetWine,
    labels.duration,
  ];
};

const withoutRetiredProposalPackages = (packages = [], language = "en-US") =>
  packages
    .filter((proposalPackage) => {
      const slug = proposalPackage.packagePage?.urlSlug?.trim().toLowerCase();
      const link = proposalPackage.link?.trim().toLowerCase();
      const title = proposalPackage.title?.trim().toLowerCase();
      return (
        slug !== "ocean-of-love" &&
        !link?.includes("/ocean-of-love") &&
        title !== "ocean of love" &&
        title !== "océano de amor" &&
        title !== "oceano de amor"
      );
    })
    .map((proposalPackage) => {
      const details = getProposalPackageDetailsFromCard(proposalPackage);
      return details
        ? {
            ...proposalPackage,
            title: details.name,
            price: details.price,
            included: getConciseProposalInclusions(details, language),
          }
        : proposalPackage;
    })
    .sort((a, b) => Number(a.price || 0) - Number(b.price || 0));

const Index = ({ data, pageContext }) => {
  const language = normalizeLanguage(pageContext.language);
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const pageContent = data.allContentfulPageContent.nodes[0];
  const carousel = data.allContentfulSwiperCarousel.nodes[0];
  const proposalCopy = getProposalCopy(language);
  const proposalPackages = withoutRetiredProposalPackages(
    data.allContentfulPackages.nodes,
    language,
  );
  const proposalFaqs = buildProposalFaqs({
    language,
    packages: proposalPackages,
  });
  const heroInfo = {
    ...pageContent,
    heroHeading:
      language === "pt"
        ? "Pedidos de Casamento em Punta Cana"
        : withoutYear(pageContent.heroHeading),
    heroHeading2:
      language === "pt"
        ? "Pacotes românticos completos em praia privativa, com transporte, decoração, fotografia e coordenação local."
        : pageContent.heroHeading2,
  };

  return (
    <Layout generalInfo={generalInfo} overlayHeader>
      <HeroSwiper heroInfo={heroInfo} overlayHeader language={language} />
      <ProposalIntroduction language={language} />
      <OurPackages
        title={
          language === "pt"
            ? proposalCopy.packagesFallbackTitle
            : pageContent.sectionTitle || proposalCopy.packagesFallbackTitle
        }
        photoPackages={proposalPackages}
        language={language}
      />
      <ProposalInclusions language={language} />
      <section aria-labelledby="proposal-moments-heading">
        <ProposalMomentsHeading language={language} />
        {pageContent.videoUrl && (
          <div className="mb-12 md:mb-16">
            <VideoPlayer url={pageContent.videoUrl} />
          </div>
        )}
        {carousel?.images?.length > 0 && (
          <SwiperCarousel
            images={carousel.images}
            language={language}
            subject={heroInfo.heroHeading}
          />
        )}
      </section>
      <ProposalBookingProcess language={language} />
      <ProposalTrust language={language} instagramUrl={generalInfo.instagram} />
      <Faqs
        faqs={proposalFaqs}
        title={
          language === "pt"
            ? "Perguntas frequentes"
            : language === "es"
              ? "Preguntas frecuentes"
              : "Frequently Asked Questions"
        }
      />
    </Layout>
  );
};

export default Index;

export const Head = ({ pageContext, data }) => {
  const {
    title: contentfulTitle,
    description,
    images,
    keywords,
  } = data.allContentfulSeo.nodes[0];
  const language = normalizeLanguage(pageContext.language);
  const isPortuguese = language === "pt";
  const languageConfig = getLanguageConfig(language);
  const title = isPortuguese
    ? "Pedido de Casamento em Punta Cana | Pacotes Românticos"
    : withoutYear(contentfulTitle);
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const siteUrl = localizedUrl(rootUrl, "/proposal/", language);
  const seoDescription = isPortuguese
    ? "Pacotes de pedido de casamento em Punta Cana com praia privativa, transporte, decoração romântica, fotografia profissional e coordenação local."
    : description.description;
  const seoImage = images?.file?.url
    ? `${images.file.url.startsWith("//") ? "https:" : ""}${images.file.url}`
    : undefined;
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];
  const proposalPackages = withoutRetiredProposalPackages(
    data.allContentfulPackages.nodes,
    language,
  );
  const instagramUrl = /^https?:\/\//i.test(generalInfo.instagram || "")
    ? generalInfo.instagram
    : "https://www.instagram.com/sertuinevents/";
  const schemaMarkup = buildProposalSchema({
    siteUrl: rootUrl,
    pageUrl: siteUrl,
    language,
    title,
    description: seoDescription,
    image: seoImage,
    companyName: generalInfo.companyName,
    legalName: "Sertuin SRL",
    directorName: "Grecia Mejía",
    telephone: generalInfo.telephone,
    instagram: instagramUrl,
    googleMapsUrl: GOOGLE_MAPS_URL,
    packages: proposalPackages,
    faqs: buildProposalFaqs({
      language,
      packages: proposalPackages,
    }),
  });

  return (
    <>
      <Seo
        title={title}
        description={seoDescription}
        keywords={(isPortuguese
          ? [
              "pedido de casamento Punta Cana",
              "pacotes de pedido de casamento Punta Cana",
              "pedido romântico em Punta Cana",
              "pedido na praia Punta Cana",
            ]
          : keywords
        ).join(", ")}
        image={seoImage}
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path="/proposal/" />
    </>
  );
};
export const query = graphql`
  query MyQuery($contentLanguage: String = "en-US") {
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
        page: { eq: "Proposal" }
        node_locale: { eq: $contentLanguage }
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
      }
    }
    allContentfulPageContent(
      filter: {
        page: { eq: "Proposal" }
        node_locale: { eq: $contentLanguage }
      }
    ) {
      nodes {
        page
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
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
    allContentfulPackages(
      filter: {
        page: { eq: "Proposal" }
        node_locale: { eq: $contentLanguage }
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
          description
          gatsbyImage(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 65
          )
        }
        packagePage {
          urlSlug
        }
      }
    }
    allContentfulSwiperCarousel(filter: { page: { eq: "Proposal" } }) {
      nodes {
        page
        images {
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
      }
    }
  }
`;
