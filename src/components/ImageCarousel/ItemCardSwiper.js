import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const ItemCardSwiper = ({ photoList = [], className = "", height = "" }) => {
  const images = photoList
    .map((photo) => ({
      alt: photo?.title || "Sertuin Events wedding design in Punta Cana",
      image: getImage(photo?.gatsbyImage),
    }))
    .filter(({ image }) => image);

  return (
    <Swiper
      effect="fade"
      loop={images.length > 1}
      modules={[EffectFade]}
      className={`mySwiper ${className}`}
    >
      {images.map(({ alt, image }, index) => (
        <SwiperSlide className={`w-full object-cover ${height}`} key={index}>
          <GatsbyImage
            image={image}
            alt={alt}
            className={`w-full object-cover ${height}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ItemCardSwiper;
