import React from "react";

const HeroComponent = ({ heroInfo }) => {
  let image =
    heroInfo?.heroImage?.gatsbyImage?.images?.fallback?.srcSet.split(",");
  const imageSrc = [];

  image?.forEach((element) => {
    const image = element.split(" ");
    const imageObject = { imageSrc: image[0], imageWidth: image[1] };
    imageSrc.push(imageObject);
  });
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(" +
      imageSrc[2]?.imageSrc +
      ")",
    //   filter: `brightness(75%)`
  };
  //   if (windowWidth < 1500) {
  //     HeroStyles = {
  //       backgroundImage:
  //         "linear-gradient(45deg, rgba(245, 246, 252, 0.2), rgba(0, 0, 0, 0.6)), url(" +
  //         imageSrc[1]?.imageSrc +
  //         ")",
  //     };
  //   } else {
  //     HeroStyles = {
  //       backgroundImage:
  //         "linear-gradient(45deg, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.53)), url(" +
  //         imageSrc[2]?.imageSrc +
  //         ")",
  //     };
  //   }

  return (
    <>
      <div className="absolute top-0 w-full h-screen">
        <div
          className={`h-full bg-center bg-no-repeat bg-cover`}
          style={HeroStyles}
        >
          <div className="relative max-w-xs lg:max-w-4xl inline-block z-10 top-[85%] md:top-[87%] lg:top-[82%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1
              translate="no"
              className="text-white font-crimson tracking-wider text-5xl lg:text-6xl 2xl:text-7xl text-center "
            >
              {heroInfo.heroHeading}
            </h1>

            <h2
              translate="no"
              className="text-white font-crimson tracking-wider text-xl 2xl:text-2xl lg:mt-5"
            >
              {heroInfo.heroHeading2}
            </h2>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default HeroComponent;
