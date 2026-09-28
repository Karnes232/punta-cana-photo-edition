import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { withSizes } from "../../utils/imageSizes";
import { localizedPath } from "../../utils/siteLocales";

// The card is w-11/12 on mobile and a fixed w-[20rem] (320px) from md up.
const CARD_SIZES = "(min-width: 768px) 320px, 92vw";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// One proposal package's card: its name, photo and highlights from the
// package's page in this language, and its price and address from the shared
// Proposal Package.
const PackageCard = ({ packagePage, fromLabel, language }) => {
  const { name, cardImage, cardHighlights = [], package: shared } = packagePage;
  const image = withSizes(
    getImage(cardImage?.asset?.gatsbyImageData),
    CARD_SIZES,
  );

  return (
    <Link
      to={localizedPath(`/packages/${shared.slug.current}/`, language)}
      className="no-underline w-11/12 md:w-[20rem]"
      aria-label={name}
    >
      <div className="flex flex-col justify-center items-center overflow-hidden shadow-lg group">
        <div className="w-full  h-[20rem]">
          {image && (
            <GatsbyImage
              image={image}
              alt={cardImage.alt}
              title={cardImage.alt}
              className="w-full object-cover object-center h-full"
              imgClassName=""
              objectPosition=""
            />
          )}
        </div>
        <div className="flex flex-col justify-between items-center h-[28rem]">
          <TextComponent
            title={name}
            heading="h3"
            className="my-5 2xl:mb-2 text-2xl xl:text-3xl xl:h-8 capitalize"
          />
          <div className="my-5">
            <ul className="flex flex-col justify-center items-center gap-2">
              {(cardHighlights || []).map((item, index) => (
                <li key={index} className="list-disc text-sm capitalize">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {shared.price != null && (
            <div className="my-5 uppercase font-thin tracking-widest">
              {fromLabel} {formatter.format(shared.price)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
