import { graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroComponent from "../components/PhotoGalleryComponents/HeroComponent";
import ReactPlayer from "react-player";
import TextComponent from "../components/TextComponent/TextComponent";
import PhotoGallery from "../components/PhotoGridComponent/PhotoGallery";
import Seo from "../components/Layout/seo";
import { FaPlay } from "react-icons/fa6";
import ShareButton from "../components/PhotoGalleryComponents/ShareButton";
const Photogallery = ({ pageContext, data }) => {
  const [index, setIndex] = useState(-1);
  const siteUrl = `${data.site.siteMetadata.siteUrl}/photo-gallery/${data.allContentfulPreviousWorkPhotoGallery.nodes[0].urlSlug}`;

  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroComponent
        title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
        date={data.allContentfulPreviousWorkPhotoGallery.nodes[0].date}
        image={data.allContentfulPreviousWorkPhotoGallery.nodes[0].mainImage.gatsbyImage.images.fallback.srcSet.split(
          ",",
        )}
      />
      <div className="w-full sticky top-0 bg-white z-10 transition-all duration-300 shadow-sm ">
        <div className="flex justify-between items-center mx-5 xl:w-full xl:max-w-6xl xl:mx-auto py-2">
          <TextComponent
            title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
            className="tracking-wide text-xl xl:text-2xl w-full text-left flex justify-center"
          />
          <div className="flex items-center gap-4">
            <ShareButton siteUrl={siteUrl} />
            <FaPlay
              className="text-xl xl:text-2xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIndex(0)}
            />
          </div>
        </div>
      </div>
      {data.allContentfulPreviousWorkPhotoGallery.nodes[0].videoUrl && (
        <div className="photogallery-video w-full">
          <div
            className={`my-3 w-full mx-0 aspect-video md:aspect-[16/9] max-w-6xl lg:mx-auto `}
          >
            <ReactPlayer
              url={data.allContentfulPreviousWorkPhotoGallery.nodes[0].videoUrl}
              muted
              controls
              playing={true}
              loop
              width="100%"
              height="100%"
              pip
            />
          </div>
        </div>
      )}
      <PhotoGallery
        index={index}
        setIndex={setIndex}
        photos={
          data.allContentfulPreviousWorkPhotoGallery.nodes[0].photoGallery
        }
      />
    </Layout>
  );
};

export default Photogallery;

export const Head = ({ pageContext, data }) => {
  const siteUrl = `${data.site.siteMetadata.siteUrl}/photo-gallery/${data.allContentfulPreviousWorkPhotoGallery.nodes[0].urlSlug}`;
  // const { seoTitle, seoDescription, seoImage, seoKeywords } =
  //   data.allContentfulPreviousWorkPhotoGallery.nodes[0];
  const { seoKeywords } = "";

  const imageSrc = [];

  const image =
    data?.allContentfulPreviousWorkPhotoGallery?.nodes[0].mainImage.gatsbyImage.images.fallback.srcSet?.split(
      " ",
    );
  const imageObject = { imageSrc: image[0], imageWidth: image[1] };
  imageSrc.push(imageObject);
  let newImageSrc;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    newImageSrc = `http://localhost:8000${imageSrc[imageSrc.length - 1].imageSrc}`;
  } else {
    newImageSrc = `${data.site.siteMetadata.siteUrl}${imageSrc[imageSrc.length - 1].imageSrc}`;
  }
  return (
    <>
      <Seo
        title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
        description={
          "Explore our stunning collection of professional photographs capturing life's beautiful moments. Browse through carefully curated galleries featuring portraits, landscapes, events, and more. Each image tells a unique story and showcases artistic excellence in photography."
        }
        keywords={seoKeywords?.join(", ")}
        image={newImageSrc}
        url={siteUrl}
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulPreviousWorkPhotoGallery(filter: { id: { eq: $id } }) {
      nodes {
        id
        title
        urlSlug
        date(formatString: "DD MMMM, yyyy")
        mainImage {
          title
          gatsbyImage(width: 4000, formats: WEBP, placeholder: BLURRED)
        }
        videoUrl
        photoGallery {
          title
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
        }
      }
    }
  }
`;
