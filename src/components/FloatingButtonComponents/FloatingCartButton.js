import React, { useContext } from "react";
import { CartContext } from "../../context/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "gatsby";
const FloatingCartButton = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      {cartItems.length !== 0 ? (
        <Link to="/event-rentals/cart/" className="no-underline">
          <button className="fixed z-50 flex px-2 justify-between items-center bottom-6 right-24 xl:right-32 rounded-full h-14 w-14 bg-primary-color text-white  font-bold">
            <AiOutlineShoppingCart size={25} />
            {cartItems.length}
          </button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingCartButton;
