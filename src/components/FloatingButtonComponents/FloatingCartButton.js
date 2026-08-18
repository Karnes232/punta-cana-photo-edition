import React, { useContext } from "react";
import { CartContext } from "../../context/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
const FloatingCartButton = () => {
  const { cartItems } = useContext(CartContext);
  const { language } = useI18next();
  const cartPath = `${language === "es" ? "/es" : ""}/event-rentals/cart/`;

  return (
    <>
      {cartItems.length !== 0 ? (
        <Link
          to={cartPath}
          aria-label={`Event rentals cart with ${cartItems.length} item${cartItems.length === 1 ? "" : "s"}`}
          className="fixed bottom-6 right-24 z-50 flex h-14 w-14 transform items-center justify-between rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-2 font-bold text-black no-underline shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-xl xl:right-32"
        >
          <AiOutlineShoppingCart size={25} />
          {cartItems.length}
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingCartButton;
