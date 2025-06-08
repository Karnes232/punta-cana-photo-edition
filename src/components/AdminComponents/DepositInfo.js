import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";

const DepositInfo = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const calculateTotalPrice = () => {
    const additionsTotal =
      formData.additions?.reduce(
        (sum, addition) => sum + (parseFloat(addition.price) || 0),
        0,
      ) || 0;
    return (parseFloat(formData.packagePrice) || 0) + additionsTotal;
  };

  const handleDepositPercentageChange = (e) => {
    let value = e.target.value;
    // Ensure value doesn't exceed 100
    if (parseFloat(value) > 100) {
      value = "100";
    }
    // Allow empty value and handle it appropriately
    const numericValue = value === "" ? 0 : parseFloat(value);
    const totalPrice = calculateTotalPrice();
    setFormData({
      ...formData,
      depositPercentage: value,
      deposit: value === "" ? 0 : (totalPrice * numericValue) / 100,
    });
  };

  const handleDepositChange = (e) => {
    const value = e.target.value;
    const totalPrice = calculateTotalPrice();
    setFormData({
      ...formData,
      deposit: value,
      depositPercentage:
        totalPrice > 0 ? ((value / totalPrice) * 100).toFixed(2) : 0,
    });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1/2">
        <label
          className="block text-sm text-gray-500 mb-1"
          htmlFor="depositPercentage"
        >
          <Trans>Deposit Percentage</Trans>
        </label>
        <input
          id="depositPercentage"
          type="number"
          value={formData.depositPercentage}
          onChange={handleDepositPercentageChange}
          className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
          max="100"
          placeholder={t("Deposit Percentage")}
        />
      </div>
      <div className="w-1/2">
        <label className="block text-sm text-gray-500 mb-1" htmlFor="deposit">
          <Trans>Deposit</Trans>
        </label>
        <input
          id="deposit"
          type="number"
          value={formData.deposit}
          onChange={handleDepositChange}
          className="w-full px-3 rounded-lg border border-gray-300 focus:ring-0 focus:border-black h-[38px]"
          step="0.01"
          placeholder={t("Deposit")}
        />
      </div>
    </div>
  );
};

export default DepositInfo;
