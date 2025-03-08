import React from "react";
import { FacebookEmbed } from "react-social-media-embed";

function convertFacebookUrl(fbUrl) {
  try {
    const url = new URL(fbUrl);
    if (url.pathname !== "/permalink.php") {
      throw new Error("Invalid permalink URL");
    }

    const postId = url.searchParams.get("story_fbid");
    const userId = url.searchParams.get("id");

    if (!postId || !userId) {
      throw new Error("Missing post ID or user ID in URL");
    }

    return `https://www.facebook.com/${userId}/posts/${postId}`;
  } catch (error) {
    console.error("Error converting Facebook URL:", error.message);
    return null;
  }
}

const FacebookEmbedComponent = ({ postUrl, caption }) => {
  // const convertedUrl = convertFacebookUrl(postUrl);

  return (
    <>
      <div className="flex flex-col max-w-md">
        <FacebookEmbed url={'https://www.facebook.com/GrandBayWhales/posts/534346908803449'} width={"350px"} />
        {caption && <p className="embed-caption">{caption}</p>}
      </div>
    </>
  );
};

export default FacebookEmbedComponent;
