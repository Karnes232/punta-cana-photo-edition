import React from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import RichText from "../components/RichTextComponents/RichText";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import TextComponent from "../components/RichTextComponents/TextComponent";
import ReactPlayer from "react-player";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PackagePage = ({ pageContext }) => {
  console.log(pageContext.package.videoUrl);
  const image = getImage(pageContext.package.images[0]);
  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroSwiper heroInfo={pageContext.package} />
      <RichText context={pageContext.package.packageInformation} />
      <SwiperCarousel images={pageContext.package.images} />

      <div className="w-full max-w-7xl mx-auto px-4 lg:mt-5 xl:mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className=" lg:basis-1/2">
            {pageContext.package.included !== null ? (
              <>
                {" "}
                <div className="my-5 mx-auto">
                  <TextComponent
                    title="Included"
                    className="my-5 text-center tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
                  />
                  <ul className="flex flex-col justify-center items-center gap-2">
                    {pageContext.package.included.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="list-disc text-sm xl:text-lg capitalize"
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {pageContext.package.videoUrl !== null ? (
            <>
              <div className="w-full lg:basis-1/2 packagePageVideo">
                <ReactPlayer
                  url={pageContext.package.videoUrl}
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
              <div className="w-full lg:basis-1/2 packagePageVideo">
                <GatsbyImage
                  image={image}
                  alt={pageContext.package.images[0].title}
                  className={`w-full object-cover object-center`}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PackagePage;
