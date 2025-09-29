import React from "react";
import { Link } from "gatsby";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
const RomanticEvents = ({ footer, setToggled }) => {
  const { t } = useTranslation();
  return (
    <SubMenu
      label={t("Romantic Events")}
      className={footer ? "hamburgerSmall" : "hamburger"}
    >
      <MenuItem
        component={
          <Link
            to="/proposal-packages"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Marriage Proposals</Trans>
        </p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/elopement-vow-renewal"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Elopement & Vow renewal</Trans>
        </p>
      </MenuItem>
      {/* <MenuItem
        component={
          <Link
            to="/wedding"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>Punta Cana wedding photographer</p>
      </MenuItem> */}
      <MenuItem
        component={
          <Link
            to="/puntacana-wedding-planner"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Wedding planning</Trans>
        </p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/birthday-celebrations"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Birthday Celebrations</Trans>
        </p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/gender-reveal-and-baby-showers"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Gender reveal and baby showers</Trans>
        </p>
      </MenuItem>
      <MenuItem
        component={
          <Link
            to="/punta-cana-bachelor-party"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Punta Cana Bachelor Party</Trans>
        </p>
      </MenuItem>
    </SubMenu>
  );
};

export default RomanticEvents;
