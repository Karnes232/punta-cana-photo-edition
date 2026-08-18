import { Link } from "gatsby";
import React from "react";
import PopOverComponent from "./PopOverComponent";
import PopOverComponentHover from "./PopOverComponentHover";
import { Trans, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
const Sitemap = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const localize = (path) => `${language === "es" ? "/es" : ""}${path}`;
  const RomanticEventLinks = [
    {
      name: t("Marriage Proposals"),
      urlLink: localize("/proposal/"),
    },
    {
      name: t("Elopement & Vow renewal"),
      urlLink: localize("/punta-cana-elopement-packages/"),
    },
    {
      name: t("Wedding planning"),
      urlLink: localize("/puntacana-wedding-planner/"),
    },
    {
      name: t("Gender reveal"),
      urlLink: localize("/gender-reveal-punta-cana/"),
    },
  ];

  return (
    <div className="flex flex-row space-x-4">
      <Link
        to={language === "es" ? "/es/" : "/"}
        className="navLinks no-underline"
      >
        {language === "es" ? "Inicio" : "Home"}
      </Link>
      <div className="2xl:hidden">
        <PopOverComponent
          title={t("Romantic Events")}
          links={RomanticEventLinks}
        />
      </div>
      <div className="hidden 2xl:block">
        <PopOverComponentHover
          title={t("Romantic Events")}
          links={RomanticEventLinks}
        />
      </div>

      <Link to={localize("/event-planner/")} className="navLinks no-underline">
        <Trans>Corporate events</Trans>
      </Link>
      <Link to={localize("/contact/")} className="navLinks no-underline">
        <Trans>Contact</Trans>
      </Link>
    </div>
  );
};

export default Sitemap;
