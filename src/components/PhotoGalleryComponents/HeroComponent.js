import React from "react";

const HeroComponent = ({ title, date, image }) => {
  const imageSrc = [];

  image?.forEach((element) => {
    const image = element.split(" ");
    const imageObject = { imageSrc: image[0], imageWidth: image[1] };
    imageSrc.push(imageObject);
  });
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(" +
      imageSrc[imageSrc.length - 1]?.imageSrc +
      ")",
    //   filter: `brightness(75%)`
  };

  return (
    <>
      <div className="absolute top-0 w-full h-screen">
        <div
          className={`h-full bg-center bg-no-repeat bg-cover`}
          style={HeroStyles}
        >
          <div className="relative max-w-xs lg:max-w-4xl inline-block z-10 top-[85%] md:top-[87%] lg:top-[82%] left-1/2 md:left-1/3 transform -translate-x-1/2 -translate-y-1/2 font-thin">
            {title && (
              <h1
                translate="no"
                className="text-white font-crimson tracking-wider text-5xl lg:text-6xl 2xl:text-7xl "
              >
                {title}
              </h1>
            )}

            {date && (
              <h2
                translate="no"
                className="text-white font-crimson tracking-wider text-xl 2xl:text-2xl mt-4 lg:mt-5"
              >
                {date}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div className="h-[90vh]"></div>
    </>
  );
};

export default HeroComponent;
