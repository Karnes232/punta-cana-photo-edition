import React from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import VideoPlayer from "../components/VideoComponent/VideoPlayer";
import Faqs from "../components/FaqsComponent/Faqs";
import { graphql } from "gatsby";
import Seo from "../components/Layout/seo";
import LocalizedAlternates from "../components/Layout/LocalizedAlternates";
import PackageForm from "../components/PackageForm/PackageForm";
import ProposalPackageDetails from "../components/ProposalComponents/ProposalPackageDetails";
import ContentfulResponsiveImage from "../components/ContentfulResponsiveImage";
import { buildProposalPackageSchema } from "../utils/proposalSeo";
import { GOOGLE_MAPS_URL } from "../components/ProposalComponents/ProposalExperience";
import {
  getLanguageConfig,
  localizedUrl,
  normalizeLanguage,
} from "../utils/siteLocales";

// Share images are cropped by Sanity's CDN to the size social networks expect.
const shareImageUrl = (url) =>
  url && `${url}?w=1200&h=630&fit=crop&auto=format`;

// The slideshows take each photo's CDN address and size; they request the
// widths they need from Sanity's image CDN.
const toResponsiveImage = (image) =>
  image?.asset && {
    url: image.asset.url,
    width: image.asset.metadata?.dimensions?.width,
    height: image.asset.metadata?.dimensions?.height,
    alt: image.alt,
  };

// The questions every package page shares, followed by the dinner question,
// answered for packages with the dinner included or offered as an extra.
const packageFaqs = (texts, pkg) =>
  [
    ...(texts?.faqs || []).map(({ question, answer }) => ({
      title: question,
      content: { content: answer },
    })),
    texts?.dinnerQuestion && {
      title: texts.dinnerQuestion,
      content: {
        content: pkg?.dinnerIncluded
          ? texts.dinnerAnswerIncluded
          : texts.dinnerAnswerAddOn,
      },
    },
  ].filter(Boolean);

// A proposal package's page: its text and photos from the package's page in
// this language, its price and extras from the Proposal Package, and the text
// every package page shares from this language's Package Page Texts.
const PackagePage = ({ pageContext, data }) => {
  const page = data.sanityProposalPackagePage;
  const pkg = page.package;
  const texts = data.sanityProposalPackageTexts;
  const language = pageContext.language;
  const bookingPhoto = toResponsiveImage(page.bookingPhoto);
  const addOnNames = new Map(
    (texts?.addOnNames || []).map((item) => [item.addOn?._id, item.name]),
  );
  const addOns = (pkg.addOns || []).map((addOn) => ({
    id: addOn._id,
    kind: addOn.kind,
    price: addOn.price,
    name: addOnNames.get(addOn._id) || addOn.name,
  }));
  const proposalBookingMedia = pkg.videoUrl ? (
    <VideoPlayer url={pkg.videoUrl} className="h-full w-full overflow-hidden" />
  ) : bookingPhoto ? (
    <ContentfulResponsiveImage
      asset={bookingPhoto}
      alt={bookingPhoto.alt}
      title={bookingPhoto.alt}
      className="h-full w-full overflow-hidden"
      imgClassName="h-full w-full object-cover object-center"
      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, calc(100vw - 2rem)"
      widths={[480, 720, 960, 1200]}
    />
  ) : null;

  return (
    <Layout generalInfo={pageContext.layout} overlayHeader>
      <main>
        <HeroSwiper
          heroInfo={{
            fullSize: pkg.fullScreenHero,
            heroHeading: page.name,
            heroHeading2: page.heroSubheading,
            heroImageList: (page.heroImages || [])
              .map(toResponsiveImage)
              .filter(Boolean),
          }}
          overlayHeader
          language={language}
        />
        <ProposalPackageDetails
          page={page}
          pkg={pkg}
          texts={texts}
          language={language}
        />
        <SwiperCarousel
          images={(page.galleryPhotos || [])
            .map(toResponsiveImage)
            .filter(Boolean)}
          language={language}
        />
        <PackageForm
          packageName={page.name}
          price={pkg.price}
          addOns={addOns}
          dinnerIncluded={pkg.dinnerIncluded}
          title={texts?.formTitle}
          submitLabel={texts?.formSubmitLabel}
          language={language}
          sideMedia={proposalBookingMedia}
        />{" "}
        <Faqs faqs={packageFaqs(texts, pkg)} title={texts?.faqTitle} />
      </main>
    </Layout>
  );
};

export default PackagePage;

export const Head = ({ pageContext, data }) => {
  const rootUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const language = normalizeLanguage(pageContext.language);
  const languageConfig = getLanguageConfig(language);
  const page = data.sanityProposalPackagePage;
  const pkg = page.package;
  const seo = page.seo;
  const packagePath = `/packages/${pkg.slug.current}/`;
  const siteUrl = localizedUrl(rootUrl, packagePath, language);
  const image = shareImageUrl(seo?.image?.asset?.url);
  const instagramUrl = /^https?:\/\//i.test(pageContext.layout?.instagram || "")
    ? pageContext.layout.instagram
    : "https://www.instagram.com/sertuinevents/";
  // The share photo is named after the package; the other photos are named
  // in the structured data after the package too, in this language.
  const shareUrl = seo?.image?.asset?.url;
  const schemaImages = [
    shareUrl
      ? { url: shareUrl, title: page.name, description: seo?.description }
      : null,
    ...[...(page.heroImages || []), ...(page.galleryPhotos || [])].map(
      (item) => item.asset?.url,
    ),
  ].filter(Boolean);
  const schemaMarkup = buildProposalPackageSchema({
    siteUrl: rootUrl,
    pageUrl: siteUrl,
    proposalPageUrl: localizedUrl(rootUrl, "/proposal/", language),
    language,
    packageName: page.name,
    description: seo?.description,
    price: pkg.price,
    images: schemaImages,
    companyName: pageContext.layout?.companyName,
    legalName: "Sertuin SRL",
    directorName: "Grecia Mejía",
    telephone: pageContext.layout?.telephone,
    instagram: instagramUrl,
    googleMapsUrl: GOOGLE_MAPS_URL,
    faqs: packageFaqs(data.sanityProposalPackageTexts, pkg),
  });

  return (
    <>
      <Seo
        title={seo?.title}
        description={seo?.description}
        robots="noindex, follow"
        keywords={(seo?.keywords || []).join(", ")}
        image={image}
        imageAlt={seo?.image?.alt}
        url={siteUrl}
        schemaMarkup={schemaMarkup}
        language={languageConfig.htmlLang}
        locale={languageConfig.ogLocale}
      />
      <link rel="canonical" href={siteUrl} />
      <LocalizedAlternates rootUrl={rootUrl} path={packagePath} />
    </>
  );
};

export const query = graphql`
  fragment PackagePhoto on SanityImageWithAlt {
    alt
    asset {
      url
      metadata {
        dimensions {
          width
          height
        }
      }
    }
  }
  query PackagePage($id: String!, $sanityLanguage: String!) {
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
    sanityProposalPackagePage(_id: { eq: $id }) {
      name
      heroSubheading
      summary
      setup
      exclusions
      heroImages {
        ...PackagePhoto
      }
      galleryPhotos {
        ...PackagePhoto
      }
      bookingPhoto {
        ...PackagePhoto
      }
      package {
        slug {
          current
        }
        price
        charcuterieIncluded
        dinnerIncluded
        violinIncluded
        fullScreenHero
        videoUrl
        addOns {
          _id
          name
          kind
          price
        }
      }
      seo {
        title
        description
        keywords
        image {
          alt
          asset {
            url
          }
        }
      }
    }
    sanityProposalPackageTexts(language: { eq: $sanityLanguage }) {
      breadcrumbLabel
      breadcrumbHome
      breadcrumbProposals
      eyebrow
      basePriceLabel
      priceNote
      bookLabel
      quickTitle
      specialTitle
      setupDetailsLabel
      setupTitle
      setupIntro
      exclusionsTitle
      charcuterieTitle
      charcuterieShort
      charcuterieText
      dinnerTitle
      dinnerShort
      dinnerText
      violinTitle
      violinShort
      violinText
      completeInfoLabel
      commonTitle
      commonIntro
      inclusions {
        _key
        icon
        title
        description
        essential
      }
      importantTitle
      importantIntro
      conditions
      formTitle
      formSubmitLabel
      addOnNames {
        name
        addOn {
          _id
        }
      }
      faqTitle
      faqs {
        question
        answer
      }
      dinnerQuestion
      dinnerAnswerIncluded
      dinnerAnswerAddOn
    }
  }
`;
