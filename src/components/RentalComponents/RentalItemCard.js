import React from "react";
import ItemCardSwiper from "./ItemCardSwiper";
import Button from "./Button";

const RentalItemCard = ({
  item,
  notifyAddedToCart,
  notifyRemovedFromCart,
  notifyCartFull,
}) => {
  return (
    <div className="min-w-[15rem] max-w-sm md:max-w-[20rem] my-5 mx-2 rounded-lg overflow-hidden shadow-lg">
      <ItemCardSwiper
        photoList={item.images}
        height={"h-[25rem] md:h-[22rem]"}
      />
      <div className="px-6 py-4">
        <div className="font-bold h-10 text-lg mb-2 flex justify-between">
          <div className="truncate mr-3" translate="no">
            {item.rentalItem}
          </div>
          <div>${item.price}</div>
        </div>
        <p className="text-gray-700 min-h-[9rem] text-base line-clamp-6">
          {item.description}
        </p>
      </div>
      <Button
        item={item}
        notifyAddedToCart={notifyAddedToCart}
        notifyRemovedFromCart={notifyRemovedFromCart}
        notifyCartFull={notifyCartFull}
      />
    </div>
  );
};

export default RentalItemCard;
