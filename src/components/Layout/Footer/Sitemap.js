import { Link } from "gatsby";
import React from "react";
import PopOverComponent from "./PopOverComponent";
import PopOverComponentHover from "./PopOverComponentHover";

const Sitemap = () => {
  const RomanticEventLinks = [
    {
      name: "Marriage Proposals",
      urlLink: "/proposal",
    },
    {
      name: "Elopement & Vow renewal",
      urlLink: "/elopement-vow-renewal",
    },
    // {
    //   name: "Punta cana wedding photographer",
    //   urlLink: "/wedding",
    // },
    {
      name: "Wedding planning",
      urlLink: "/puntacana-wedding-planner",
    },
    {
      name: "Birthday Celebrations",
      urlLink: "/birthday-celebrations",
    },
    {
      name: "Gender reveal and baby showers",
      urlLink: "/gender-reveal-and-baby-showers",
    },
    {
      name: "Punta Cana Bachelor Party",
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
        <PopOverComponent title="Romantic Events" links={RomanticEventLinks} />
      </div>
      <div className="hidden 2xl:block">
        <PopOverComponentHover
          title="Romantic Events"
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
          Corporate events
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
          Photo Gallery
        </button>
      </Link>
      <Link to="/contact" className="no-underline">
        <button className={`navLinks`} translate="no">
          Contact
        </button>
      </Link>
    </div>
  );
};

export default Sitemap;
