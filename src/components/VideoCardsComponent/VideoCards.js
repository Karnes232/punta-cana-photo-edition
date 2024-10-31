import React from "react";
import VideoCard from "./VideoCard";

const VideoCards = ({ cards }) => {
  console.log(cards);
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto my-5 gap-4 xl:gap-12">
      {cards.map((card, index) => {
        return <VideoCard card={card} index={index} key={index} />;
      })}
    </div>
  );
};

export default VideoCards;
