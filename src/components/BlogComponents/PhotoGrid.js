import React from "react";
import PhotoAlbum from "react-photo-album";
const PhotoGrid = ({ tourPhotos }) => {
  let photoList = [];
  tourPhotos.forEach((image, key) => {
    const photoObject = {
      src: `${image.url}?w=800&fm=webp&q=75`,
      // width: image.gatsbyImage.width,
      // height: image.gatsbyImage.height,
      width: image.width,
      height: image.height,
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
