import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import PackageCard from "./PackageCard";

// The proposal packages' cards, from the lowest price.
const OurPackages = ({ title, packagePages = [], fromLabel, language }) => {
  const cards = packagePages
    .filter((item) => item.package?.slug?.current)
    .sort((a, b) => a.package.price - b.package.price);

  return (
    <section
      aria-labelledby="proposal-packages-heading"
      className="py-16 md:py-24 bg-white"
    >
      {title && (
        <TextComponent
          id="proposal-packages-heading"
          title={title}
          heading="h2"
          className="mb-10 tracking-wide text-3xl lg:text-4xl"
        />
      )}

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto gap-8 mb-5">
        {cards.map((packagePage) => (
          <PackageCard
            packagePage={packagePage}
            fromLabel={fromLabel}
            language={language}
            key={packagePage.package.slug.current}
          />
        ))}
      </div>
    </section>
  );
};

export default OurPackages;
