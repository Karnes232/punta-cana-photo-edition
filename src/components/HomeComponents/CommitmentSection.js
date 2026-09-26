import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowRight } from "lucide-react";
import React from "react";
import { siteLink } from "./siteLink";

const CommitmentSection = ({ home, language }) => {
  const image = getImage(home.commitmentImage?.asset?.gatsbyImageData);
  const cta = home.commitmentCta;

  return (
    <section className="bg-secondary-bg-color px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-white shadow-[0_32px_80px_rgba(0,0,0,0.13)] lg:grid-cols-2">
        <div className="relative min-h-[420px] bg-black lg:min-h-[620px]">
          {image && (
            <div className="absolute inset-0">
              <GatsbyImage
                image={image}
                alt={home.commitmentImage.alt}
                className="h-full w-full"
                imgClassName="object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#80651f]">
            {home.commitmentEyebrow}
          </p>
          <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-5xl">
            {home.commitmentTitle}
          </h2>
          <p className="mt-7 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
            {home.commitmentBody}
          </p>
          {cta && (
            <a
              href={siteLink(cta.url, language)}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-primary-color pb-2 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-black no-underline"
            >
              {cta.label}
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
