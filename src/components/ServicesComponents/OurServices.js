import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import ServiceCard from "./ServiceCard";
import ServiceCardLocal from "./ServiceCardLocal";

const OurServices = ({ title, services }) => {
  
  return (
    <>
      <TextComponent
        title={title}
        heading="h2"
        className="mb-5 tracking-wide 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl"
      />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:justify-evenly max-w-5xl xl:max-w-6xl mx-auto gap-8 mb-5">
        {services.map((service, index) => {
          return <ServiceCardLocal service={service} key={index} />;
        })}
      </div>
    </>
  );
};

export default OurServices;
