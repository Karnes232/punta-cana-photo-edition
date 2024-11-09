import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout/Layout";
import HeroComponent from "../components/PhotoGalleryComponents/HeroComponent";
import ReactPlayer from "react-player";
import TextComponent from "../components/TextComponent/TextComponent";
import { CiPlay1 } from "react-icons/ci";
import PhotoGallery from "../components/PhotoGridComponent/PhotoGallery";
import Seo from "../components/Layout/seo";

const photogallery = ({ pageContext, data }) => {
  console.log(data.allContentfulPreviousWorkPhotoGallery.nodes[0]);
  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroComponent
        title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
        date={data.allContentfulPreviousWorkPhotoGallery.nodes[0].date}
        image={data.allContentfulPreviousWorkPhotoGallery.nodes[0].mainImage.gatsbyImage.images.fallback.srcSet.split(
          ",",
        )}
      />
      <div className="flex justify-between items-center mx-5 w-full lg:max-w-6xl lg:mx-auto">
        <TextComponent
          title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
          className="tracking-wide text-lg mb-5 w-full text-left"
        />
        <CiPlay1 className="text-xl text-gray-400" />
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
        photos={
          data.allContentfulPreviousWorkPhotoGallery.nodes[0].photoGallery
        }
      />
    </Layout>
  );
};

export default photogallery;

export const Head = ({ pageContext, data }) => {
  const siteUrl = `${data.site.siteMetadata.siteUrl}/photogallery/${data.allContentfulPreviousWorkPhotoGallery.nodes[0].urlSlug}`;
  // const { seoTitle, seoDescription, seoImage, seoKeywords } =
  //   data.allContentfulPreviousWorkPhotoGallery.nodes[0];
  const { seoDescription, seoImage, seoKeywords } = "";
  return (
    <>
      <Seo
        title={data.allContentfulPreviousWorkPhotoGallery.nodes[0].title}
        description={seoDescription?.seoDescription}
        keywords={seoKeywords?.join(", ")}
        image={`https:${seoImage?.file?.url}`}
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
