import { Link } from "gatsby";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
const SideBarInside = ({ footer, setToggled }) => {
  const { language } = useI18next();
  const localize = (path) => `${language === "es" ? "/es" : ""}${path}`;
  return (
    <>
      <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
        <MenuItem
          component={
            <Link
              to={language === "es" ? "/es/" : "/"}
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>Home</p>
        </MenuItem>
        <RomanticEvents footer={footer} setToggled={setToggled} />

        <MenuItem
          component={
            <Link
              to={localize("/event-planner/")}
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Corporate events</Trans>
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              to={localize("/event-rentals/")}
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Rental Items</Trans>
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              to={localize("/floral-art/")}
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            <Trans>Floral Art</Trans>
          </p>
        </MenuItem>

        <MenuItem
          component={
            <Link
              to={localize("/contact/")}
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
