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
            to="/proposal"
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
            to="/punta-cana-elopement-packages"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Elopement & Vow renewal</Trans>
        </p>
      </MenuItem>
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
            to="/gender-reveal-punta-cana"
            className="no-underline uppercase text-sm"
            onClick={footer ? undefined : () => setToggled(false)}
          />
        }
      >
        <p>
          <Trans>Gender reveal</Trans>
        </p>
      </MenuItem>
    </SubMenu>
  );
};

export default RomanticEvents;
