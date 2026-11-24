import useSharedContent from "../useSharedContent";
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaFacebookMessenger,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = ({ generalInfo }) => {
  const { t, content, text, path } = useSharedContent();
  if (!generalInfo) return null;
  return (
    <div className="flex flex-row space-x-5 md:space-x-7 py-4 text-slate-600">
      {generalInfo.facebook && (
        <a
          href={generalInfo.facebook}
          target="_blank"
          aria-label={t("Facebook")}
          rel="noreferrer"
        >
          <FaFacebookF className="text-xl md:text-3xl" />
        </a>
      )}
      {generalInfo.x && (
        <a
          href={generalInfo.x}
          target="_blank"
          aria-label={t("X")}
          rel="noreferrer"
        >
          <FaXTwitter className="text-xl md:text-3xl" />
        </a>
      )}
      {generalInfo.instagram && (
        <a
          href={generalInfo.instagram}
          target="_blank"
          aria-label={t("Instagram")}
          rel="noreferrer"
        >
          <FaInstagram className="text-xl md:text-3xl" />
        </a>
      )}
      {generalInfo.telephone && (
        <a
          href={`tel:${generalInfo.telephone}`}
          target="_blank"
          aria-label={t("Call us")}
          rel="noreferrer"
        >
          <FaPhone className="text-xl md:text-3xl" />
        </a>
      )}
      {generalInfo.telephone && (
        <a
          href={`https://wa.me/${generalInfo.telephone}`}
          target="_blank"
          aria-label={t("WhatsApp")}
          rel="noreferrer"
        >
          <FaWhatsapp className="text-xl md:text-3xl" />
        </a>
      )}
      {generalInfo.messengerLink && (
        <a
          href={`${generalInfo.messengerLink}`}
          target="_blank"
          aria-label={t("Messenger")}
          rel="noreferrer"
        >
          <FaFacebookMessenger className="text-xl md:text-3xl" />
        </a>
      )}
    </div>
  );
};

export default SocialMedia;
