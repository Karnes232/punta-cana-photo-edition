import React from "react";
import HeroComponent from "./HeroComponent";
import PhotoGrid from "./PhotoGrid";
// import PhotoGrid from "../TourPageComponents/PhotoGrid";

const HeroImage = ({ backgroundImages }) => {
  console.log(backgroundImages);
  return (
    <>
      <div className="absolute top-0 w-full h-[55vh] xl:h-[65vh]">
        <div className="md:hidden">
          <HeroComponent gImage={backgroundImages[0].gatsbyImage} />
        </div>
        <div className="hidden md:flex mx-auto">
          <PhotoGrid tourPhotos={backgroundImages} />
        </div>
      </div>
      <div className="h-[calc(55vh-6rem)] xl:h-[calc(65vh-9rem)]"></div>{" "}
    </>
  );
};

export default HeroImage;
