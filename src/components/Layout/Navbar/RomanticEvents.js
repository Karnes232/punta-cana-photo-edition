import React, { useState } from "react";
import { Link } from "gatsby";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Trans, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { localizedPath } from "../../../utils/siteLocales";

// react-pro-sidebar renders a SubMenu's toggle as a bare <a> with no href, which
// Lighthouse reports as an uncrawlable link. It is a disclosure control rather than
// a link, so we hand SubMenu a real <button> to render instead.
const RomanticEvents = ({ footer, setToggled }) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const localize = (path) => localizedPath(path, language);
  const [open, setOpen] = useState(false);

  // SubMenu toggles on Enter keyup because its default <a tabindex="0"> is not
  // natively activatable. A real <button> already fires click on Enter, so leaving
  // that handler in place would toggle twice and the menu would never open from the
  // keyboard. Props on this element are merged last, so this overrides it.
  const swallowLibraryKeyUp = () => {};

  return (
    <SubMenu
      label={t("Romantic Events")}
      className={footer ? "hamburgerSmall" : "hamburger"}
      open={open}
      onOpenChange={setOpen}
      component={
        <button
          type="button"
          aria-expanded={open}
          className={footer ? "hamburgerSmall" : "hamburger gap-2"}
          onKeyUp={swallowLibraryKeyUp}
        />
      }
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
