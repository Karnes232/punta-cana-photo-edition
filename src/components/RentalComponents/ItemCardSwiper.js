import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ItemCardSwiper = ({ photoList, className, height }) => {
  let photoListEdited = [];
  photoList?.forEach((e) => {
    let image = {
      title: e.title,
      image: getImage(e.gatsbyImage),
    };
    photoListEdited.push(image);
  });

  return (
    <div>
      <Swiper
        effect={"fade"}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper  ${className}`}
      >
        {photoListEdited.map((image, index) => {
          return (
            <SwiperSlide
              className={`w-full object-cover ${height}`}
              key={index}
            >
              <GatsbyImage
                image={image.image}
                alt={image.title}
                className={`w-full object-cover ${height}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ItemCardSwiper;
