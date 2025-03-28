import React, { useContext } from "react";
import { CartContext } from "../../context/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "gatsby";
const FloatingCartButton = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      {cartItems.length !== 0 ? (
        <Link to="/cart/" className="no-underline">
          <button className="fixed z-50 flex px-2 justify-between items-center bottom-6 right-24 xl:right-32 rounded-full h-14 w-14 bg-[#E4C05C] text-white  font-bold">
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
