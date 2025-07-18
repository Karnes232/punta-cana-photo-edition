import React from "react";
import "react-photo-album/masonry.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useWindowWidth from "../../hooks/useWindowWidth";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  // useLightboxState,
} from "yet-another-react-lightbox";

function renderGatsbyImage(
  { alt = "", title, sizes },
  { photo, width, height },
) {
  const image = getImage(photo.gatsbyImage);
  return (
    <GatsbyImage
      image={image}
      alt={photo.alt}
      className="w-full h-full object-cover"
    />
  );
}

function GastbyImageLightbox({ slide, offset, rect }) {
  const {
    // on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  // const { currentIndex } = useLightboxState();
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);
  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  const image = getImage(slide.gatsbyImage);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 770;
  return (
    <div
      className={`relative flex justify-center items-center ${isMobile ? "w-full" : "h-full"}`}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <GatsbyImage
        image={image}
        alt={slide.alt}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

const PhotoGallery = ({ photos, index, setIndex }) => {
  let photoList = [];
  photos.forEach((image, key) => {
    // const photoObject = {
    //   gatsbyImage: image.gatsbyImage,
    //   src: image.gatsbyImage.images.fallback.src,
    //   width: image.gatsbyImage.width,
    //   height: image.gatsbyImage.height,
    //   alt: image.title,
    // };
    const photoObject = {
      // gatsbyImage: image.gatsbyImage,
      src: image.url,
      width: image.width,
      height: image.height,
      alt: image.title,
    };
    photoList.push(photoObject);
  });

  const windowWidth = useWindowWidth();
  return (
    <>
      <div className="w-full my-5 mx-auto px-2 xl:px-0 lg:max-w-6xl">
        <MasonryPhotoAlbum
          photos={photoList}
          // render={{ image: renderGatsbyImage, window: windowWidth }}
          onClick={({ index }) => setIndex(index)}
          columns={(containerWidth) => {
            if (containerWidth < 320) return 1;
            if (containerWidth < 780) return 2;
            if (containerWidth < 1024) return 3;
            return 4;
          }}
          spacing={8}
          padding={0}
        />
      </div>
      <Lightbox
        slides={photoList}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        // render={{ slide: GastbyImageLightbox }}
      />
    </>
  );
};

export default PhotoGallery;
