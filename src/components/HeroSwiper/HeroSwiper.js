import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { withSizes } from "../../utils/imageSizes";
import { getImageSeo } from "../../utils/imageSeo";
const HeroSwiper = ({
  heroInfo,
  className,
  overlayHeader = false,
  language = "en-US",
}) => {
  let photoListEdited = [];
  heroInfo?.heroImageList?.forEach((e, index) => {
    const seo = getImageSeo(e, {
      language,
      subject: heroInfo.heroHeading,
      context: "hero",
      index,
    });
    let image = {
      ...seo,
      image: withSizes(getImage(e.gatsbyImage), "100vw"),
    };
    photoListEdited.push(image);
  });
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  };
  let height = "";
  let blankDivHeight = "";
  let translatePosition = "";
  // The hero is `absolute top-0`, so this spacer reserves its space in flow.
  //
  // With an overlaid header the navbar is out of flow, so the spacer must match
  // the hero's height exactly. Without one, the navbar sits in flow above the
  // spacer, and the legacy heights below are 10vh short to partially compensate
  // for it — only exactly right at a 1440px-tall viewport, since the navbar is a
  // fixed 144px (h-24 md:h-36) while 10vh scales. Those values are kept for
  // callers that still render an in-flow navbar (AdminLayout).
  if (heroInfo.fullSize) {
    height = "h-screen";
    blankDivHeight = overlayHeader ? "h-screen" : "h-[90vh]";
    translatePosition = "-translate-y-1/2";
  } else {
    height = "h-[65vh]";
    blankDivHeight = overlayHeader ? "h-[65vh]" : "h-[55vh]";
    translatePosition = "-translate-y-2/3";
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
                  alt={image.alt}
                  title={image.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className={`w-full object-cover object-center ${height}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={HeroStyles}
        >
          <div
            className={`relative max-w-xs lg:max-w-4xl inline-block top-[75%] md:top-[70%] left-1/2 transform -translate-x-1/2 text-center ${translatePosition}`}
          >
            {heroInfo.heroHeading && (
              <h1
                translate="no"
                className="text-white font-crimson tracking-wider text-4xl lg:text-6xl text-center"
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
      </div>
      <div className={`${blankDivHeight}`}></div>
    </>
  );
};

export default HeroSwiper;
