import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ArrowRight } from "lucide-react";
import React from "react";
import RichTextBlock from "./RichTextBlock";
import { hasContentfulCopy } from "./managedText";

const CommitmentSection = ({
  page,
  featureCard,
  content,
  managedText,
  language,
  ctaUrl,
}) => {
  const featureImage = getImage(featureCard?.image?.gatsbyImage);
  const useContentful = hasContentfulCopy(language);
  const imageAlt =
    (useContentful && featureCard?.image?.title) || content.featureImageAlt;

  return (
    <section className="bg-secondary-bg-color px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-white shadow-[0_32px_80px_rgba(0,0,0,0.13)] lg:grid-cols-2">
        <div className="relative min-h-[420px] bg-black lg:min-h-[620px]">
          {featureImage && (
            <div className="absolute inset-0">
              <GatsbyImage
                image={featureImage}
                alt={imageAlt}
                className="h-full w-full"
                imgClassName="object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#80651f]">
            {managedText(featureCard?.secondaryTitle, content.commitmentEyebrow)}
          </p>
          <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-5xl">
            {managedText(featureCard?.title, content.commitmentTitle)}
          </h2>
          {useContentful && page?.paragraph3?.raw ? (
            <RichTextBlock context={page.paragraph3} />
          ) : (
            <p className="mt-7 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
              {managedText(featureCard?.paragraph, content.commitmentBody)}
            </p>
          )}
          <a
            href={ctaUrl}
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-primary-color pb-2 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-black no-underline"
          >
            {managedText(featureCard?.buttonText, content.primaryCta)}
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
