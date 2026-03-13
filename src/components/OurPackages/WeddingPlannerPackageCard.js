import React from "react";
import { CheckCircle, Star } from "lucide-react";

const WeddingPlannerPackageCard = ({ packageData }) => {
  console.log(packageData);
  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
        packageData.mostPopular
          ? "border-[#E4C05C] ring-2 ring-[#E4C05C]/20"
          : "border-gray-200 hover:border-[#E4C05C]"
      }`}
    >
      {/* Most Popular Badge */}
      {packageData.mostPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#E4C05C] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}
      <div className="text-center mb-6 h-32 flex flex-col justify-center">
        <h3
          className={`text-3xl font-bold text-[#48484a] mb-2 overflow-hidden`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {packageData.title}
        </h3>
        <p
          className={`text-gray-600 text-base overflow-hidden`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {packageData.description}
        </p>
      </div>
      {/* Bullet List - Flexible height */}
      <div className="flex-1 mb-6 text-left">
        <ul className="space-y-3">
          {packageData.includedItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#E4C05C] flex-shrink-0 mt-0.5" />
              <span className={` text-[#48484a] text-sm`}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price - Above CTA, consistent styling */}
      {typeof packageData.price === "number" && (
        <div className="border-t pt-4 mb-6 text-center">
          <p className={` text-3xl font-bold text-[#48484a]`}>
            {`$${packageData.price.toLocaleString()}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeddingPlannerPackageCard;
