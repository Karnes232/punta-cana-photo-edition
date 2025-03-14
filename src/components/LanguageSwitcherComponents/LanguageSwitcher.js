import React, { useState, useRef, useEffect } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";

const LanguageSwitcher = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languageOptions = [
    { code: "en-US", display: "English", flag: "🇺🇸", path: "/" },
    { code: "es", display: "Español", flag: "🇪🇸", path: "/es" },
  ];
  const { originalPath } = useI18next();
  // Find the current language for display in the button
  const currentLangOption =
    languageOptions.find((lang) => lang.code === currentLanguage) ||
    languageOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white  px-3 py-2 rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-lg">{currentLangOption.flag}</span>
        <span className="font-medium text-gray-700">
          {currentLangOption.display}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languageOptions.map((lang) => (
              <Link
                key={lang.code}
                to={originalPath}
                language={lang.code}
                className={`flex items-center space-x-3 px-4 py-2 text-sm ${
                  currentLanguage === lang.code
                    ? "bg-blue-50  text-blue-600 "
                    : "text-gray-700  hover:bg-gray-100 "
                } transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.display}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
