import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const HeroSwiperWeddingPuntaCana = ({ heroInfo, className }) => {
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
      "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
  };
  let height = "";
  let blankDivHeight = "";
  let translatePosition = "";
  if (heroInfo.fullSize) {
    height = "h-screen";
    blankDivHeight = "h-[90vh]";
    translatePosition = "-translate-y-1/2";
  } else {
    height = "h-[65vh]";
    blankDivHeight = "h-[55vh]";
    translatePosition = "-translate-y-2/3";
  }

  console.log(heroInfo.heroHeading);
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
                  <div
                    className={`relative inline-block z-10 top-[65%] md:top-[70%] lg:top-[70%] left-1/2 transform -translate-x-1/2  text-center ${translatePosition}`}
                  >
                    {heroInfo.heroHeading && (
                      <div
                        className={`relative z-10 flex items-center justify-center w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto ${blankDivHeight} mt-[10vh]`}
                      >
                        <h1 className="text-white font-playfair text-xl md:text-3xl  font-bold text-center">
                          {heroInfo.heroHeading}
                        </h1>
                      </div>
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

export default HeroSwiperWeddingPuntaCana;
