import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
const OptionSelect = () => {
  const { t } = useTranslation();
  const eventOptions = [
    {
      value: "WEDDING PLANNING",
      label: t("WEDDING PLANNING"),
    },
    {
      value: "GENDER REVEAL",
      label: t("GENDER REVEAL"),
    },
    {
      value: "ELOPEMENT OR VOW RENEWAL",
      label: t("ELOPEMENT OR VOW RENEWAL"),
    },
    {
      value: "PROPOSAL",
      label: t("PROPOSAL"),
    },
    {
      value: "CORPORATE EVENT PLANNER",
      label: t("CORPORATE EVENT PLANNER"),
    },
    {
      value: "OTHER",
      label: t("OTHER"),
    },
  ];
  return (
    <div className="relative mb-2 w-full group">
      <label htmlFor="event-type" className="sr-only">
        {t("Options")}
      </label>
      <select
        id="event-type"
        name="event-type"
        defaultValue=""
        className="contactFormInput w-full bg-white"
        required
      >
        <option value="" disabled>
          {t("Options")}
        </option>
        {eventOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionSelect;
