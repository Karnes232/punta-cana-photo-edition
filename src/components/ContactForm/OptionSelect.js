import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import CreatableSelect from "react-select/creatable";
const OptionSelect = () => {
  const { t } = useTranslation();
  const style = {
    control: (base) => ({
      ...base,
      border: 1,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const eventOptions = [
    {
      value: "WEDDING PLANNING",
      label: t("WEDDING PLANNING"),
    },
    {
      value: "BIRTHDAY CELEBRATION",
      label: t("BIRTHDAY CELEBRATION"),
    },
    {
      value: "GENDER REVEAL & BABY SHOWER",
      label: t("GENDER REVEAL & BABY SHOWER"),
    },
    {
      value: "BACHELOR PARTY",
      label: t("BACHELOR PARTY"),
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
      <CreatableSelect
        isClearable
        className="contactFormInput"
        classNamePrefix="select"
        name="WeddingOptions"
        options={eventOptions}
        styles={style}
        required
        // onChange={cityChange}
        placeholder={t("Options")}
      />
    </div>
  );
};

export default OptionSelect;
