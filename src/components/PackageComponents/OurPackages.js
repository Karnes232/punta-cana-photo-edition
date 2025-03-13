import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import PackageCard from "./PackageCard";
import uniqueByTitle from "../../hooks/uniqueByTitle";

const OurPackages = ({ title, photoPackages }) => {
  const uniqueObjects = uniqueByTitle(photoPackages);
  return (
    <>
      <TextComponent
        title={title}
        className="mb-10 tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
      />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto gap-8 mb-5">
        {uniqueObjects.map((photoPackage, index) => {
          return <PackageCard photoPackage={photoPackage} key={index} />;
        })}
      </div>
    </>
  );
};

export default OurPackages;
