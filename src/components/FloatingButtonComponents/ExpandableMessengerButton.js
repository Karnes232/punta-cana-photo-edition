import React, { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaWhatsapp, FaComments } from "react-icons/fa";

const ExpandableMessengerButton = ({ messengerLink, telephone, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed z-[500] bottom-6 right-6 xl:right-10">
      {/* WhatsApp Button - appears when expanded */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isExpanded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-75 pointer-events-none"
        } mb-3`}
      >
        <a
          href={`https://api.whatsapp.com/send?phone=${telephone}`}
          aria-label="WhatsApp"
          rel="noreferrer"
          target="_blank"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>

      {/* Messenger Button - appears when expanded */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isExpanded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-2 opacity-0 scale-75 pointer-events-none"
        } mb-3`}
      >
        <a
          href={messengerLink}
          aria-label="Messenger"
          rel="noreferrer"
          target="_blank"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#007FFF] text-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <FaFacebookMessenger size={24} />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleExpanded}
        className={`flex justify-center items-center rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isExpanded
            ? "bg-gray-600 text-white transform rotate-45"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        aria-label={
          isExpanded
            ? language === "pt"
              ? "Fechar menu"
              : language === "fr"
                ? "Fermer le menu"
                : language === "es"
                  ? "Cerrar menú"
                  : "Close menu"
            : language === "pt"
              ? "Abrir menu de contato"
              : language === "fr"
                ? "Ouvrir le menu de contact"
                : language === "es"
                  ? "Abrir menú de contacto"
                  : "Open contact menu"
        }
      >
        {isExpanded ? (
          <div className="text-2xl font-light">×</div>
        ) : (
          <FaComments size={24} />
        )}
      </button>
    </div>
  );
};

export default ExpandableMessengerButton;
