import React from "react";
import ReactPlayer from "react-player/lazy";
const VideoPlayer = ({ url, vertical }) => {
  let height = "h-[35vh] md:h-[45vh] xl:h-[75vh] 2xl:h-[110vh]";
  if (vertical) {
    height = "h-[75vh] md:h-[45vh] lg:h-[70vh] xl:h-[65vh] 2xl:h-[70vh]";
  }
  return (
    <div className={`mt-3 w-full mx-0 ${height}`}>
      <ReactPlayer
        url={url}
        muted
        controls
        playing={true}
        loop
        width="100%"
        height="100%"
        pip
      />
    </div>
  );
};

export default VideoPlayer;
