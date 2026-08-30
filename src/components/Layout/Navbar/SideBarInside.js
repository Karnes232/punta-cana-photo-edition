import { Link } from "gatsby";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { localizedPath } from "../../../utils/siteLocales";
const SideBarInside = ({ footer, setToggled }) => {
  const { language } = useI18next();
  const localize = (path) => localizedPath(path, language);
  return (
    <>
      <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
        <MenuItem
          component={
            <Link
              to={localizedPath("/", language)}
              className={footer ? "hamburgerSmall" : "hamburger"}
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p className={footer ? "hamburgerSmall" : "hamburger"}>
            {language === "pt"
              ? "Início"
              : language === "es"
                ? "Inicio"
                : "Home"}
          </p>
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
        {footer && (
          <MenuItem
            component={
              <Link to={localize("/blog/")} className="hamburgerSmall" />
            }
          >
            <p className="hamburgerSmall">Blog</p>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default SideBarInside;
