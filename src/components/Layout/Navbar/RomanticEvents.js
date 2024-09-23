import React from "react";
import { Link } from "gatsby";
import {
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
const RomanticEvents = () => {
  return (
    <SubMenu label="Romantic Events" className="hamburger">
      <MenuItem
        component={
          <Link
            to="/proposal"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Marriage Proposals</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/elopement-vow-renewal"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Elopement & Vow renewal</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/wedding"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Punta cana wedding photographer</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/puntacana-wedding-planner"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Wedding planning</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/birthday-celebrations"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Birthday Celebrations</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/gender-reveal-and-baby-showers"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Gender reveal and baby showers</p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/punta-cana-bachelor-party"
            className="no-underline uppercase text-sm"
          />
        }
      >
        <p>Punta Cana Bachelor Party</p>
      </MenuItem>
    </SubMenu>
  );
};

export default RomanticEvents;
