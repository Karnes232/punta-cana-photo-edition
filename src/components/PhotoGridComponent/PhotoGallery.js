import React, { useState } from "react";
import "react-photo-album/masonry.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useWindowWidth from "../../hooks/useWindowWidth";
import { MasonryPhotoAlbum } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "yet-another-react-lightbox/plugins/thumbnails.css";

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
  const image = getImage(slide.gatsbyImage);
  return <GatsbyImage image={image} alt={slide.alt} className="object-cover" />;
}

const PhotoGallery = ({ photos }) => {
  const [index, setIndex] = useState(-1);
  let photoList = [];
  photos.forEach((image, key) => {
    const photoObject = {
      gatsbyImage: image.gatsbyImage,
      src: image.gatsbyImage.images.fallback.src,
      width: image.gatsbyImage.width,
      height: image.gatsbyImage.height,
      alt: image.title,
    };
    photoList.push(photoObject);
  });

  const windowWidth = useWindowWidth();
  return (
    <>
      <div className="w-full mx-auto px-2 lg:max-w-6xl">
        <MasonryPhotoAlbum
          photos={photoList}
          render={{ image: renderGatsbyImage, window: windowWidth }}
          onClick={({ index }) => setIndex(index)}
        />
      </div>
      <Lightbox
        slides={photoList}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        // plugins={[Fullscreen, Slideshow]}
        render={{ slide: GastbyImageLightbox }}
      />
    </>
  );
};

export default PhotoGallery;
