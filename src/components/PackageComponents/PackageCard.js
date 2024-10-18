import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";

const PackageCard = ({ photoPackage }) => {
  const image = getImage(photoPackage.image.gatsbyImage);

  let cardHeight = "";
  if (photoPackage.page === "Birthday Celebrations") {
    cardHeight = "h-[27rem]";
  }
  if (photoPackage.page === "Photo Shoots") {
    cardHeight = "h-[23rem]";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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
        <div
          className={`flex flex-col justify-between items-center ${cardHeight}`}
        >
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
          <div className="my-5 uppercase font-thin tracking-widest">
            Starting at {formatter.format(photoPackage.price)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
