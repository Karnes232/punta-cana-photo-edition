import React from "react";

const BackgroundVideo = ({ videoUrl, fullSize, heroHeading }) => {
  let height = "";
  let blankDivHeight = "";
  let translatePosition = "";
  if (fullSize) {
    height = "h-screen";
    blankDivHeight = "h-[90vh]";
    translatePosition = "-translate-y-1/2";
  } else {
    height = "h-[65vh]";
    blankDivHeight = "h-[55vh]";
    translatePosition = "-translate-y-2/3";
  }

  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-100 overflow-hidden brightness-[0.6]">
          <video
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center scale-[1.5]"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            Your device does not support playing videos
          </video>
        </div>
        {heroHeading && (
          <div
            className={`relative z-10 flex items-center justify-center w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto ${blankDivHeight} mt-[10vh]`}
          >
            <h1 className="text-white font-playfair text-2xl md:text-3xl xl:text-4xl  font-bold text-center">
              {heroHeading}
            </h1>
          </div>
        )}
      </div>

      <div className={`${blankDivHeight}`}></div>
    </>
  );
};

export default BackgroundVideo;
