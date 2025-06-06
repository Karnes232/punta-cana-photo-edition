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
          <button className="fixed z-50 flex px-2 justify-between items-center bottom-6 right-24 xl:right-32 rounded-full h-14 w-14 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out">
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
