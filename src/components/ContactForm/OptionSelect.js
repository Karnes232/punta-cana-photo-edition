import React from "react";
import CreatableSelect from "react-select/creatable";
const OptionSelect = () => {
  const style = {
    control: (base) => ({
      ...base,
      border: 1,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  let weddingOptions = [
    {
      value: "WEDDING PHOTO/VIDEO PACKAGES",
      label: "WEDDING PHOTO/VIDEO PACKAGES",
    },
    {
      value: "WEDDING PLANNING",
      label: "WEDDING PLANNING",
    },
    {
      value: "PHOTOSHOOT",
      label: "PHOTOSHOOT",
    },
    {
      value: "BIRTHDAY CELEBRATION",
      label: "BIRTHDAY CELEBRATION",
    },
    {
      value: "GENDER REVEAL & BABY SHOWER",
      label: "GENDER REVEAL & BABY SHOWER",
    },
    {
      value: "BACHELOR PARTY",
      label: "BACHELOR PARTY",
    },
    {
      value: "PROPOSAL",
      label: "PROPOSAL",
    },
    {
      value: "CORPORATE EVENT PLANNER",
      label: "CORPORATE EVENT PLANNER",
    },
    {
      value: "PHOTOGRAPHY COMMERCIAL AND CORPORATE VIDEO",
      label: "PHOTOGRAPHY COMMERCIAL AND CORPORATE VIDEO",
    },
    {
      value: "REAL ESTATE PHOTOS-VIDEOS",
      label: "REAL ESTATE PHOTOS-VIDEOS",
    },
    {
      value: "OTHER",
      label: "OTHER",
    },
  ];
  return (
    <div className="relative mb-2 w-full group">
      <CreatableSelect
        isClearable
        className="contactFormInput"
        classNamePrefix="select"
        name="WeddingOptions"
        options={weddingOptions}
        styles={style}
        required
        // onChange={cityChange}
        placeholder={"Options"}
      />
    </div>
  );
};

export default OptionSelect;
