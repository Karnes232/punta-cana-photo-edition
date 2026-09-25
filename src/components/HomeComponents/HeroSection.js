import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowRight } from "lucide-react";
import React from "react";

const HeroSection = ({
  page,
  content,
  managedText,
  primaryCtaUrl,
  secondaryCtaUrl,
}) => {
  const heroImage = getImage(page?.heroImageList?.[0]?.gatsbyImage);

  return (
    <section className="relative min-h-[760px] bg-black md:min-h-[780px]">
      {heroImage && (
        <div className="absolute inset-0">
          <GatsbyImage
            image={heroImage}
            alt={content.heroImageAlt}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full"
            imgClassName="object-cover object-center"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pb-16 pt-40 md:min-h-[780px] md:px-10 md:pt-44 lg:px-12">
        <div className="max-w-5xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.28em] text-primary-color md:text-sm">
            {managedText(page?.heroEyebrow, content.eyebrow)}
          </p>
          <h1 className="mt-6 max-w-5xl font-crimson text-5xl font-medium leading-[0.95] text-white sm:text-6xl md:text-7xl">
            {managedText(page?.heroHeading, content.heroHeading)}
          </h1>
          <p className="mt-7 max-w-3xl font-montserrat text-base leading-8 text-gray-100 md:text-xl md:leading-9">
            {managedText(page?.heroHeading2, content.heroIntro)}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={primaryCtaUrl}
              className="inline-flex items-center justify-center gap-2 bg-primary-color px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-black no-underline transition hover:opacity-90"
            >
              {managedText(page?.primaryCtaLabel, content.primaryCta)}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a
              href={secondaryCtaUrl}
              className="inline-flex items-center justify-center gap-2 border border-white/60 bg-black/20 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-black"
            >
              {managedText(page?.secondaryCtaLabel, content.secondaryCta)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
