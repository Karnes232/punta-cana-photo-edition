import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children, generalInfo }) => {
  return (
    <div className="min-h-screen font-crimson flex flex-col justify-between overflow-x-hidden bg-primary-bg-color">
      <Navbar />
      {children}
      <Footer generalInfo={generalInfo} />
    </div>
  );
};

export default Layout;
