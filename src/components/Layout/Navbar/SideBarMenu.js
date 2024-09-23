import { Link } from "gatsby";
import React from "react";
import { IoClose } from "react-icons/io5";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
import MoreServices from "./MoreServices";
const SideBarMenu = ({ toggled, setToggled }) => {
  return (
    <>
      <Sidebar
        backgroundColor="rgb(255, 255, 255, 1)"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
        rtl
        width="100%"
      >
        <div className="flex flex-col h-full items-center text-center justify-between">
          {toggled && (
            <div className="fixed top-5 right-5">
              <button
                className="p-2 text-2xl text-gray-500"
                onClick={() => setToggled(false)}
              >
                <IoClose />
              </button>
            </div>
          )}

          <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
            <MenuItem component={<Link to="/" className="hamburger" />}>
              <p className="hamburger">Home</p>
            </MenuItem>
            <RomanticEvents />
            <MenuItem
              component={<Link to="/photoshoots" className="hamburger" />}
            >
              <p className="hamburger">Photoshoots</p>
            </MenuItem>
            <MenuItem
              component={<Link to="/event-planner" className="hamburger" />}
            >
              <p className="hamburger">Corporate events</p>
            </MenuItem>
            <MoreServices />
            <MenuItem component={<Link to="/contact" className="hamburger" />}>
              <p className="hamburger">Contact</p>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </>
  );
};

export default SideBarMenu;
