import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";
const YouTubeEmbedComponent = ({ videoId, caption }) => {
  if (!videoId) return null;

  return (
    <div className="flex flex-col max-w-md">
      <YouTubeEmbed
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"100%"}
      />
      {caption && <p className="embed-caption">{caption}</p>}
    </div>
  );
};

export default YouTubeEmbedComponent;
