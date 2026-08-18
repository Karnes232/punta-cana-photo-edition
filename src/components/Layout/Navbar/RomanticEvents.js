import React from "react";
import { Link } from "gatsby";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Trans, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
const RomanticEvents = ({ footer, setToggled }) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const localize = (path) => `${language === "es" ? "/es" : ""}${path}`;
  return (
    <SubMenu
      label={t("Romantic Events")}
      className={footer ? "hamburgerSmall" : "hamburger"}
    >
      <MenuItem
        component={
          <Link
            to={localize("/proposal/")}
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
            to={localize("/punta-cana-elopement-packages/")}
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
            to={localize("/puntacana-wedding-planner/")}
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
            to={localize("/gender-reveal-punta-cana/")}
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
