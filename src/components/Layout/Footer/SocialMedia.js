import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const SocialMedia = ({ generalInfo }) => {
  return (
    <div className="flex flex-row space-x-5 py-4 text-slate-400">
      {generalInfo.facebook && (
        <a
          href={generalInfo.facebook}
          target="_blank"
          aria-label="Facebook"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
      )}
      {generalInfo.x && (
        <a href={generalInfo.x} target="_blank" aria-label="X" rel="noreferrer">
          <FaXTwitter />
        </a>
      )}
      {generalInfo.instagram && (
        <a
          href={generalInfo.instagram}
          target="_blank"
          aria-label="Instagram"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      )}
    </div>
  );
};

export default SocialMedia;
