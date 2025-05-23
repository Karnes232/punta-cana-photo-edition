import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const AdminLayout = ({ children, generalInfo }) => {
  return (
    <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
      <Navbar />

      {children}
      <Footer generalInfo={generalInfo} />
    </div>
  );
};

export default AdminLayout;
