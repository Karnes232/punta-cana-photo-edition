import React from "react";
import ReactPlayer from "react-player";
import TextComponent from "../TextComponent/TextComponent";

const VideoCard = ({ card, index }) => {
  let flexRow = "";
  if (index % 2 === 0) {
    flexRow = "lg:flex-row";
  } else {
    flexRow = "lg:flex-row-reverse";
  }
  return (
    <div className={`flex flex-col ${flexRow} w-full`}>
      <div className="w-full aspect-video lg:basis-1/2">
        <ReactPlayer
          url={card.videoUrl}
          muted
          controls
          playing={true}
          loop
          width="100%"
          height="100%"
          pip
        />
      </div>
      <div className="flex flex-col justify-center items-center lg:basis-1/2">
        <TextComponent
          title={card.couplesName}
          className="my-5 tracking-wide 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl"
          paragraph={`Wedding Venue: ${card.venue}`}
          pClassName="mb-10 capitalize"
        />
      </div>
    </div>
  );
};

export default VideoCard;
