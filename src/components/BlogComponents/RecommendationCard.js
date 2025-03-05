import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const RecommendationCard = ({ blog }) => {
  const image = getImage(blog.backgroundImage[0].gatsbyImage);

  return (
    <>
      <Link to={`/blog/${blog.slug?.trim()}`}>
        <div className="w-80 mx-auto my-5 rounded-lg overflow-hidden shadow-lg">
          <GatsbyImage
            image={image}
            alt={blog.title}
            className="w-full object-cover h-40"
            imgClassName="object-cover"
            objectPosition="center"
          />
          <div className="px-6 py-4">
            <div className="font-bold h-8 text-base mb-2 flex justify-between">
              <div className="truncate mr-3">{blog.title}</div>
            </div>
            <p className="text-gray-700 h-32 text-xs whitespace-pre-wrap truncate">
              {blog.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecommendationCard;
