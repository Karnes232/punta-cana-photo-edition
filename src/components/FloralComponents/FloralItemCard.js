import React from "react";
import ItemCardSwiper from "../RentalComponents/ItemCardSwiper";
import FloralForm from "./FloralForm";

const FloralItemCard = ({ item }) => {
  return (
    <div className="w-[46%] md:w-[30%] my-5 rounded-lg overflow-hidden shadow-lg">
      <ItemCardSwiper photoList={item.images} height="h-44 lg:h-52" />
      <div className="px-6 py-4">
        <div className="font-bold text-lg flex justify-between" translate="no">
          {item.floralItem}
        </div>
        <p className="text-gray-700  my-2 text-base  line-clamp-4 min-h-[5rem]">
          {item.description}
        </p>
        <div className="text-lg font-bold text-center">${item.price}</div>
      </div>
      <FloralForm item={item} />
    </div>
  );
};

export default FloralItemCard;
