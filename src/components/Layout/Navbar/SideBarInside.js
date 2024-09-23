import { Link } from "gatsby";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
import MoreServices from "./MoreServices";
const SideBarInside = ({ footer }) => {
  return (
    <>
      <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
        <MenuItem
          component={
            <Link to="/" className={footer ? "hamburgerSmall" : "hamburger"} />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Home</p>
        </MenuItem>
        <RomanticEvents footer={footer} />
        <MenuItem
          component={
            <Link
              to="/photoshoots"
              className={footer ? "hamburgerSmall" : "hamburger"}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Photoshoots</p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              to="/event-planner"
              className={footer ? "hamburgerSmall" : "hamburger"}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            Corporate events
          </p>
        </MenuItem>
        <MoreServices footer={footer} />
        <MenuItem
          component={
            <Link
              to="/contact"
              className={footer ? "hamburgerSmall" : "hamburger"}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Contact</p>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SideBarInside;
