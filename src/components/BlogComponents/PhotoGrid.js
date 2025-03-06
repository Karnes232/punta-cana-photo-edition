import React from "react";
import PhotoAlbum from "react-photo-album";
const PhotoGrid = ({ tourPhotos }) => {
  let photoList = [];
  tourPhotos.forEach((image, key) => {
    const photoObject = {
      src: image.url,
      width: image.gatsbyImage.width,
      height: image.gatsbyImage.height,
      alt: image.title,
    };
    photoList.push(photoObject);
  });
  photoList = photoList.sort(() => Math.random() - 0.5);
  return (
    <div className="min-w-[1080px] w-max ">
      <PhotoAlbum
        layout="rows"
        photos={photoList.slice(0, 4)}
        containerWidth={1152}
        columns={3}
        padding={0}
        spacing={2}
      />
    </div>
  );
};

export default PhotoGrid;
