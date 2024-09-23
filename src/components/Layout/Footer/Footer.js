import React from "react";
import Copyright from "./Copyright";
import SocialMedia from "./SocialMedia";

const Footer = ({ generalInfo }) => {
  console.log(generalInfo);
  return (
    <div className="flex flex-col h-screen">
      <div></div>
      <div className="flex flex-col xl:flex-row justify-between">
        <div></div>
        <SocialMedia generalInfo={generalInfo} />
      </div>
      <Copyright companyName={generalInfo.companyName} />
    </div>
  );
};

export default Footer;
