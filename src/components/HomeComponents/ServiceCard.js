import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowRight } from "lucide-react";
import React from "react";
import { withSizes } from "../../utils/imageSizes";
import { siteLink } from "./siteLink";

// The cards render in a sm:grid-cols-2 lg:grid-cols-4 grid, so they are about
// 320px wide on desktop rather than the source width.
const CARD_SIZES = "(min-width: 1360px) 302px, (min-width: 1024px) calc((100vw - 152px) / 4), (min-width: 768px) calc((100vw - 104px) / 2), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

const ServiceCard = ({ card, linkLabel, language }) => {
  const image = withSizes(
    getImage(card.image?.asset?.gatsbyImageData),
    CARD_SIZES,
  );
  const url = siteLink(card.link, language);

  if (!image || !url) return null;

  return (
    <article className="group relative min-h-[390px] overflow-hidden bg-black shadow-[0_28px_60px_rgba(0,0,0,0.14)]">
      <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.035]">
        <GatsbyImage
          image={image}
          alt={card.image.alt}
          className="h-full w-full"
          imgClassName="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
      <div className="relative flex min-h-[390px] flex-col justify-end p-7 md:p-8">
        <h3 className="font-crimson text-3xl font-medium leading-tight text-white">
          {card.title}
        </h3>
        <p className="mt-3 font-montserrat text-sm leading-6 text-gray-100">
          {card.description}
        </p>
        <Link
          to={url}
          className="mt-6 inline-flex items-center gap-2 font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-primary-color no-underline"
          aria-label={card.title}
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
