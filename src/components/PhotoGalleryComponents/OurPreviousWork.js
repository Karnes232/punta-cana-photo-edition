import React from "react";
import SessionCard from "./SessionCard";

const OurPreviousWork = ({ previousWork }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center md:justify-evenly max-w-5xl xl:max-w-6xl md:mx-2 lg:mx-auto gap-10 mb-5">
      {previousWork.map((work, index) => {
        return <SessionCard key={index} session={work} />;
      })}
    </div>
  );
};

export default OurPreviousWork;
