import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import PackageCard from "./PackageCard";
import uniqueByTitle from "../../hooks/uniqueByTitle";

const OurPackages = ({ title, photoPackages, language }) => {
  const uniqueObjects = uniqueByTitle(photoPackages);
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
        {uniqueObjects.map((photoPackage) => {
          return (
            <PackageCard
              photoPackage={photoPackage}
              language={language}
              key={photoPackage.packagePage?.urlSlug || photoPackage.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OurPackages;
