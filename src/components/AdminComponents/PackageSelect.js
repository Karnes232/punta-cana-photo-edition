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
    let newFormData;
    if (e) {
      // Check if it's a new option (created by user)
      if (e.__isNew__) {
        newFormData = { ...formData, package: e.value, packagePrice: 0 };
      } else {
        const selectedPackage = packages.find((pkg) => pkg.title === e.value);
        newFormData = {
          ...formData,
          package: e.value,
          packagePrice: selectedPackage.price,
        };
      }
    } else {
      newFormData = { ...formData, package: "", packagePrice: 0 };
    }
    const newDeposit = calculateNewDeposit(newFormData);
    setFormData({ ...newFormData, deposit: newDeposit });
  };

  const calculateNewDeposit = (currentFormData) => {
    const additionsTotal =
      currentFormData.additions?.reduce(
        (sum, addition) => sum + (parseFloat(addition.price) || 0),
        0,
      ) || 0;
    const totalPrice =
      (parseFloat(currentFormData.packagePrice) || 0) + additionsTotal;
    const depositPercentage =
      parseFloat(currentFormData.depositPercentage) || 0;
    return (totalPrice * depositPercentage) / 100;
  };

  const handleAdditionChange = (e) => {
    if (e) {
      const newAdditions = e.map((option) => {
        // First check if this addition already exists in formData
        const existingAddition = formData.additions?.find(
          (add) => add.addition === option.value,
        );

        if (existingAddition) {
          // If it exists, preserve its current data
          return existingAddition;
        } else if (option.__isNew__) {
          // If it's a new option
          return { addition: option.value, price: 0, description: "" };
        } else {
          // If it's an existing option from the additions array
          const selectedAddition = additions.find(
            (add) => add.addition === option.value,
          );
          return {
            addition: option.value,
            price: selectedAddition.price,
            description: selectedAddition.description || "",
          };
        }
      });
      const newFormData = { ...formData, additions: newAdditions };
      const newDeposit = calculateNewDeposit(newFormData);
      setFormData({ ...newFormData, deposit: newDeposit });
    } else {
      const newFormData = { ...formData, additions: [] };
      const newDeposit = calculateNewDeposit(newFormData);
      setFormData({ ...newFormData, deposit: newDeposit });
    }
  };

  // Update price change handler for additions
  const handleAdditionPriceChange = (index, newPrice) => {
    const newAdditions = [...formData.additions];
    newAdditions[index].price = newPrice;
    const newFormData = { ...formData, additions: newAdditions };
    const newDeposit = calculateNewDeposit(newFormData);
    setFormData({ ...newFormData, deposit: newDeposit });
  };

  const selectedValues = formData.package
    ? {
        value: formData.package,
        label: formData.package,
      }
    : null;

  const selectedAdditions =
    formData.additions?.map((item) => ({
      value: item.addition,
      label: item.addition,
    })) || [];

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
              value={selectedValues}
            />
          </div>
          <div className="w-24 flex items-center ">
            <div className="relative z-0 -mt-7 w-full group">
              <label
                htmlFor="PackagePrice"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                <Trans>Price</Trans>
              </label>
              <input
                type="number"
                id="PackagePrice"
                name="PackagePrice"
                className="w-full px-3  rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                placeholder={t("Package Price")}
                value={formData.packagePrice}
                onChange={(e) => {
                  const newFormData = {
                    ...formData,
                    packagePrice: e.target.value,
                  };
                  const newDeposit = calculateNewDeposit(newFormData);
                  setFormData({ ...newFormData, deposit: newDeposit });
                }}
                min="1"
              />
            </div>
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
          value={formData.packagesDescription}
          onChange={(e) =>
            setFormData({ ...formData, packagesDescription: e.target.value })
          }
        ></textarea>
      </div>
      <div className="relative mb-2 w-full group">
        <CreatableSelect
          isClearable
          isMulti
          className="contactFormInput"
          classNamePrefix="select"
          name="Additions"
          options={additionOptions}
          styles={style}
          onChange={handleAdditionChange}
          placeholder={t("Options")}
          value={selectedAdditions}
        />
      </div>

      {formData.additions && formData.additions.length > 0 && (
        <div className="mb-6">
          {formData.additions.map((addition, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={addition.addition}
                    onChange={(e) => {
                      const newAdditions = [...formData.additions];
                      newAdditions[index].addition = e.target.value;
                      setFormData({ ...formData, additions: newAdditions });
                    }}
                    className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={addition.price}
                    onChange={(e) => {
                      handleAdditionPriceChange(index, e.target.value);
                    }}
                    className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                    min="0"
                    placeholder={t("Price")}
                  />
                </div>
              </div>
              <input
                type="text"
                value={addition.description || ""}
                onChange={(e) => {
                  const newAdditions = [...formData.additions];
                  newAdditions[index].description = e.target.value;
                  setFormData({ ...formData, additions: newAdditions });
                }}
                className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                placeholder={t("Addition Description")}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PackageSelect;
