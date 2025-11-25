import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const WorkedWith = ({ title1, title2, image }) => {
  const companiesImage = getImage(image);
  return (
    <div className="my-20">
      <TextComponent
        title={title1}
        heading="h2"
        className="my-10 tracking-wide text-3xl lg:text-4xl"
      />

      <div>
        <GatsbyImage
          image={companiesImage}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>

      <TextComponent
        title={title2}
        heading="h2"
        className="my-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <div className="border-b w-2/3 mx-auto my-10 border-[#9fa0a3]"></div>
    </div>
  );
};

export default WorkedWith;
