import React from "react";
import FacebookEmbedComponent from "./FacebookEmbedComponent";
import InstagramEmbedComponent from "./InstagramEmbedComponent";
import YouTubeEmbedComponent from "./YouTubeEmbedComponent";

const SocialMediaEmbed = ({ embed }) => {
  if (!embed) return null;

  const { platform, embedId, caption } = embed;

  switch (platform) {
    case "YouTube":
      return <YouTubeEmbedComponent videoId={embedId} caption={caption} />;
    case "Instagram":
      return <InstagramEmbedComponent postId={embedId} caption={caption} />;
    case "Facebook":
      return <FacebookEmbedComponent postUrl={embedId} caption={caption} />;
    default:
      return null;
  }
};

export default SocialMediaEmbed;
