import { Link } from "gatsby";
import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import RomanticEvents from "./RomanticEvents";
import useSharedContent from "../useSharedContent";
const SideBarInside = ({ footer, setToggled }) => {
  const { content, text, path } = useSharedContent();
  return (
    <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden">
      {content.navigation
        .filter((item) => footer || !item.footerOnly)
        .map((item) =>
          item.children?.length ? (
            <RomanticEvents
              key={item._key}
              item={item}
              footer={footer}
              setToggled={setToggled}
            />
          ) : (
            <MenuItem
              key={item._key}
              component={
                <Link
                  to={path(item.url)}
                  className={footer ? "hamburgerSmall" : "hamburger"}
                  onClick={footer ? undefined : () => setToggled(false)}
                />
              }
            >
              <p className={footer ? "hamburgerSmall" : "hamburger"}>
                {text(item.label)}
              </p>
            </MenuItem>
          ),
        )}
    </Menu>
  );
};
export default SideBarInside;
