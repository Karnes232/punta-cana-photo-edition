import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
const Button = ({
  item,
  notifyAddedToCart,
  notifyRemovedFromCart,
  notifyCartFull,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  function handleClick(e) {
    e.preventDefault();

    const currentQuantity =
      cartItems.find((rentalItem) => rentalItem.rentalItem === item.rentalItem)
        ?.quantity || 0;

    if (currentQuantity < item.stock) {
      addToCart(item);
      notifyAddedToCart(item);
    } else {
      notifyCartFull(item);
    }
  }

  return (
    <div className="flex justify-center items-center mb-5">
      {!cartItems.find(
        (rentalItem) => rentalItem.rentalItem === item.rentalItem,
      ) ? (
        <button
          type="submit"
          onClick={handleClick}
          className={`bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded `}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            type="submit"
            onClick={handleClick}
            className={`bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded`}
          >
            +
          </button>{" "}
          <p className="text-gray-600 flex justify-center items-center">
            {
              cartItems.find(
                (rentalItem) => rentalItem.rentalItem === item.rentalItem,
              ).quantity
            }
          </p>
          <button
            type="submit"
            onClick={() => {
              const cartItem = cartItems.find(
                (rentalItem) => rentalItem.rentalItem === item.rentalItem,
              );
              if (cartItem.quantity === 1) {
                notifyRemovedFromCart(item);
                removeFromCart(item);
              } else {
                removeFromCart(item);
              }
            }}
            className={`bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded`}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default Button;
