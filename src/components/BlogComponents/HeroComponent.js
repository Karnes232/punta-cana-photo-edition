import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const HeroComponent = ({ gImage }) => {
  const windowWidth = useWindowWidth();
  let image = gImage?.images?.fallback?.srcSet.split(",");
  const imageSrc = [];
  image?.forEach((element) => {
    const image = element.split(" ");
    const imageObject = { imageSrc: image[0], imageWidth: image[1] };
    imageSrc.push(imageObject);
  });
  let HeroStyles = {};
  if (windowWidth < 1500) {
    HeroStyles = {
      backgroundImage:
        "linear-gradient(45deg, rgba(245, 246, 252, 0.2), rgba(0, 0, 0, 0.6)), url(" +
        imageSrc[1]?.imageSrc +
        ")",
    };
  } else {
    HeroStyles = {
      backgroundImage:
        "linear-gradient(45deg, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.53)), url(" +
        imageSrc[2]?.imageSrc +
        ")",
    };
  }
  return (
    <>
      <div className="w-full h-[50vh] lg:h-[80vh] xl:h-screen">
        <div
          className={`h-full bg-center bg-no-repeat bg-cover`}
          style={HeroStyles}
        ></div>
      </div>
    </>
  );
};

export default HeroComponent;
