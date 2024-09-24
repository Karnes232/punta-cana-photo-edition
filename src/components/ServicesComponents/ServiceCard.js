import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const ServiceCard = ({ service }) => {
  console.log(service.cardDescription);
  const image = getImage(service.cardImage);
  return (
    <div className="flex flex-col w-11/12 md:w-[20rem] justify-center items-center overflow-hidden shadow-lg xl:group">
      <div className="w-full h-[30rem]">
        <GatsbyImage
          image={image}
          alt={service.cardImage.title}
          className="w-full object-cover h-full"
          imgClassName=""
          objectPosition=""
        />
      </div>
      <TextComponent
        title={service.typeOfService}
        className="mt-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl"
      />
      <TextComponent
        title={service.cardDescription}
        className="my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl"
      />
      {/* <HiOutlineArrowNarrowRight className="mb-10 text-4xl text-gray-400 xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity duration-300"/> */}
    </div>
  );
};

export default ServiceCard;
