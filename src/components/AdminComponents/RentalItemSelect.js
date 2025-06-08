import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import CreatableSelect from "react-select/creatable";

const RentalItemSelect = ({ rentalItems, formData, setFormData }) => {
  const { t } = useTranslation();
  const style = {
    control: (base) => ({
      ...base,
      border: 1,
      boxShadow: "none",
    }),
  };

  let itemOptions = rentalItems.map((item) => ({
    value: item.rentalItem,
    label: item.rentalItem,
  }));

  const calculateNewDeposit = (currentFormData) => {
    const totalPrice =
      currentFormData.selectedItems?.reduce((sum, item) => {
        const itemTotal =
          item.price * item.quantity * (1 - (item.discount || 0) / 100);
        return sum + (parseFloat(itemTotal) || 0);
      }, 0) || 0;
    const depositPercentage =
      parseFloat(currentFormData.depositPercentage) || 0;
    return (totalPrice * depositPercentage) / 100;
  };

  const handleItemChange = (e) => {
    if (e) {
      const newItems = e.map((option) => {
        // Check if item already exists in formData
        const existingItem = formData.selectedItems?.find(
          (item) => item.rentalItem === option.value,
        );

        if (existingItem) {
          // If it exists, preserve its current data
          return existingItem;
        } else if (option.__isNew__) {
          // If it's a new option
          return {
            rentalItem: option.value,
            price: 0,
            quantity: 1,
            description: "",
            discount: 0,
          };
        } else {
          // If it's an existing option from the rentalItems array
          const selectedItem = rentalItems.find(
            (item) => item.rentalItem === option.value,
          );
          return {
            rentalItem: option.value,
            price: selectedItem.price,
            quantity: 1,
            description: selectedItem.description || "",
            discount: 0,
          };
        }
      });
      const newFormData = { ...formData, selectedItems: newItems };
      const newDeposit = calculateNewDeposit(newFormData);
      setFormData({ ...newFormData, deposit: newDeposit });
    } else {
      const newFormData = { ...formData, selectedItems: [] };
      const newDeposit = calculateNewDeposit(newFormData);
      setFormData({ ...newFormData, deposit: newDeposit });
    }
  };

  const handleItemUpdate = (index, updates) => {
    const newItems = [...formData.selectedItems];
    newItems[index] = { ...newItems[index], ...updates };
    const newFormData = { ...formData, selectedItems: newItems };
    const newDeposit = calculateNewDeposit(newFormData);
    setFormData({ ...newFormData, deposit: newDeposit });
  };

  // Add this to convert formData.selectedItems to the format expected by CreatableSelect
  const selectedValues =
    formData.selectedItems?.map((item) => ({
      value: item.rentalItem,
      label: item.rentalItem,
    })) || [];

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-grow">
          <div className="relative mb-2 w-full group">
            <CreatableSelect
              isClearable
              isMulti
              className="contactFormInput"
              classNamePrefix="select"
              name="RentalItems"
              options={itemOptions}
              styles={style}
              required
              onChange={handleItemChange}
              placeholder={t("Select Rental Items")}
              value={selectedValues}
            />
          </div>

          {formData.selectedItems && formData.selectedItems.length > 0 && (
            <div className="mb-6">
              {formData.selectedItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2">
                    <input
                      type="text"
                      value={item.rentalItem}
                      onChange={(e) => {
                        const newItems = [...formData.selectedItems];
                        newItems[index].rentalItem = e.target.value;
                        handleItemUpdate(index, { rentalItem: e.target.value });
                      }}
                      className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-24">
                      <label
                        className="block text-sm text-gray-500 mb-1"
                        htmlFor="quantity"
                      >
                        <Trans>Quantity</Trans>
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty string during typing, but enforce min of 1 for actual numbers
                          const newQuantity =
                            value === ""
                              ? ""
                              : Math.max(1, parseInt(value) || 1);
                          handleItemUpdate(index, { quantity: newQuantity });
                        }}
                        className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                        min="1"
                        placeholder={t("Qty")}
                      />
                    </div>
                    <div className="w-32">
                      <label
                        className="block text-sm text-gray-500 mb-1"
                        htmlFor="unitPrice"
                      >
                        <Trans>Unit Price</Trans>
                      </label>
                      <input
                        id="unitPrice"
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          handleItemUpdate(index, { price: e.target.value });
                        }}
                        className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                        min="0"
                        placeholder={t("Price")}
                      />
                    </div>
                    <div className="w-32">
                      <label
                        className="block text-sm text-gray-500 mb-1"
                        htmlFor="discount"
                      >
                        <Trans>Discount %</Trans>
                      </label>
                      <input
                        id="discount"
                        type="number"
                        value={item.discount}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty string during typing, but enforce min/max when there's a value
                          const newDiscount =
                            value === ""
                              ? ""
                              : Math.min(
                                  100,
                                  Math.max(0, parseFloat(value) || 0),
                                );
                          handleItemUpdate(index, { discount: newDiscount });
                        }}
                        className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                        min="0"
                        max="100"
                        placeholder={t("Discount")}
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        className="block text-sm text-gray-500 mb-1"
                        htmlFor="totalPrice"
                      >
                        <Trans>Total Price</Trans>
                      </label>
                      <input
                        id="totalPrice"
                        type="number"
                        value={(
                          item.price *
                          item.quantity *
                          (1 - (item.discount || 0) / 100)
                        ).toFixed(2)}
                        readOnly
                        className="w-full px-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-0 focus:border-black h-[38px]"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={item.description || ""}
                    onChange={(e) => {
                      const newItems = [...formData.selectedItems];
                      newItems[index].description = e.target.value;
                      handleItemUpdate(index, { description: e.target.value });
                    }}
                    className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
                    placeholder={t("Item Description")}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RentalItemSelect;
