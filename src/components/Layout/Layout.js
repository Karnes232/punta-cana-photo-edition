import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useImageProtection } from "../../hooks/useImageProtection";

const Layout = ({ children, generalInfo }) => {
  useImageProtection();
  return (
    <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
      <Navbar />
      {children}
      <Footer generalInfo={generalInfo} />
    </div>
  );
};

export default Layout;
