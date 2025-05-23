import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import TextComponent from "../TextComponent/TextComponent";
import { motion } from "framer-motion";
const WeddingPackageCard = ({ weddingPackage }) => {
  console.log(weddingPackage);
  const image = getImage(weddingPackage.image.gatsbyImage);
  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-hidden shadow-lg group w-11/12 md:w-[20rem] lg:w-[25rem]">
        <div className="w-full h-[20rem]">
          <GatsbyImage
            image={image}
            alt={weddingPackage.image.title}
            className="w-full object-cover object-center h-full"
            imgClassName=""
            objectPosition=""
          />
        </div>
        <div
          className={`flex flex-col justify-between items-center py-5 h-[32rem] lg:h-[36rem]`}
        >
          <TextComponent
            title={weddingPackage.title}
            className="mt-5 2xl:mb-2 text-2xl xl:text-3xl xl:h-8 capitalize"
          />

          {weddingPackage.paragraph && (
            <div className="h-[9rem] lg:h-[10rem] overflow-hidden">
              <TextComponent
                paragraph={weddingPackage.paragraph}
                pClassName="text-base lg:text-base capitalize lg:mt-0 mx-5 line-clamp-5"
              />
            </div>
          )}

          {weddingPackage.included !== null ? (
            <>
              {" "}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 3,
                  delay: 0.3,
                }}
                className="my-5"
              >
                <ul className="flex flex-col justify-center items-center gap-2">
                  {weddingPackage.included.map((item, index) => {
                    return (
                      <li key={index} className="list-disc text-sm capitalize">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          ) : (
            <></>
          )}
          {weddingPackage.callToActionButton && (
            <button className="bg-primary-color text-white px-4 py-2 rounded-md w-3/4">
              {weddingPackage.callToActionButton}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WeddingPackageCard;
