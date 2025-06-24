import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { Trans } from "gatsby-plugin-react-i18next";
const PackageCardLocal = ({ photoPackage }) => {
  const image = getImage(photoPackage.image.localFile.childImageSharp.gatsbyImageData);
  let cardHeight = "";
  if (photoPackage.page === "Birthday Celebrations") {
    cardHeight = "h-[27rem]";
  }
  if (photoPackage.page === "Photo Shoots") {
    cardHeight = "h-[23rem]";
  }
  if (photoPackage.page === "Gender Reveal") {
    cardHeight = "h-[29rem]";
  }
  if (photoPackage.page === "Bachelor Party") {
    cardHeight = "h-[20rem]";
  }
  if (photoPackage.page === "Proposal") {
    cardHeight = "h-[28rem]";
  }
  if (photoPackage.page === "Real Estate") {
    cardHeight = "h-[24rem]";
  }
  if (photoPackage.page === "Elopement") {
    cardHeight = "h-[26rem]";
  }
  if (photoPackage.page === "Event-Planner") {
    cardHeight = "h-[22rem]";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <Link
        to={
          photoPackage.packagePage
            ? `/packages/${photoPackage.packagePage?.urlSlug}`
            : photoPackage.link
        }
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
              className="my-5 2xl:mb-2 text-2xl xl:text-3xl xl:h-8 capitalize"
            />

            {photoPackage.included !== null ? (
              <>
                {" "}
                <div className="my-5">
                  <ul className="flex flex-col justify-center items-center gap-2">
                    {photoPackage.included.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="list-disc text-sm capitalize"
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
            {photoPackage.paragraph && (
              <>
                <TextComponent
                  paragraph={photoPackage.paragraph}
                  pClassName="text-base lg:text-base capitalize lg:mt-0 mx-5"
                />
              </>
            )}
            {photoPackage.price ? (
              <div className="my-5 uppercase font-thin tracking-widest">
                <Trans>Starting at</Trans>{" "}
                {formatter.format(photoPackage.price)}
              </div>
            ) : (
              <div className="my-5 uppercase font-thin tracking-widest">
                <Trans>Contact us</Trans>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PackageCardLocal;
