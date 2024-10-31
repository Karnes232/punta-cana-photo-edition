import { Link } from "gatsby";
import React from "react";
import ReactPlayer from "react-player";

const ContentBlockVideo = ({ content }) => {
  return (
    <div className="bg-secondary-bg-color md:h-[55rem] lg:h-[25rem] xl:h-[35rem] w-full">
      <div className="flex flex-col lg:flex-row-reverse xl:max-w-7xl xl:mx-auto xl:h-full xl:overflow-hidden">
        <div className="relative w-full xl:translate-x-1/3">
          <div className="aspect-video md:aspect-[16/9] lg:h-full ">
            <ReactPlayer
              url={content.videoUrl}
              muted
              controls
              playing={true}
              loop
              width="100%"
              height="100%"
              pip
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-around items-center py-12 lg:basis-1/2 xl:translate-x-1/2">
          <h2 className="text-5xl font-normal text-center tracking-wider text-gray-800 mx-10">
            {content.title}
          </h2>
          <Link
            to={content.linkUrl}
            className="no-underline border py-2 xl:py-3 px-6 xl:px-8 xl:text-lg rounded-3xl mt-10 text-gray-400 border-gray-500 transition duration-500 hover:bg-black hover:text-white"
            aria-label="Home"
          >
            {content.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentBlockVideo;
