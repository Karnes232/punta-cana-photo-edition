import React from "react";
import { TikTokEmbed } from "react-social-media-embed";
const TikTokEmbedComponent = ({ videoId, caption }) => {
  if (!videoId) return null;

  return (
    <div className="flex flex-col max-w-md">
      <TikTokEmbed
        url={`https://www.tiktok.com/@${videoId}`}
        width={"100%"}
      />
      {caption && <p className="embed-caption">{caption}</p>}
    </div>
  );
};

export default YouTubeEmbedComponent;
