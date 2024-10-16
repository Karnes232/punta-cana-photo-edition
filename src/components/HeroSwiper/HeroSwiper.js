import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const HeroSwiper = ({ heroInfo, className }) => {
  let photoListEdited = [];
  heroInfo?.heroImageList?.forEach((e) => {
    let image = {
      title: e.title,
      image: getImage(e.gatsbyImage),
    };
    photoListEdited.push(image);
  });
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  };
  let height = "";
  let blankDivHeight = "";
  if (heroInfo.fullSize) {
    height = "h-screen";
    blankDivHeight = "h-[90vh]";
  } else {
    height = "h-[65vh]";
    blankDivHeight = "h-[60vh]";
  }
  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        <Swiper
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className={`mySwiper  ${className}`}
        >
          {photoListEdited.map((image, index) => {
            return (
              <SwiperSlide
                className={`relative w-full object-cover object-center ${height}`}
                key={index}
              >
                <GatsbyImage
                  image={image.image}
                  alt={image.title}
                  className={`w-full object-cover object-center ${height}`}
                />
                <div className="absolute inset-0" style={HeroStyles}>
                  <div className="relative max-w-xs lg:max-w-4xl inline-block z-10 top-[85%] md:top-[87%] lg:top-[82%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    {heroInfo.heroHeading && (
                      <h1
                        translate="no"
                        className="text-white font-crimson tracking-wider text-4xl lg:text-6xl text-center "
                      >
                        {heroInfo.heroHeading}
                      </h1>
                    )}

                    {heroInfo.heroHeading2 && (
                      <h2
                        translate="no"
                        className="text-white font-crimson tracking-wider text-xl 2xl:text-2xl lg:mt-5"
                      >
                        {heroInfo.heroHeading2}
                      </h2>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={`${blankDivHeight}`}></div>
    </>
  );
};

export default HeroSwiper;
