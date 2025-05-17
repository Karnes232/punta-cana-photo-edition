import React from "react";
import ServiceCard from "./ServiceCard";
import RichText from "../RichTextComponents/RichText";

const WhyChooseUs = ({ richText, serviceCards }) => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Why Choose Us Section with Left-Right Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Why Choose Us Intro */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-12 lg:mb-0">
            <RichText context={richText} />

            {/* Our Services Preview (Moved to left side) */}
          </div>

          {/* Right Side: Services Grid */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCards.map((serviceCard) => (
                <ServiceCard
                  icon={serviceCard.icon}
                  title={serviceCard.title}
                  description={serviceCard.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
