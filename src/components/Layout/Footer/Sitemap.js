import { Link } from "gatsby";
import React from "react";
import PopOverComponent from "./PopOverComponent";
import PopOverComponentHover from "./PopOverComponentHover";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
const Sitemap = () => {
  const { t } = useTranslation();
  const RomanticEventLinks = [
    {
      name: t("Marriage Proposals"),
      urlLink: "/proposal",
    },
    {
      name: t("Elopement & Vow renewal"),
      urlLink: "/elopement-vow-renewal",
    },
    // {
    //   name: "Punta cana wedding photographer",
    //   urlLink: "/wedding",
    // },
    {
      name: t("Wedding planning"),
      urlLink: "/puntacana-wedding-planner",
    },
    {
      name: t("Birthday Celebrations"),
      urlLink: "/birthday-celebrations",
    },
    {
      name: t("Gender reveal and baby showers"),
      urlLink: "/gender-reveal-and-baby-showers",
    },
    {
      name: t("Punta Cana Bachelor Party"),
      urlLink: "/punta-cana-bachelor-party",
    },
  ];

  // const MoreServicesLinks = [
  //   {
  //     name: "Real Estate Photography",
  //     urlLink: "/real-estate-photography",
  //   },
  //   {
  //     name: "Videos and comercial photos",
  //     urlLink: "/videos-and-comercial-photos",
  //   },
  // ];

  return (
    <div className="flex flex-row space-x-4">
      <Link to="/" className="no-underline">
        <button className={`navLinks`} translate="no">
          Home
        </button>
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
      {/* <Link to="/photoshoots" className="no-underline">
        <button className={`navLinks`} translate="no">
          Photoshoots
        </button>
      </Link> */}
      <Link to="/event-planner" className="no-underline">
        <button className={`navLinks`} translate="no">
          <Trans>Corporate events</Trans>
        </button>
      </Link>
      <Link to="/event-rentals" className="no-underline">
        <button className={`navLinks`} translate="no">
          <Trans>Rental Items</Trans>
        </button>
      </Link>
      {/* <div className="2xl:hidden">
        <PopOverComponent
          title="More photo-video services"
          links={MoreServicesLinks}
        />
      </div>
      <div className="hidden 2xl:block">
        <PopOverComponentHover
          title="More photo-video services"
          links={MoreServicesLinks}
        />
      </div> */}
      <Link to="/photo-gallery" className="no-underline">
        <button className={`navLinks`} translate="no">
          <Trans>Photo Gallery</Trans>
        </button>
      </Link>
      <Link
        to="/blog/complete-guide-to-organizing-events-in-punta-cana"
        className="no-underline"
      >
        <button className={`navLinks`} translate="no">
          Blog
        </button>
      </Link>
      <Link to="/contact" className="no-underline">
        <button className={`navLinks`} translate="no">
          <Trans>Contact</Trans>
        </button>
      </Link>
    </div>
  );
};

export default Sitemap;
