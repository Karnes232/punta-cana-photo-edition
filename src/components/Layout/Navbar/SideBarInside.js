import { Link } from "gatsby";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
// import MoreServices from "./MoreServices";
import { Trans } from "gatsby-plugin-react-i18next";
const SideBarInside = ({ footer, setToggled }) => {
  return (
    <>
      <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
        <MenuItem
          component={
            <Link
              to="/"
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Home</p>
        </MenuItem>
        <RomanticEvents footer={footer} setToggled={setToggled} />
        {/* <MenuItem
          component={
            <Link
              to="/photoshoots"
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Photoshoots</p>
        </MenuItem> */}
        <MenuItem
          component={
            <Link
              to="/event-planner"
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Corporate events</Trans>
          </p>
        </MenuItem>
        {/* <MoreServices footer={footer} setToggled={setToggled} /> */}
        <MenuItem
          component={
            <Link
              to="/photo-gallery"
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Photo Gallery</Trans>
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              to="/contact"
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Contact</Trans>
          </p>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SideBarInside;
