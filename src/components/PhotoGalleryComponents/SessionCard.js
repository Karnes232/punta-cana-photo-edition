import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";

const SessionCard = ({ session }) => {
  const image = getImage(session.mainImage.gatsbyImage);
  return (
    <>
      <Link
        to={`/photo-gallery/${session.urlSlug}`}
        className="no-underline w-full md:w-[45%]"
        aria-label="Home"
      >
        <div className="flex flex-col justify-center items-center overflow-hidden  group">
          <div className="w-full h-[15rem] lg:h-[18rem]">
            <GatsbyImage
              image={image}
              alt={session.mainImage.title}
              className="w-full object-cover object-center h-full"
              imgClassName=""
              objectPosition=""
            />
          </div>
          <div
            className={`flex flex-col justify-between items-center my-5 lg:my-2`}
          >
            <TextComponent
              title={session.title}
              paragraph={session.date}
              className="my-2 text-lg font-medium font-montserrat uppercase tracking-wider"
              pClassName="text-sm font-montserrat !text-gray-400 lg:mt-2"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default SessionCard;
