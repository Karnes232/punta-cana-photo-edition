import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const ServiceCard = ({ icon, title, description }) => {
  const image = getImage(icon.gatsbyImage);
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 mr-3">
          <GatsbyImage image={image} alt={icon.title} width={50} height={50} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div>
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
