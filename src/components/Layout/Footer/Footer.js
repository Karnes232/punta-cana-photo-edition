import React from "react";
import Copyright from "./Copyright";
import SocialMedia from "./SocialMedia";
import { FaInstagram } from "react-icons/fa";
import SideBarInside from "../Navbar/SideBarInside";
import Sitemap from "./Sitemap";
import Signature from "./Signature";
const Footer = ({ generalInfo }) => {
  const instatag = generalInfo.instagram.split("/")[3];
  return (
    <div className="flex flex-col h-screen lg:h-[50vh] xl:max-w-6xl xl:w-full xl:mx-auto justify-between py-10 mx-8 md:mx-10">
      <div className="flex justify-center items-center">
        {generalInfo.instagram && (
          <a
            href={generalInfo.instagram}
            target="_blank"
            aria-label="Instagram"
            rel="noreferrer"
            className="flex flex-row items-center justify-center space-x-2 text-gray-400"
          >
            <FaInstagram className="text-2xl" />{" "}
            <p className="uppercase text-sm tracking-widest">@{instatag}</p>
          </a>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
        <div className="md:hidden">
          <SideBarInside footer={true} />
        </div>
        <div className="hidden md:flex md:justify-center md:items-center mt-0">
          <Sitemap />
        </div>
        <SocialMedia generalInfo={generalInfo} />
      </div>
      <Copyright companyName={generalInfo.companyName} />
      <Signature />
    </div>
  );
};

export default Footer;
