import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function renderGatsbyImage(
  { alt = "", title, sizes },
  { photo, width, height },
) {
  const image = getImage(photo.gatsbyImage);
  return (
    <div className="relative w-full h-[20rem]" style={{}}>
      <GatsbyImage
        image={image}
        alt={photo.alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

const PhotoGrid = ({ photos, page }) => {
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
  photoList = photoList.sort(() => Math.random() - 0.5);

  const windowWidth = useWindowWidth();

  let targetHeight = 500;
  if (page === "Photo Shoots") {
    if (windowWidth > 450) {
      targetHeight = 150;
    }
  }
  if (page === "Gender Reveal") {
    if (windowWidth > 450) {
      targetHeight = 150;
    }
  }
  if (page === "Proposal") {
    if (windowWidth > 450) {
      targetHeight = 400;
    }
  }

  if (page === "Elopement") {
    if (windowWidth > 450) {
      targetHeight = 400;
    }
  }

  if (page === "Birthday Celebrations") {
    if (windowWidth > 450) {
      targetHeight = 400;
    }
  }

  if (page === "Bachelor Party") {
    if (windowWidth > 450) {
      targetHeight = 200;
    }
  }
  if (page === "Wedding-Planner") {
    if (windowWidth > 450) {
      targetHeight = 300;
    }
  }

  return (
    <div className="w-full mx-auto px-2 lg:max-w-6xl">
      <RowsPhotoAlbum
        photos={photoList}
        targetRowHeight={targetHeight}
        defaultContainerWidth={1200}
        render={{ image: renderGatsbyImage, window: windowWidth }}
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
      />
    </div>
  );
};

export default PhotoGrid;
