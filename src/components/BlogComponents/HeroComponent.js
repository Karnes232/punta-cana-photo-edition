import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const HeroComponent = ({ backgroundImages }) => {
  // const windowWidth = useWindowWidth();
  // console.log(backgroundImages);
  // // Ensure gImage exists and has srcSet
  // const imageSrc =
  //   gImage?.images?.fallback?.srcSet?.split(",")?.map((entry) => {
  //     const [url, width] = entry.trim().split(" ");
  //     return { imageSrc: url, imageWidth: parseInt(width) || 0 }; // Ensure width is a number
  //   }) || [];

  // // Default styles
  // let HeroStyles = {
  //   backgroundImage: "none",
  // };

  const encodeBackgroundImage = (url) => {
    return url?.replace(/\(/g, "%28").replace(/\)/g, "%29");
  };

  // Ensure there are images before accessing indexes
  // if (imageSrc.length > 1) {
  //   HeroStyles = {
  //     backgroundImage: `linear-gradient(45deg, rgba(245, 246, 252, 0.2), rgba(0, 0, 0, 0.6)), url(${encodeBackgroundImage(windowWidth < 1500 ? imageSrc[1].imageSrc : imageSrc[2]?.imageSrc || imageSrc[1].imageSrc)})`,
  //   };
  // }

  const NewHeroStyles = {
    backgroundImage: `linear-gradient(45deg, rgba(245, 246, 252, 0.2), rgba(0, 0, 0, 0.6)), url(${encodeBackgroundImage(backgroundImages)})`,
  };

  return (
    <div className="w-full h-[50vh] lg:h-[80vh] xl:h-screen">
      <div
        className="h-full bg-center bg-no-repeat bg-cover"
        style={NewHeroStyles}
      ></div>
    </div>
  );
};

export default HeroComponent;
