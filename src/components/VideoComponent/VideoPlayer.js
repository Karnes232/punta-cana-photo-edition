import React from "react";
import ReactPlayer from "react-player/lazy";
const VideoPlayer = ({ url }) => {
  return (
    <div className="mt-3 h-[35vh] md:h-[45vh] xl:h-[75vh] 2xl:h-[85vh] 3xl:h-[115vh] w-full mx-0 ">
      <ReactPlayer
        // url={url}
        url={"https://player.vimeo.com/video/998482189?api=1"}
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
