import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SwiperCarousel = ({ images, className }) => {
  let photoListEdited = [];
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  };
  let imageHeight = "h-[15rem] md:h-[29rem] lg:h-[41rem] xl:h-[45rem]";
  let slideHeight = "h-[17.5rem] md:h-[32rem] lg:h-[45rem] xl:h-[48rem]";
  images?.forEach((e) => {
    let image = {
      title: e.title,
      image: getImage(e.gatsbyImage),
    };
    photoListEdited.push(image);
  });
  return (
    <>
      <div className={`w-full ${slideHeight}`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          lazy={true}
          centeredSlides={true}
          breakpoints={{
            768: {
              slidesPerView: 1.7,
            },
          }}
          loop={true}
          //   autoplay={{
          //     delay: 3000,
          //     disableOnInteraction: false,
          //   }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{
            type: "fraction",
          }}
          className={`mySwiper  ${className} ${slideHeight} h-60`}
        >
          {photoListEdited.map((image, index) => {
            return (
              <SwiperSlide
                className={`relative object-cover object-center h-full w-full ${imageHeight}`}
                key={index}
              >
                <GatsbyImage
                  image={image.image}
                  alt={image.title}
                  className={`w-full object-cover object-center ${imageHeight}`}
                />
                <div
                  className={`absolute inset-0 ${imageHeight}`}
                  style={HeroStyles}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperCarousel;
