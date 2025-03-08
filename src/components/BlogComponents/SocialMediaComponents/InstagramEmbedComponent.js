import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
const InstagramEmbedComponent = ({ postId, caption }) => {
  return (
    <>
      <div className="flex flex-col max-w-md">
        <InstagramEmbed
          url={`https://www.instagram.com/p/${postId}/`}
          width={"100%"}
        />
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    </>
  );
};

export default InstagramEmbedComponent;
