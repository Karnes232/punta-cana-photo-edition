import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";

import { A11y, Autoplay, Pagination, Navigation } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { withSizes } from "../../utils/imageSizes";
import { getImageSeo } from "../../utils/imageSeo";
import ContentfulResponsiveImage from "../ContentfulResponsiveImage";

const SwiperCarousel = ({ images, className, language = "en-US", subject }) => {
  const carouselLabels = {
    en: {
      containerMessage: "Proposal package photo gallery",
      firstSlideMessage: "This is the first photo",
      lastSlideMessage: "This is the last photo",
      nextSlideMessage: "Next photo",
      paginationBulletMessage: "Go to photo {{index}}",
      prevSlideMessage: "Previous photo",
      slideLabelMessage: "Photo {{index}} of {{slidesLength}}",
    },
    es: {
      containerMessage: "Galería de fotos del paquete de propuesta",
      firstSlideMessage: "Esta es la primera foto",
      lastSlideMessage: "Esta es la última foto",
      nextSlideMessage: "Foto siguiente",
      paginationBulletMessage: "Ir a la foto {{index}}",
      prevSlideMessage: "Foto anterior",
      slideLabelMessage: "Foto {{index}} de {{slidesLength}}",
    },
    pt: {
      containerMessage: "Galeria de fotos do pacote de pedido",
      firstSlideMessage: "Esta é a primeira foto",
      lastSlideMessage: "Esta é a última foto",
      nextSlideMessage: "Próxima foto",
      paginationBulletMessage: "Ir para a foto {{index}}",
      prevSlideMessage: "Foto anterior",
      slideLabelMessage: "Foto {{index}} de {{slidesLength}}",
    },
    fr: {
      containerMessage: "Galerie de photos du forfait de demande en mariage",
      firstSlideMessage: "Ceci est la première photo",
      lastSlideMessage: "Ceci est la dernière photo",
      nextSlideMessage: "Photo suivante",
      paginationBulletMessage: "Aller à la photo {{index}}",
      prevSlideMessage: "Photo précédente",
      slideLabelMessage: "Photo {{index}} sur {{slidesLength}}",
    },
  }[language.split("-")[0]];
  let photoListEdited = [];
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  };
  // Keep a calm, photographic proportion at every breakpoint. The previous
  // 15rem -> 41rem jump made the same image feel cramped on phones and
  // oversized on common laptops.
  let imageHeight =
    "h-[18rem] sm:h-[23rem] md:h-[29rem] lg:h-[34rem] xl:h-[38rem] 2xl:h-[42rem]";
  let slideHeight =
    "h-[21rem] sm:h-[26rem] md:h-[32rem] lg:h-[37rem] xl:h-[41rem] 2xl:h-[45rem]";
  images?.forEach((e, index) => {
    const seo = getImageSeo(e, {
      language,
      subject,
      context: "gallery",
      index,
    });
    let image = {
      ...seo,
      asset: e,
      image: withSizes(
        getImage(e.gatsbyImage),
        "(min-width: 768px) 59vw, 100vw",
      ),
    };
    photoListEdited.push(image);
  });
  return (
    <>
      <div className={`w-full ${slideHeight}`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // Swiper removes native lazy-loading from the neighbouring slides
          // before autoplay reaches them. This prevents an unloaded grey
          // frame without downloading the complete gallery up front.
          lazyPreloadPrevNext={2}
          centeredSlides={true}
          breakpoints={{
            768: {
              slidesPerView: 1.7,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          a11y={carouselLabels}
          modules={[A11y, Autoplay, Pagination, Navigation]}
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
                {image.image ? (
                  <GatsbyImage
                    image={image.image}
                    alt={image.alt}
                    title={image.title}
                    loading="lazy"
                    className={`w-full object-cover object-center ${imageHeight}`}
                  />
                ) : (
                  <ContentfulResponsiveImage
                    asset={image.asset}
                    alt={image.alt}
                    title={image.title}
                    className={`w-full ${imageHeight}`}
                    imgClassName={`h-full w-full object-cover object-center ${imageHeight}`}
                    sizes="(min-width: 768px) 59vw, 100vw"
                    widths={[480, 800, 1200, 1600]}
                  />
                )}
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
