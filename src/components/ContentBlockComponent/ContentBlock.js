import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const ContentBlock = ({ content, page }) => {
  const image = getImage(content.image);
  let cardHeight = "h-[60rem] md:h-[50rem]";
  let secondaryCardHeight = "md:h-[39rem]  xl:h-[45rem] lg:w-[40rem]";
  if (page === "gender-reveal-and-baby-showers") {
    cardHeight = "h-[72rem] md:h-[50rem]";
    secondaryCardHeight = "md:h-[45rem]  xl:h-[45rem] lg:w-[45rem] ";
  }
  return (
    <>
      <div className={`bg-secondary-bg-color relative xl:static ${cardHeight}`}>
        <div className="xl:mx-auto xl:max-w-7xl xl:relative xl:h-[50rem]">
          <div className="overflow-hidden absolute mx-auto w-80 lg:w-[29rem] xl:w-[37rem] h-96 md:h-80 lg:h-[29rem] xl:h-[37rem] top-10 md:top-0 left-0 right-0 md:bottom-0 md:my-auto md:left-10 md:mx-0 z-50">
            <GatsbyImage
              image={image}
              alt={content.image.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`absolute bottom-14 md:bottom-0 md:top-0 md:my-auto left-0 md:left-60 right-0  w-11/12 md:w-[30rem]  xl:w-[45rem] pt-96 md:pt-10 md:pl-44 lg:pl-72 md:pr-200 lg:pr-28 xl:pr-[30rem]  bg-white mx-auto p-5 pb-24 xl:left-1/2 xl:transform xl:-translate-x-1/4 ${secondaryCardHeight}`}
          >
            <div className="md:flex md:flex-col md:justify-center h-full xl:w-80 group">
              <h2 className="text-2xl lg:text-3xl font-normal tracking-wider text-gray-800">
                {content.title}
              </h2>
              <h3 className="text-sm lg:text-base font-light text-gray-600 uppercase tracking-widest mt-3 md:mt-5">
                {content.secondaryTitle}
              </h3>
              <p className="mt-7 md:mt-10 text-base text-gray-800 leading-loose">
                {content.paragraph} {content.paragraph2}
              </p>
              <div className="mt-10">
                {content.buttonText === "&#8594;" ? (
                  <>
                    <Link
                      to={content.linkUrl}
                      className="no-underline flex justify-center items-center"
                      aria-label="Home"
                    >
                      {" "}
                      <span>
                        <HiOutlineArrowNarrowRight className="mb-10 text-4xl text-black xl:opacity-0 group-hover:opacity-100 xl:transition-opacity duration-300" />
                      </span>{" "}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={content.linkUrl}
                      className="no-underline border py-2 xl:py-3 px-6 xl:px-8 xl:text-lg rounded-3xl mt-10 text-gray-400 border-gray-500 transition duration-500 hover:bg-black hover:text-white"
                      aria-label="Home"
                    >
                      {content.buttonText}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentBlock;
