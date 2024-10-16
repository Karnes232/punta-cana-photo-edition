import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";

const PackageCard = ({ photoPackage }) => {
  const image = getImage(photoPackage.image.gatsbyImage);
  return (
    <Link
      to={photoPackage.link || "/test"}
      className="no-underline w-11/12 md:w-[20rem]"
      aria-label="Home"
    >
      <div className="flex flex-col justify-center items-center overflow-hidden shadow-lg group">
        <div className="w-full  h-[20rem]">
          <GatsbyImage
            image={image}
            alt={photoPackage.image.title}
            className="w-full object-cover object-center h-full"
            imgClassName=""
            objectPosition=""
          />
        </div>
        <div className="flex flex-col justify-center items-center h-[23rem]">
          <TextComponent
            title={photoPackage.title}
            className="my-5 2xl:mb-2 2xl:mt-10 text-2xl xl:text-3xl xl:h-8"
          />
          <div className="my-5">
            <ul className="flex flex-col justify-center items-center gap-2">
              {photoPackage.included.map((item, index) => {
                return (
                  <li key={index} className="list-disc text-sm">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="my-5">$ {photoPackage.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
