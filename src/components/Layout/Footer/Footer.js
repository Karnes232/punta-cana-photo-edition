import React from "react";
import Copyright from "./Copyright";
import SocialMedia from "./SocialMedia";
import { FaInstagram } from "react-icons/fa";
const Footer = ({ generalInfo }) => {
  console.log(generalInfo);
  const instatag = generalInfo.instagram.split("/")[3];
  return (
    <div className="flex flex-col h-screen">
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
      <div className="flex flex-col xl:flex-row justify-between">
        <div></div>
        <SocialMedia generalInfo={generalInfo} />
      </div>
      <Copyright companyName={generalInfo.companyName} />
    </div>
  );
};

export default Footer;
