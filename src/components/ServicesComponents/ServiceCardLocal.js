import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "gatsby";
const ServiceCardLocal = ({ service }) => {
  const image = getImage(service.cardImage.localFile.childImageSharp.gatsbyImageData);
  return (
    <Link
      to={service?.page?.url || "/test"}
      className="no-underline w-11/12 md:w-[20rem]"
      aria-label="Home"
    >
      <div className="flex flex-col justify-center items-center overflow-hidden shadow-lg group">
        <div className="w-full h-[30rem] md:h-[22rem]">
          <GatsbyImage
            image={image}
            alt={service.cardImage.title}
            className="w-full object-cover object-center h-full"
            imgClassName=""
            objectPosition=""
          />
        </div>
        <TextComponent
          title={service.typeOfService}
          className="mt-5 2xl:mb-2 2xl:mt-10 text-3xl xl:text-3xl h-10"
        />
        <TextComponent
          title={service.cardDescription}
          className="mt-5 mb-10 mx-10 text-base tracking-wide font-crimson font-light uppercase h-60"
        />
        <HiOutlineArrowNarrowRight className="mb-10 text-4xl text-gray-400 xl:opacity-0 group-hover:opacity-100 xl:transition-opacity duration-300" />
      </div>
    </Link>
  );
};

export default ServiceCardLocal;
