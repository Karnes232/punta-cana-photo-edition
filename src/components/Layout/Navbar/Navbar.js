import React from "react";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = ({ overlay = false }) => {
  return (
    <nav
      className={`z-[200] h-24 w-full pt-5 md:h-36 ${
        overlay
          ? "absolute inset-x-0 top-0 bg-gradient-to-b from-slate-950/80 via-slate-950/35 to-transparent"
          : "relative bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between bg-transparent max-w-6xl mx-5 md:mx-10 lg:mx-8 xl:mx-auto">
        <div className="hidden lg:block"></div>
        <Logo overlay={overlay} />
        <HamburgerMenu overlay={overlay} />
      </div>
    </nav>
  );
};

export default Navbar;
