import PropTypes from "prop-types";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.rentalItem === item.rentalItem,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.rentalItem === item.rentalItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      if (cartItems.length < 4) {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.rentalItem === item.rentalItem,
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.rentalItem !== item.rentalItem),
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.rentalItem === item.rentalItem
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]); // Include cartItems as a dependency here

  return (
    <CartContext.Provider
      value={{
        cartItems: isClient ? cartItems : [],
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
