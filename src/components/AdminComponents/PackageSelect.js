import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import CreatableSelect from "react-select/creatable";
const PackageSelect = ({ packages, additions, formData, setFormData }) => {
  const { t } = useTranslation();
  const style = {
    control: (base) => ({
      ...base,
      border: 1,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  let packageOptions = packages.map((pkg) => ({
    value: pkg.title,
    label: pkg.title,
  }));

  let additionOptions = additions.map((add) => ({
    value: add.addition,
    label: add.addition,
  }));

  const handlePackageChange = (e) => {
    console.log(e);
    if (e) {
      setFormData({ ...formData, package: e.value });
      const selectedPackage = packages.find((pkg) => pkg.title === e.value);
      setFormData({ ...formData, packagePrice: selectedPackage.price });
    } else {
      setFormData({ ...formData, package: "", packagePrice: 0 });
    }
  };
  return (
    <>
      <div className="relative mb-2 w-full group">
        <div className="flex gap-2">
          <div className="flex-grow">
            <CreatableSelect
              isClearable
              className="contactFormInput"
              classNamePrefix="select"
              name="Package"
              options={packageOptions}
              styles={style}
              required
              onChange={handlePackageChange}
              placeholder={t("Package Options")}
            />
          </div>
          <div className="w-24">
            <input
              type="number"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("Package Price")}
              value={formData.packagePrice}
              onChange={(e) =>
                setFormData({ ...formData, packagePrice: e.target.value })
              }
              min="1"
            />
          </div>
        </div>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <label
          htmlFor="PackageDescription"
          className="block mb-2 text-sm font-medium text-gray-500"
        >
          <Trans>Description</Trans>
        </label>
        <textarea
          id="PackageDescription"
          name="PackageDescription"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-0 focus:border-black additionalInfo"
          placeholder={t("Package Description...")}
        ></textarea>
      </div>
      {/* <div className="relative mb-2 w-full group">
        <CreatableSelect
          isClearable
          isMulti
          className="contactFormInput"
          classNamePrefix="select"
          name="Additions"
          options={additionOptions}
          styles={style}
          required
          onChange={(e) => setFormData({ ...formData, additions: e.value })}
          placeholder={t("Options")}
        />
      </div> */}
    </>
  );
};

export default PackageSelect;
