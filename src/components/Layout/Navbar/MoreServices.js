import React from "react";
import { Link } from "gatsby";
import { MenuItem, SubMenu } from "react-pro-sidebar";
const MoreServices = ({ footer, setToggled }) => {
  return (
    <SubMenu
      label="More photo-video services"
      className={footer ? "hamburgerSmall" : "hamburger"}
    >
      <MenuItem
        component={
          <Link
            to="/real-estate-photography"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>Real Estate Photography</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/videos-and-comercial-photos"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>Videos and comercial photos</p>
      </MenuItem>
    </SubMenu>
  );
};

export default MoreServices;
