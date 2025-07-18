import React from "react";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
const HeroBlogCategoryComponent = ({ image, title }) => {
  // const bgImage = getImage(image.gatsbyImage);
  const imageUrl = `${image.url}?w=1920&fm=webp&q=75`;
  const width = image.width;
  const height = image.height;
  return (
    <>
      {" "}
      <div className="absolute top-0 w-full h-[50vh] ">
        <div
          className={`relative w-full object-cover object-center h-[50vh] xl:h-[60vh]`}
        >
          <img
            src={imageUrl}
            alt={image.title}
            className={`w-full object-cover object-center h-[50vh] xl:h-[60vh]`}
            width={width}
            height={height}
          />
          {/* <GatsbyImage
            image={bgImage}
            alt={image.title}
          /> */}
          <div
            className={`relative max-w-xs lg:max-w-4xl inline-block z-10 -top-1/3 left-1/2 transform -translate-x-1/2  text-center -translate-y-1/2`}
          >
            <h1
              translate="no"
              className="text-white font-crimson tracking-wider text-4xl lg:text-6xl text-center "
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className="h-[40vh] xl:h-[50vh]"></div>
    </>
  );
};

export default HeroBlogCategoryComponent;
