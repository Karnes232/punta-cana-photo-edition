import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useImageProtection } from "../../hooks/useImageProtection";
import MessengerButton from "../FloatingButtonComponents/MessengerButton";
import { CartProvider } from "../../context/cart";

const Layout = ({ children, generalInfo }) => {
  useImageProtection();
  return (
    <CartProvider>
      <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
        <Navbar />
        <MessengerButton />
        {children}
        <Footer generalInfo={generalInfo} />
      </div>
    </CartProvider>
  );
};

export default Layout;
